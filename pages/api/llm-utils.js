import axios from 'axios';
import fs from 'fs';
import path from 'path';

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
// API keys for alternative providers
const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY; // For Qwen models (using Anthropic/Claude)
const XAI_API_KEY = process.env.XAI_API_KEY; // For Llama models (using xAI API)

// Default model to use - can be changed based on user preference or configuration
const DEFAULT_MODEL = 'openai/gpt-4o';

/**
 * LLM Service that can support multiple AI model providers
 */
class LLMService {
  constructor(provider = 'openai', model = 'gpt-4o') {
    this.provider = provider;
    this.model = model;
    
    // Validate provider and model
    if (!this.isValidModel(provider, model)) {
      console.warn(`Unsupported model ${provider}/${model}, falling back to default`);
      [this.provider, this.model] = DEFAULT_MODEL.split('/');
    }
  }
  
  /**
   * Check if a provider/model combination is valid and supported
   */
  isValidModel(provider, model) {
    const supportedModels = {
      'openai': ['gpt-4o', 'gpt-4', 'gpt-3.5-turbo'],
      'qwen': ['qwen2.5-32b', 'qwen2.5-7b'],
      'huggingface': ['llama-3-70b', 'llama-3-8b']
    };
    
    return supportedModels[provider] && supportedModels[provider].includes(model);
  }
  
  /**
   * Generate a response from the selected LLM provider
   */
  async generateResponse(prompt, systemPrompt = 'You are a helpful assistant.') {
    switch (this.provider) {
      case 'openai':
        return this.callOpenAI(prompt, systemPrompt);
      case 'qwen':
        if (ANTHROPIC_API_KEY) {
          return this.callAnthropic(prompt, systemPrompt);
        } else {
          console.warn('Anthropic API key not available for Qwen, using OpenAI fallback');
          return this.callOpenAI(prompt, systemPrompt);
        }
      case 'huggingface':
        if (XAI_API_KEY) {
          return this.callXAI(prompt, systemPrompt);
        } else {
          console.warn('xAI API key not available for Llama, using OpenAI fallback');
          return this.callOpenAI(prompt, systemPrompt);
        }
      default:
        return this.callOpenAI(prompt, systemPrompt);
    }
  }
  
  /**
   * Call OpenAI API to generate a response
   */
  async callOpenAI(prompt, systemPrompt) {
    try {
      if (!OPENAI_API_KEY) {
        throw new Error('OpenAI API key is required');
      }
      
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: this.model, // the newest OpenAI model is "gpt-4o" which was released May 13, 2024.
          messages: [
            { role: 'system', content: systemPrompt },
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
      console.error('Error calling OpenAI:', error);
      if (error.response) {
        console.error('OpenAI API error:', error.response.data);
      }
      throw error;
    }
  }
  
  /**
   * Call Anthropic API to generate a response (used for Qwen models)
   */
  async callAnthropic(prompt, systemPrompt) {
    try {
      if (!ANTHROPIC_API_KEY) {
        throw new Error('Anthropic API key is required for Qwen models');
      }
      
      // Map our Qwen model names to Anthropic model names
      const modelMapping = {
        'qwen2.5-7b': 'claude-3-haiku-20240307',
        'qwen2.5-32b': 'claude-3-opus-20240229',
      };
      
      // Use claude-3-sonnet as a default fallback
      const claudeModel = modelMapping[this.model] || 'claude-3-sonnet-20240229';
      
      const response = await axios.post(
        'https://api.anthropic.com/v1/messages',
        {
          model: claudeModel, 
          system: systemPrompt,
          messages: [
            { role: 'user', content: prompt }
          ],
          temperature: 0.7,
          max_tokens: 800
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': ANTHROPIC_API_KEY,
            'anthropic-version': '2023-06-01'
          }
        }
      );
      
      if (response.data && response.data.content && response.data.content.length > 0) {
        return response.data.content[0].text;
      } else {
        throw new Error('Unexpected response structure from Anthropic');
      }
    } catch (error) {
      console.error('Error calling Anthropic:', error);
      if (error.response) {
        console.error('Anthropic API error:', error.response.data);
      }
      throw error;
    }
  }
  
  /**
   * Call xAI API to generate a response (used for Llama models)
   */
  async callXAI(prompt, systemPrompt) {
    try {
      if (!XAI_API_KEY) {
        throw new Error('xAI API key is required for Llama models');
      }
      
      // Map our Llama model names to xAI/Grok model names
      const modelMapping = {
        'llama-3-8b': 'grok-1',
        'llama-3-70b': 'grok-1.5-pro',
      };
      
      // Use grok-1 as default fallback
      const xaiModel = modelMapping[this.model] || 'grok-1';
      
      const response = await axios.post(
        'https://api.x.ai/v1/chat/completions',
        {
          model: xaiModel,
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: prompt }
          ],
          temperature: 0.7,
          max_tokens: 800
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${XAI_API_KEY}`
          }
        }
      );
      
      if (response.data && response.data.choices && response.data.choices.length > 0) {
        return response.data.choices[0].message.content;
      } else {
        throw new Error('Unexpected response structure from xAI');
      }
    } catch (error) {
      console.error('Error calling xAI:', error);
      if (error.response) {
        console.error('xAI API error:', error.response.data);
      }
      throw error;
    }
  }
}

// This function generates a response from the selected LLM based on the user's query
export async function generateLegalResponse(query, languageCode = 'en', provider = 'openai', model = 'gpt-4o') {
  try {
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
    
    const systemPrompt = 'You are a helpful legal assistant specializing in Indian law.';
    
    // Create an instance of the LLM service with the specified provider and model
    const llmService = new LLMService(provider, model);
    
    // Check if we need to request additional API keys
    if ((provider === 'qwen' && !process.env.ANTHROPIC_API_KEY) || 
        (provider === 'huggingface' && !process.env.XAI_API_KEY)) {
      console.warn(`${provider} API key not found, falling back to OpenAI`);
      // Fallback to OpenAI if the required API key is not available
      return await new LLMService('openai', 'gpt-4o').generateResponse(prompt, systemPrompt);
    }
    
    // Generate response using the selected LLM
    return await llmService.generateResponse(prompt, systemPrompt);
  } catch (error) {
    console.error('Error generating legal response:', error);
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