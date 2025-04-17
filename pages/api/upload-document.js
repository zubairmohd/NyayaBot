import formidable from 'formidable';
import fs from 'fs';
import path from 'path';
import { spawn } from 'child_process';

// Disable the default body parser so we can handle the form data manually
export const config = {
  api: {
    bodyParser: false,
  },
};

// Main handler function for document uploads
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Parse the form data using formidable
    const { fields, files } = await parseForm(req);
    
    // Process uploaded document
    const documentInfo = await processUploadedDocument(files.document);
    
    // Return success response with info about the document
    return res.status(200).json({ 
      success: true, 
      message: 'Document uploaded successfully',
      document: documentInfo
    });
  } catch (error) {
    console.error('Error uploading document:', error);
    return res.status(500).json({ 
      error: 'Failed to upload document',
      details: error.message
    });
  }
}

// Parse form data using formidable
function parseForm(req) {
  return new Promise((resolve, reject) => {
    const form = new formidable.IncomingForm({
      keepExtensions: true,
      maxFileSize: 10 * 1024 * 1024, // 10MB file size limit
    });

    form.parse(req, (err, fields, files) => {
      if (err) {
        return reject(err);
      }
      resolve({ fields, files });
    });
  });
}

// Process the uploaded document and store it properly
async function processUploadedDocument(file) {
  // Check if file was uploaded
  if (!file || !file.filepath) {
    throw new Error('No document uploaded');
  }

  // Check file type (only accept PDFs)
  const fileType = path.extname(file.originalFilename).toLowerCase();
  if (fileType !== '.pdf') {
    throw new Error('Only PDF files are supported');
  }

  // Create uploads directory if it doesn't exist
  const uploadsDir = path.join(process.cwd(), 'uploads');
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
  }

  // Generate a unique filename
  const timestamp = Date.now();
  const filename = `document_${timestamp}${fileType}`;
  const filePath = path.join(uploadsDir, filename);

  // Read the uploaded file and write it to the uploads directory
  const data = fs.readFileSync(file.filepath);
  fs.writeFileSync(filePath, data);
  
  // Remove the temporary file created by formidable
  fs.unlinkSync(file.filepath);

  // Run Python script to process the document and add it to RAG
  await addDocumentToRAG(filePath);

  // Return information about the uploaded document
  return {
    filename,
    originalName: file.originalFilename,
    size: file.size,
    path: `/uploads/${filename}`,
    type: fileType
  };
}

// Process the document with Python and add it to RAG
async function addDocumentToRAG(filePath) {
  return new Promise((resolve, reject) => {
    // This would typically call a Python script that integrates with our RAG system
    // For now, we'll just resolve immediately since we're not implementing this yet
    resolve();
    
    // In a real implementation, we would do something like:
    /*
    const pythonProcess = spawn('python', [
      path.join(process.cwd(), 'utils/process_document.py'),
      filePath
    ]);
    
    pythonProcess.stdout.on('data', (data) => {
      console.log(`Python stdout: ${data}`);
    });
    
    pythonProcess.stderr.on('data', (data) => {
      console.error(`Python stderr: ${data}`);
    });
    
    pythonProcess.on('close', (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`Python process exited with code ${code}`));
      }
    });
    */
  });
}