import axios from 'axios';

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

    // Connect to our Streamlit backend running on port 5000
    const response = await axios.post('http://localhost:5000/api/generate_document', {
      doc_type: docType,
      conversation_text: conversationText
    }, {
      responseType: 'arraybuffer' // Important for binary data like PDFs
    });
    
    // Convert the binary data to base64 for sending to the client
    const base64Data = Buffer.from(response.data).toString('base64');
    
    res.status(200).json({ 
      filename: `${docType}_document.pdf`,
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