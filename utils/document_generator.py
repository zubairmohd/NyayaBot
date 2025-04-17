import os
import tempfile
import io
from datetime import datetime
from PyPDF2 import PdfWriter, PdfReader
from reportlab.lib.pagesizes import letter
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.lib import colors
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from utils.llm_utils import QwenLLM, openai_client
from utils.db_utils import Document, get_db
from typing import Dict, Optional

# Document templates for different document types
DOCUMENT_TEMPLATES = {
    "Bail Application": {
        "title": "APPLICATION FOR BAIL UNDER SECTION 437/439 OF CRPC",
        "sections": [
            "IN THE COURT OF [COURT NAME]",
            "APPLICATION NO: ______ OF [YEAR]",
            "IN THE MATTER OF:",
            "[APPLICANT NAME] ... APPLICANT",
            "VERSUS",
            "STATE OF [STATE NAME] ... RESPONDENT",
            "APPLICATION UNDER SECTION 437/439 OF CODE OF CRIMINAL PROCEDURE FOR GRANT OF BAIL",
            "RESPECTFULLY SHOWETH:",
            "1. That the applicant has been arrested in connection with FIR No. ______ dated ______ registered at Police Station ______ under Sections ______ of ______.",
            "2. Brief facts of the case:",
            "[FACTS TO BE FILLED]",
            "3. Grounds for bail:",
            "[GROUNDS TO BE FILLED]",
            "PRAYER:",
            "It is, therefore, most respectfully prayed that this Hon'ble Court may graciously be pleased to release the applicant on bail on such terms and conditions as this Hon'ble Court may deem fit and proper in the interest of justice.",
            "AND FOR THIS ACT OF KINDNESS, THE APPLICANT AS IN DUTY BOUND SHALL EVER PRAY.",
            "PLACE: [PLACE]",
            "DATE: [DATE]",
            "ADVOCATE FOR APPLICANT"
        ]
    },
    "FIR Complaint": {
        "title": "FIRST INFORMATION REPORT (FIR)",
        "sections": [
            "To,",
            "The Station House Officer,",
            "Police Station: [POLICE STATION]",
            "[LOCATION]",
            "Subject: Complaint regarding [SUBJECT]",
            "Respected Sir/Madam,",
            "I, [NAME], resident of [ADDRESS], would like to report the following incident:",
            "[DETAILS OF INCIDENT]",
            "Date of Incident: [DATE]",
            "Time of Incident: [TIME]",
            "Place of Incident: [PLACE]",
            "Details of suspect (if known): [SUSPECT DETAILS]",
            "I request you to register an FIR and take appropriate action in this matter.",
            "Thanking you,",
            "Yours faithfully,",
            "[NAME]",
            "Contact: [CONTACT]",
            "Date: [DATE]",
            "Place: [PLACE]"
        ]
    },
    "Legal Notice": {
        "title": "LEGAL NOTICE",
        "sections": [
            "From:",
            "[SENDER NAME AND ADDRESS]",
            "To:",
            "[RECIPIENT NAME AND ADDRESS]",
            "Date: [DATE]",
            "Subject: [SUBJECT OF NOTICE]",
            "LEGAL NOTICE",
            "Dear Sir/Madam,",
            "Under instructions from and on behalf of my client [CLIENT NAME], I hereby serve you with the following legal notice:",
            "[CONTENT OF NOTICE]",
            "You are hereby called upon to [DEMAND/ACTION REQUIRED] within [TIMEFRAME] from the receipt of this notice, failing which my client will be constrained to initiate appropriate legal proceedings against you, civil and/or criminal, in the appropriate forum/court of law, at your risk as to costs and consequences.",
            "This notice is being sent without prejudice to my client's rights and contentions, all of which are expressly reserved.",
            "Yours faithfully,",
            "[ADVOCATE NAME]",
            "Advocate"
        ]
    },
    "Affidavit": {
        "title": "AFFIDAVIT",
        "sections": [
            "BEFORE THE [AUTHORITY/COURT]",
            "AFFIDAVIT",
            "I, [NAME], son/daughter/wife of [FATHER'S/HUSBAND'S NAME], aged about [AGE] years, resident of [ADDRESS], do hereby solemnly affirm and declare as under:",
            "1. That I am the [RELATIONSHIP/DESIGNATION] in the above matter and am well conversant with the facts and circumstances of the case.",
            "2. [CONTENT OF AFFIDAVIT]",
            "3. That the contents of the above affidavit are true and correct to the best of my knowledge and belief. Nothing material has been concealed therefrom.",
            "DEPONENT",
            "VERIFICATION:",
            "Verified at [PLACE] on this [DATE] that the contents of the above affidavit are true and correct to my knowledge and belief and nothing material has been concealed therefrom.",
            "DEPONENT"
        ]
    },
    "PIL Draft": {
        "title": "PUBLIC INTEREST LITIGATION",
        "sections": [
            "IN THE HIGH COURT OF [STATE]",
            "WRIT PETITION (CIVIL) NO. ______ OF [YEAR]",
            "(PIL UNDER ARTICLE 226 OF THE CONSTITUTION OF INDIA)",
            "IN THE MATTER OF:",
            "[PETITIONER NAME AND ADDRESS] ... PETITIONER",
            "VERSUS",
            "[RESPONDENT NAME AND ADDRESS] ... RESPONDENT",
            "PETITION UNDER ARTICLE 226 OF THE CONSTITUTION OF INDIA SEEKING WRIT OF [TYPE OF WRIT]",
            "TO,",
            "THE HON'BLE CHIEF JUSTICE AND",
            "OTHER COMPANION JUDGES OF",
            "THE HIGH COURT OF [STATE]",
            "THE HUMBLE PETITION OF",
            "THE PETITIONER ABOVE NAMED",
            "MOST RESPECTFULLY SHOWETH:",
            "1. That the Petitioner is filing the present Public Interest Litigation seeking [RELIEF SOUGHT].",
            "2. Details of the cause/issue:",
            "[FACTS OF THE CASE]",
            "3. Grounds:",
            "[GROUNDS FOR THE PIL]",
            "4. That the Petitioner has no personal interest in the matter and the petition is being filed in the interest of [PUBLIC INTEREST DETAILS].",
            "PRAYER:",
            "In view of the facts and circumstances stated above, it is most respectfully prayed that this Hon'ble Court may be pleased to:",
            "a) [PRAYER CLAUSE 1]",
            "b) [PRAYER CLAUSE 2]",
            "c) Pass such other and further orders as this Hon'ble Court may deem fit and proper in the circumstances of the case.",
            "AND FOR THIS ACT OF KINDNESS, THE PETITIONER AS IN DUTY BOUND SHALL EVER PRAY.",
            "PETITIONER",
            "THROUGH",
            "ADVOCATE",
            "PLACE: [PLACE]",
            "DATE: [DATE]"
        ]
    }
}

def generate_document(doc_type: str, conversation_text: str, user_id: int = None) -> bytes:
    """
    Generate a legal document based on the type and conversation context
    
    Args:
        doc_type (str): Type of document to generate
        conversation_text (str): Conversation context for document generation
        user_id (int, optional): User ID to associate the document with
        
    Returns:
        bytes: PDF document content
    """
    # Get document template
    template = DOCUMENT_TEMPLATES.get(doc_type, {"title": doc_type, "sections": []})
    
    # Extract relevant information from conversation using LLM
    llm = QwenLLM()
    prompt = f"""
    Based on the following conversation, extract relevant information to fill in a {doc_type}. 
    Identify all the necessary details such as names, dates, locations, and specific legal arguments.
    
    Conversation:
    {conversation_text}
    
    Please extract information for the following fields:
    """
    
    # Add template-specific fields to extract
    for section in template["sections"]:
        if "[" in section and "]" in section:
            field = section[section.find("[")+1:section.find("]")]
            prompt += f"- {field}\n"
    
    # Get LLM response
    extraction_response = llm._call(prompt)
    
    # Parse the extracted information
    extracted_info = {}
    current_field = None
    
    for line in extraction_response.split("\n"):
        line = line.strip()
        if not line:
            continue
            
        if ":" in line and not current_field:
            parts = line.split(":", 1)
            field = parts[0].strip()
            value = parts[1].strip() if len(parts) > 1 else ""
            extracted_info[field] = value
        elif current_field:
            extracted_info[current_field] += " " + line
    
    # Create a PDF document
    buffer = io.BytesIO()
    doc = SimpleDocTemplate(buffer, pagesize=letter)
    styles = getSampleStyleSheet()
    
    # Create custom styles
    title_style = ParagraphStyle(
        'Title',
        parent=styles['Title'],
        fontSize=14,
        alignment=1,  # Center alignment
        spaceAfter=12
    )
    
    heading_style = ParagraphStyle(
        'Heading',
        parent=styles['Heading2'],
        fontSize=12,
        spaceAfter=10
    )
    
    normal_style = ParagraphStyle(
        'Normal',
        parent=styles['Normal'],
        fontSize=11,
        spaceAfter=8
    )
    
    # Build the document content
    content = []
    
    # Add title
    content.append(Paragraph(template["title"], title_style))
    content.append(Spacer(1, 12))
    
    # Add sections with filled information
    for section in template["sections"]:
        filled_section = section
        
        # Replace placeholders with extracted information
        if "[" in section and "]" in section:
            field = section[section.find("[")+1:section.find("]")]
            if field in extracted_info and extracted_info[field]:
                filled_section = section.replace(f"[{field}]", extracted_info[field])
            elif field == "DATE":
                filled_section = section.replace("[DATE]", datetime.now().strftime("%d/%m/%Y"))
            elif field == "YEAR":
                filled_section = section.replace("[YEAR]", datetime.now().strftime("%Y"))
        
        # Add the section to document
        content.append(Paragraph(filled_section, normal_style))
        content.append(Spacer(1, 6))
    
    # Build the document
    doc.build(content)
    
    # Get the PDF content
    buffer.seek(0)
    pdf_content = buffer.getvalue()
    
    # Save to database if user_id is provided
    if user_id:
        try:
            db = next(get_db())
            # Convert the filled template to text format for database storage
            text_content = "\n".join([
                template["title"],
                "\n".join([section for section in template["sections"]])
            ])
            
            document = Document(
                user_id=user_id,
                doc_type=doc_type,
                content=text_content
            )
            
            db.add(document)
            db.commit()
        except Exception as e:
            print(f"Error saving document to database: {e}")
    
    return pdf_content
