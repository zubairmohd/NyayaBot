import { generateLegalResponse } from './llm-utils';
import axios from 'axios';

// In-memory conversation store - in production, this should use a database
// Maps session ID to an array of messages
const conversationStore = new Map();

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const { 
    message, 
    language = 'en',
    provider = 'openai',
    model = 'gpt-4o',
    sessionId = 'default',
    previousMessages = [] // Allow passing previous messages for context
  } = req.body;

  if (!message) {
    res.status(400).json({ error: 'Message is required' });
    return;
  }

  try {
    // Initialize conversation history for this session if it doesn't exist
    if (!conversationStore.has(sessionId)) {
      conversationStore.set(sessionId, []);
    }
    
    // Get existing conversation history
    let conversationHistory = conversationStore.get(sessionId);
    
    // If client provided previous messages and our store is empty, use those
    if (previousMessages.length > 0 && conversationHistory.length === 0) {
      conversationHistory = [...previousMessages];
    }
    
    // Add the new user message to the conversation history
    conversationHistory.push({ role: 'user', content: message });
    
    // Get context from all previous messages
    const conversationContext = conversationHistory
      .map(msg => `${msg.role}: ${msg.content}`)
      .join('\n');
    
    // Generate a prompt that includes conversation history
    const promptWithContext = `
    Previous conversation:
    ${conversationContext}

    Based on this conversation, please respond to the most recent question.
    `;
    
    // Use our implementation with specified model and provider
    const legalResponse = await generateLegalResponse(promptWithContext, language, provider, model);
    
    // Add the assistant response to the conversation history
    conversationHistory.push({ role: 'assistant', content: legalResponse });
    
    // Update the conversation store
    conversationStore.set(sessionId, conversationHistory);
    
    // Return the response along with the updated conversation history
    res.status(200).json({ 
      message: legalResponse,
      conversationHistory: conversationHistory 
    });
  } catch (error) {
    console.error('Error in chat API:', error);
    res.status(500).json({ 
      error: 'Failed to get response from the legal assistant',
      details: error.message
    });
  }
}