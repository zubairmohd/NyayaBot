import axios from 'axios';
import formidable from 'formidable';
import fs from 'fs';
import path from 'path';

// Configure Next.js to handle file uploads
export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  // Create uploads directory if it doesn't exist
  const uploadsDir = path.join(process.cwd(), 'uploads');
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
  }

  // Parse form with uploaded file
  const form = new formidable.IncomingForm({
    uploadDir: uploadsDir,
    keepExtensions: true,
  });

  form.parse(req, async (err, fields, files) => {
    if (err) {
      console.error('Error parsing form:', err);
      res.status(500).json({ error: 'Error parsing form' });
      return;
    }

    if (!files.audio) {
      res.status(400).json({ error: 'Audio file is required' });
      return;
    }

    try {
      const audioFile = files.audio;
      const audioPath = audioFile.filepath;

      // Create FormData to send the file to our backend
      const formData = new FormData();
      formData.append('audio', fs.createReadStream(audioPath));
      
      // Language code if provided in the form fields
      const languageCode = fields.language_code || 'en';
      formData.append('language_code', languageCode);

      // Send to our Streamlit backend
      const response = await axios.post('http://localhost:5000/api/transcribe_audio', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Clean up the temporary file
      fs.unlinkSync(audioPath);

      res.status(200).json({ 
        transcription: response.data.transcription 
      });
    } catch (error) {
      console.error('Error transcribing audio:', error);
      res.status(500).json({ 
        error: 'Failed to transcribe audio',
        details: error.message 
      });
    }
  });
}