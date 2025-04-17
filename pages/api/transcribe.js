import formidable from 'formidable';
import fs from 'fs';
import path from 'path';
import { transcribeAudio } from './llm-utils';

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

      // Read the audio file
      const audioBuffer = fs.readFileSync(audioPath);
      
      // Language code if provided in the form fields
      const languageCode = fields.language_code || 'en';

      // Call our OpenAI-based transcription directly
      const transcriptionText = await transcribeAudio(audioBuffer);

      // Clean up the temporary file
      fs.unlinkSync(audioPath);

      res.status(200).json({ 
        transcription: transcriptionText 
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