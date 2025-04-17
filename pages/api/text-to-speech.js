import axios from 'axios';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const { text, language_code = 'en' } = req.body;

  if (!text) {
    res.status(400).json({ error: 'Text is required' });
    return;
  }

  try {
    // Connect to our Streamlit backend running on port 5000
    const response = await axios.post('http://localhost:5000/api/text_to_speech', 
      {
        text,
        language_code
      },
      {
        responseType: 'arraybuffer' // Important for binary audio data
      }
    );
    
    // Set appropriate headers for audio
    res.setHeader('Content-Type', 'audio/mp3');
    res.setHeader('Content-Disposition', 'attachment; filename="speech.mp3"');
    
    // Send the audio data directly
    res.send(Buffer.from(response.data));
  } catch (error) {
    console.error('Error in text-to-speech API:', error);
    res.status(500).json({ 
      error: 'Failed to convert text to speech',
      details: error.message
    });
  }
}