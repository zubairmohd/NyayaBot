import { promises as fs } from 'fs';
import path from 'path';
import formidable from 'formidable';
import { spawn } from 'child_process';

// Configure formidable to parse form data
export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed, use POST' });
  }
  
  try {
    // Parse the incoming form data
    const { fields, files } = await parseForm(req);
    
    if (!files.document) {
      return res.status(400).json({ 
        success: false, 
        error: 'No document file uploaded' 
      });
    }
    
    const file = files.document;
    
    // Process the uploaded document
    const { success, filePath, error } = await processUploadedDocument(file);
    
    if (!success) {
      return res.status(500).json({ 
        success: false, 
        error: error || 'Failed to process document' 
      });
    }
    
    // Return success response
    return res.status(200).json({
      success: true,
      document: {
        originalName: file.originalFilename,
        name: path.basename(filePath),
        size: file.size,
        path: filePath
      }
    });
  } catch (error) {
    console.error('Error handling document upload:', error);
    return res.status(500).json({ 
      success: false, 
      error: error.message || 'Internal server error' 
    });
  }
}

function parseForm(req) {
  return new Promise((resolve, reject) => {
    const form = new formidable.IncomingForm({
      keepExtensions: true,
      maxFileSize: 10 * 1024 * 1024, // 10MB limit
    });
    
    form.parse(req, (err, fields, files) => {
      if (err) {
        reject(err);
        return;
      }
      resolve({ fields, files });
    });
  });
}

async function processUploadedDocument(file) {
  try {
    // Create uploads directory if it doesn't exist
    const uploadsDir = path.join(process.cwd(), 'uploads');
    await fs.mkdir(uploadsDir, { recursive: true });
    
    // Generate a unique filename
    const timestamp = new Date().getTime();
    const filename = `${timestamp}-${file.originalFilename}`;
    const filePath = path.join(uploadsDir, filename);
    
    // Copy file to uploads directory
    const data = await fs.readFile(file.filepath);
    await fs.writeFile(filePath, data);
    
    // Add document to RAG system
    const ragSuccess = await addDocumentToRAG(filePath);
    
    if (!ragSuccess) {
      console.warn(`Warning: Failed to add document to RAG system: ${filePath}`);
      // Still return success even if RAG processing fails
      // This allows the upload to succeed but with a warning
    }
    
    return {
      success: true,
      filePath: filePath
    };
  } catch (error) {
    console.error('Error processing document:', error);
    return {
      success: false,
      error: error.message
    };
  }
}

async function addDocumentToRAG(filePath) {
  return new Promise((resolve) => {
    try {
      // Spawn a Python process to process the document
      const pythonProcess = spawn('python', [
        path.join(process.cwd(), 'utils/process_document.py'),
        filePath
      ]);
      
      // Log output
      pythonProcess.stdout.on('data', (data) => {
        console.log(`Process output: ${data}`);
      });
      
      // Log errors
      pythonProcess.stderr.on('data', (data) => {
        console.error(`Process error: ${data}`);
      });
      
      // Handle process completion
      pythonProcess.on('close', (code) => {
        if (code === 0) {
          console.log(`Successfully processed document: ${filePath}`);
          resolve(true);
        } else {
          console.warn(`Document processing exited with code ${code}: ${filePath}`);
          resolve(false);
        }
      });
    } catch (error) {
      console.error('Error spawning Python process:', error);
      resolve(false);
    }
  });
}