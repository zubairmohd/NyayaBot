import { generateLegalResponse } from './llm-utils';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const { 
    message, 
    language = 'en',
    provider = 'openai',
    model = 'gpt-4o'
  } = req.body;

  if (!message) {
    res.status(400).json({ error: 'Message is required' });
    return;
  }

  try {
    // Use our implementation with specified model and provider
    const legalResponse = await generateLegalResponse(message, language, provider, model);
    
    res.status(200).json({ message: legalResponse });
  } catch (error) {
    console.error('Error in chat API:', error);
    res.status(500).json({ 
      error: 'Failed to get response from the legal assistant',
      details: error.message
    });
  }
}