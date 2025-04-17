import os
import requests
from langdetect import detect
from google.cloud import translate_v2 as translate
from googletrans import Translator  # Fallback translator

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
    # Fallback to googletrans library
    fallback_translator = Translator()

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
            response = google_translate_client.translate(
                text,
                target_language=target_language
            )
            return response['translatedText']
        except Exception:
            # Fallback to googletrans
            translation = fallback_translator.translate(
                text, 
                dest=target_language
            )
            return translation.text
            
    except Exception as e:
        print(f"Error translating text: {e}")
        return text  # Return original text if translation fails
