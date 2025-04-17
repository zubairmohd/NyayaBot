import os
import requests
import json
import time
from typing import Any, List, Mapping, Optional

# Updated LangChain imports
from langchain.memory import ConversationBufferMemory
from langchain.chains import ConversationChain
from langchain.llms.base import LLM
from langchain.callbacks.manager import CallbackManagerForLLMRun
from openai import OpenAI

# Initialize API key from environment variable
QWEN_API_KEY = os.getenv("QWEN_API_KEY", "your_qwen_api_key")
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")

# Initialize OpenAI client
openai_client = OpenAI(api_key=OPENAI_API_KEY)

class QwenLLM(LLM):
    """
    Custom LLM implementation for Qwen 2.5 7B
    """
    api_key: str = QWEN_API_KEY
    
    @property
    def _llm_type(self) -> str:
        return "qwen-2.5-7b"
    
    def _call(
        self,
        prompt: str,
        stop: Optional[List[str]] = None,
        run_manager: Optional[CallbackManagerForLLMRun] = None,
        **kwargs: Any,
    ) -> str:
        """
        Call the Qwen API and return the response
        
        Args:
            prompt (str): The prompt to send to the API
            
        Returns:
            str: The response from the API
        """
        try:
            # Implement API call to Qwen 2.5 7B
            # This is a placeholder - actual implementation would depend on the API endpoint for Qwen
            headers = {
                "Content-Type": "application/json",
                "Authorization": f"Bearer {self.api_key}"
            }
            
            data = {
                "model": "qwen-2.5-7b",
                "prompt": prompt,
                "max_tokens": 1000,
                "temperature": 0.7,
                "top_p": 0.9
            }
            
            # Add stop sequences if provided
            if stop:
                data["stop"] = stop
                
            # Make API request
            response = requests.post(
                "https://api.example.com/qwen/generate",  # Replace with actual API endpoint
                headers=headers,
                json=data
            )
            
            # Check if request was successful
            if response.status_code == 200:
                return response.json()["choices"][0]["text"]
            else:
                # Fall back to OpenAI if Qwen API fails
                return self._openai_fallback(prompt, stop)
                
        except Exception as e:
            print(f"Error calling Qwen API: {e}")
            return self._openai_fallback(prompt, stop)
    
    def _openai_fallback(self, prompt: str, stop: Optional[List[str]] = None) -> str:
        """
        Fallback to OpenAI API if Qwen API fails
        
        Args:
            prompt (str): The prompt to send to the API
            stop (List[str], optional): List of stop sequences
            
        Returns:
            str: The response from the API
        """
        try:
            # Make API request to OpenAI using new client format
            messages = [
                {"role": "system", "content": "You are a helpful Indian legal assistant providing advice based on Indian law."}, 
                {"role": "user", "content": prompt}
            ]
            
            # Using GPT-4.1 model as requested by user
            completion = openai_client.chat.completions.create(
                model="gpt-4.1",
                messages=messages,
                max_tokens=1000,
                temperature=0.7,
                top_p=0.9,
                stop=stop
            )
            
            return completion.choices[0].message.content
            
        except Exception as e:
            print(f"Error in OpenAI fallback: {e}")
            return "I apologize, but I'm having trouble accessing my legal knowledge at the moment. Please try again later."

    @property
    def _identifying_params(self) -> Mapping[str, Any]:
        """Return identifying parameters."""
        return {"model": "qwen-2.5-7b"}

def initialize_memory():
    """
    Initialize conversation memory
    
    Returns:
        ConversationBufferMemory: Initialized memory
    """
    return ConversationBufferMemory(return_messages=True)

def get_legal_response(query, memory, language_code="en"):
    """
    Get legal response using RAG with Indian Penal Code documents
    
    Args:
        query (str): The user's query
        memory (ConversationBufferMemory): Memory for conversation history
        language_code (str): Language code for the query
        
    Returns:
        str: The legal response
    """
    from utils.rag_utils import retrieve_relevant_context
    
    # First, retrieve relevant context from our legal documents
    try:
        legal_context = retrieve_relevant_context(query, k=3)
    except Exception as e:
        print(f"Error retrieving context: {e}")
        legal_context = "Unable to retrieve specific legal references."
    
    # Construct the prompt with Indian legal context
    system_prompt = """You are NyayaBot, an AI legal assistant specializing in Indian law. You provide helpful, accurate, and ethical legal information based on:
1. The Indian Constitution
2. Indian Penal Code (IPC)
3. Code of Criminal Procedure (CrPC)
4. Relevant case laws and precedents
5. Other applicable Indian statutes

Your task is to:
- Explain legal concepts in simple, easy-to-understand language
- Provide accurate information about legal procedures and rights
- Help draft basic legal documents when requested
- Always clarify that you're providing information, not legal advice
- Recommend consulting a human lawyer for complex matters
- If you don't know something or it's not in the provided context, clearly state this fact

Respond based on the latest Indian legal framework and maintain professional ethics at all times.

IMPORTANT: Use the legal context provided below to enhance your response. If the question can't be answered with the context, clearly state that you don't have specific information on that topic rather than making up information.
"""
    
    # Combine system prompt with legal context, user query and conversation history
    conversation_history = memory.buffer if hasattr(memory, "buffer") else ""
    full_prompt = f"{system_prompt}\n\nLEGAL CONTEXT:\n{legal_context}\n\nConversation history:\n{conversation_history}\n\nUser query: {query}\n\nResponse:"
    
    # Initialize LLM
    llm = QwenLLM()
    
    # Create conversation chain
    conversation = ConversationChain(
        llm=llm,
        memory=memory,
        verbose=True
    )
    
    # Get response
    try:
        response = conversation.predict(input=query)
    except Exception as e:
        print(f"Error in primary model: {e}")
        # Try fallback to OpenAI
        try:
            # Create OpenAI client 
            from openai import OpenAI
            openai_client = OpenAI()
            
            messages = [
                {"role": "system", "content": f"{system_prompt}\n\nLEGAL CONTEXT:\n{legal_context}"},
                {"role": "user", "content": query}
            ]
            
            completion = openai_client.chat.completions.create(
                model="gpt-4.1",
                messages=messages,
                max_tokens=1000,
                temperature=0.7
            )
            
            response = completion.choices[0].message.content
        except Exception as fallback_error:
            print(f"Error in fallback: {fallback_error}")
            response = "I apologize, but I'm having trouble accessing my legal knowledge at the moment. Please try again later."
    
    # Add to memory
    memory.save_context({"input": query}, {"output": response})
    
    return response
