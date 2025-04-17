import axios from 'axios';
import fs from 'fs';
import path from 'path';
import { generateLegalResponse } from './llm-utils';

// PDF generation function using Node.js
async function generatePDF(content, docType) {
  try {
    // Import PDF libraries
    const { PDFDocument, rgb, StandardFonts } = await import('pdf-lib');
    
    // Create a new PDF document
    const pdfDoc = await PDFDocument.create();
    
    // Add a page to the PDF
    const page = pdfDoc.addPage([595.28, 841.89]); // A4 size
    
    // Get the standard font
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
    
    // Set margins
    const margin = 50;
    const contentWidth = page.getWidth() - 2 * margin;
    
    // Add header
    page.drawText(docType.toUpperCase(), {
      x: margin,
      y: page.getHeight() - margin,
      size: 16,
      font: boldFont,
      color: rgb(0.2, 0.2, 0.5)
    });
    
    // Add date
    page.drawText(`Generated on ${new Date().toLocaleDateString()}`, {
      x: margin,
      y: page.getHeight() - margin - 20,
      size: 10,
      font,
      color: rgb(0.3, 0.3, 0.3)
    });
    
    // Add divider line
    page.drawLine({
      start: { x: margin, y: page.getHeight() - margin - 30 },
      end: { x: page.getWidth() - margin, y: page.getHeight() - margin - 30 },
      thickness: 1,
      color: rgb(0.7, 0.7, 0.7)
    });
    
    // Prepare content for wrapping
    const words = content.split(/\s+/);
    let currentLine = '';
    let yPosition = page.getHeight() - margin - 60;
    const lineHeight = 14;
    const fontSize = 11;
    
    // Simple word wrapping logic
    for (const word of words) {
      const testLine = currentLine + (currentLine ? ' ' : '') + word;
      const lineWidth = font.widthOfTextAtSize(testLine, fontSize);
      
      if (lineWidth > contentWidth) {
        // Draw current line and start a new one
        page.drawText(currentLine, {
          x: margin,
          y: yPosition,
          size: fontSize,
          font,
          color: rgb(0, 0, 0)
        });
        
        yPosition -= lineHeight;
        currentLine = word;
        
        // Check if we need a new page
        if (yPosition < margin) {
          const newPage = pdfDoc.addPage([595.28, 841.89]);
          yPosition = newPage.getHeight() - margin;
        }
      } else {
        currentLine = testLine;
      }
    }
    
    // Draw the last line
    if (currentLine) {
      page.drawText(currentLine, {
        x: margin,
        y: yPosition,
        size: fontSize,
        font,
        color: rgb(0, 0, 0)
      });
    }
    
    // Add footer
    page.drawText('This document is auto-generated and may need review by a legal professional.', {
      x: margin,
      y: margin,
      size: 8,
      font,
      color: rgb(0.5, 0.5, 0.5)
    });
    
    // Serialize the PDF to bytes
    const pdfBytes = await pdfDoc.save();
    
    // Convert to base64
    const base64Data = Buffer.from(pdfBytes).toString('base64');
    
    return base64Data;
  } catch (error) {
    console.error('Error generating PDF:', error);
    // Fallback to simple text if PDF generation fails
    const base64Data = Buffer.from(content).toString('base64');
    return base64Data;
  }
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const { docType, conversationHistory } = req.body;

  if (!docType) {
    res.status(400).json({ error: 'Document type is required' });
    return;
  }

  if (!conversationHistory || conversationHistory.length === 0) {
    res.status(400).json({ error: 'Conversation history is required' });
    return;
  }

  try {
    // Extract just the text content from the conversation history
    const conversationText = conversationHistory
      .map(message => `${message.role}: ${message.content}`)
      .join('\n');

    // Generate legal document content using OpenAI
    let prompt = '';
    
    // Create a specific prompt based on document type
    if (docType === 'bail_application') {
      prompt = `
        Based on the following conversation, generate a formal Bail Application following Indian legal standards.
        Include:
        - Court heading with appropriate jurisdiction
        - Applicant/accused and respondent details (State/Prosecution)
        - Case details (FIR number, police station, sections, if provided)
        - Grounds for bail application with legal reasoning
        - Prayer section
        - Place, date and signature placeholders
        
        Use formal legal language and structure appropriate for Indian courts.
        
        Conversation:
        ${conversationText}
      `;
    } else if (docType === 'fir_complaint') {
      prompt = `
        Based on the following conversation, generate a formal FIR (First Information Report) complaint following Indian legal standards.
        Include:
        - Addressed to the Station House Officer of appropriate police station
        - Complainant's personal details
        - Detailed description of the incident (date, time, place)
        - Sections of IPC or other laws violated
        - List of witnesses if mentioned
        - Request for registration of FIR and investigation
        - Declaration of truth statement
        - Place, date and signature placeholders
        
        Use formal legal language and structure according to Indian police procedures.
        
        Conversation:
        ${conversationText}
      `;
    } else if (docType === 'legal_notice') {
      prompt = `
        Based on the following conversation, generate a formal Legal Notice following Indian legal standards.
        Include:
        - Sender and recipient details with addresses
        - Subject line clearly stating purpose
        - Reference to agreement/incident that triggered the notice
        - Facts of the matter in chronological order
        - Legal grounds supporting sender's position
        - Specific demand or relief sought
        - Time period for compliance (usually 15-30 days)
        - Consequences of non-compliance
        - Place, date and signature placeholders
        
        Use formal legal language and structure according to Indian notice formats.
        
        Conversation:
        ${conversationText}
      `;
    } else if (docType === 'affidavit') {
      prompt = `
        Based on the following conversation, generate a formal Affidavit following Indian legal standards.
        Include:
        - Court heading if applicable
        - Deponent's personal details
        - Numbered paragraphs with facts
        - Verification clause stating the affidavit's contents are true
        - Place, date and signature placeholders
        - Notary/oath commissioner attestation format
        
        Use formal legal language and structure according to Indian affidavit standards.
        
        Conversation:
        ${conversationText}
      `;
    } else if (docType === 'pil_draft') {
      prompt = `
        Based on the following conversation, generate a formal Public Interest Litigation (PIL) petition following Indian legal standards.
        Include:
        - Court heading with appropriate jurisdiction
        - Petitioner and respondent details
        - Locus standi (standing) of the petitioner
        - Facts in chronological order
        - Questions of law involved
        - Grounds for petition with constitutional/legal provisions
        - Details of any prior representation/remedy sought
        - Prayer section with specific relief sought
        - Annexures reference if any
        - Place, date and signature placeholders
        
        Use formal legal language and structure according to Indian PIL standards.
        
        Conversation:
        ${conversationText}
      `;
    } else {
      // Generic prompt for other document types
      prompt = `
        Based on the following conversation, generate a proper ${docType} in formal legal language.
        Follow Indian legal standards and format for this document type.
        
        Include all necessary sections, headers, formal addresses, facts, legal provisions, 
        and concluding elements appropriate for this type of legal document in India.
        
        Conversation:
        ${conversationText}
        
        Create a complete, well-structured ${docType} with all necessary sections, clauses, and legal terminology.
      `;
    }
    
    // Generate content using OpenAI
    const documentContent = await generateLegalResponse(prompt);
    
    // Generate PDF with this content
    const base64Data = await generatePDF(documentContent, docType);
    
    res.status(200).json({ 
      filename: `${docType.toLowerCase().replace(/ /g, '_')}_document.pdf`,
      data: base64Data
    });
  } catch (error) {
    console.error('Error generating document:', error);
    res.status(500).json({ 
      error: 'Failed to generate document',
      details: error.message 
    });
  }
}