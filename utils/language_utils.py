import os
import requests
from langdetect import detect
from google.cloud import translate_v2 as translate
from openai import OpenAI

# Define supported languages with their codes
supported_languages = {
    "English": "en",
    "Hindi": "hi",
    "Bengali": "bn",
    "Tamil": "ta",
    "Telugu": "te",
    "Marathi": "mr",
    "Gujarati": "gu",
    "Kannada": "kn",
    "Malayalam": "ml",
    "Punjabi": "pa",
    "Oriya": "or",
    "Assamese": "as",
    "Urdu": "ur"
}

# Initialize Google Translate
try:
    # Try to use Google Cloud Translation if credentials are available
    google_translate_client = translate.Client()
except Exception:
    # We'll use OpenAI as fallback - no initialization needed here
    google_translate_client = None

def detect_language(text):
    """
    Detect the language of the text
    
    Args:
        text (str): Text to detect language from
        
    Returns:
        str: Language code (e.g., "en", "hi")
    """
    try:
        # Check for Hinglish by looking for common patterns
        english_words = sum(1 for word in text.split() if word.isascii())
        total_words = len(text.split())
        
        if total_words > 0:
            english_ratio = english_words / total_words
            
            # If mixed English and Hindi words (Hinglish)
            if 0.3 <= english_ratio <= 0.7:
                return "hi"  # Treat Hinglish as Hindi for processing
        
        # Use langdetect for standard detection
        detected = detect(text)
        
        # Validate if the detected language is in our supported list
        if detected in supported_languages.values():
            return detected
        else:
            # Default to English if not supported
            return "en"
            
    except Exception as e:
        print(f"Error detecting language: {e}")
        return "en"  # Default to English on error

def translate_text(text, target_language):
    """
    Translate text to the target language
    
    Args:
        text (str): Text to translate
        target_language (str): Target language code
        
    Returns:
        str: Translated text
    """
    try:
        # Skip translation if already in target language
        if detect_language(text) == target_language:
            return text
            
        # Try using Google Cloud Translation
        try:
            if google_translate_client:
                response = google_translate_client.translate(
                    text,
                    target_language=target_language
                )
                return response['translatedText']
            else:
                # Fallback to OpenAI for translation
                raise Exception("Google Translation not available")
        except Exception:
            # Fallback to OpenAI
            client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))
            language_name = next((name for name, code in supported_languages.items() if code == target_language), target_language)
            
            prompt = f"Translate the following text to {language_name}. Response should only contain the translated text, nothing else:\n\n{text}"
            
            response = client.chat.completions.create(
                model="gpt-4o",  # the newest OpenAI model is "gpt-4o" which was released May 13, 2024, do not change this unless explicitly requested by the user
                messages=[
                    {"role": "system", "content": f"You are a professional translator. Translate text to {language_name} accurately."},
                    {"role": "user", "content": prompt}
                ]
            )
            
            return response.choices[0].message.content
            
    except Exception as e:
        print(f"Error translating text: {e}")
        return text  # Return original text if translation fails
