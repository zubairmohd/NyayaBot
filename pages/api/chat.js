import axios from 'axios';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const { message, language = 'en' } = req.body;

  if (!message) {
    res.status(400).json({ error: 'Message is required' });
    return;
  }

  try {
    // Connect to our Streamlit backend running on port 5000
    const response = await axios.post('http://localhost:5000/api/get_legal_response', {
      query: message,
      language_code: language
    });
    
    res.status(200).json({ message: response.data.response });
  } catch (error) {
    console.error('Error in chat API:', error);
    res.status(500).json({ 
      error: 'Failed to get response from the legal assistant',
      details: error.message
    });
  }
}