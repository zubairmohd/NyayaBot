import axios from 'axios';
import fs from 'fs';
import path from 'path';

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

// This function generates a response from OpenAI based on the user's query
export async function generateLegalResponse(query, languageCode = 'en') {
  try {
    if (!OPENAI_API_KEY) {
      throw new Error('OpenAI API key is required');
    }

    // Read some context from our legal document
    const legalContextPath = path.join(process.cwd(), 'attached_assets/Indian Penal Code Book (2).pdf');
    // We would extract text from PDF here in a real implementation
    // For now, we'll use a simple context 
    const legalContext = `
    The Indian Penal Code (IPC) is the official criminal code of India that covers all substantive aspects of criminal law. 
    It was drafted in 1860 and came into force in 1862.
    Section 299 and 300 deal with culpable homicide and murder.
    Section 375 covers sexual assault.
    Section 378 covers theft.
    Section 415 covers fraud and cheating.
    It applies to the whole of India, except Jammu and Kashmir.
    `;

    // Construct the prompt with legal context for better responses
    const prompt = `
    You are a legal assistant for Indian law. Answer the following query based on your knowledge of Indian law. 
    If information is not available in the provided context, answer based on your general knowledge of Indian law, 
    but clearly indicate when you're going beyond the provided information.
    
    Context:
    ${legalContext}
    
    Query: ${query}
    
    Provide a helpful, accurate, and clear response in ${languageCode === 'en' ? 'English' : 'Hindi'}.
    `;

    // Call the OpenAI API
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-4o', // the newest OpenAI model is "gpt-4o" which was released May 13, 2024.
        messages: [
          { role: 'system', content: 'You are a helpful legal assistant specializing in Indian law.' },
          { role: 'user', content: prompt }
        ],
        temperature: 0.7,
        max_tokens: 800
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${OPENAI_API_KEY}`
        }
      }
    );

    if (response.data && response.data.choices && response.data.choices.length > 0) {
      return response.data.choices[0].message.content;
    } else {
      throw new Error('Unexpected response structure from OpenAI');
    }
  } catch (error) {
    console.error('Error generating legal response:', error);
    if (error.response) {
      console.error('OpenAI API error:', error.response.data);
    }
    throw error;
  }
}

// This function would transcribe audio using OpenAI Whisper API
export async function transcribeAudio(audioBuffer) {
  try {
    if (!OPENAI_API_KEY) {
      throw new Error('OpenAI API key is required');
    }

    // Create FormData object for the API request
    const formData = new FormData();
    formData.append('file', new Blob([audioBuffer], { type: 'audio/wav' }), 'audio.wav');
    formData.append('model', 'whisper-1');
    formData.append('language', 'en'); // Can be adjusted based on user's language setting

    // Call OpenAI's Audio API for transcription
    const response = await axios.post(
      'https://api.openai.com/v1/audio/transcriptions',
      formData,
      {
        headers: {
          'Authorization': `Bearer ${OPENAI_API_KEY}`,
          'Content-Type': 'multipart/form-data'
        }
      }
    );

    if (response.data && response.data.text) {
      return response.data.text;
    } else {
      throw new Error('Unexpected response structure from OpenAI Whisper API');
    }
  } catch (error) {
    console.error('Error transcribing audio:', error);
    if (error.response) {
      console.error('OpenAI API error:', error.response.data);
    }
    throw error;
  }
}