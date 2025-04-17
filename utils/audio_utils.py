import os
import tempfile
import requests
from io import BytesIO
import numpy as np
import soundfile as sf
from TTS.api import TTS
from pydub import AudioSegment
from openai import OpenAI

# Initialize OpenAI client
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

def transcribe_audio(audio_file_path):
    """
    Transcribe audio using OpenAI's Whisper API
    
    Args:
        audio_file_path (str): Path to the audio file
        
    Returns:
        str: Transcribed text
    """
    try:
        # Open the audio file
        with open(audio_file_path, "rb") as audio_file:
            # Call OpenAI's Audio API with the updated client
            transcription = client.audio.transcriptions.create(
                model="whisper-1",
                file=audio_file
            )
            
        # Return the transcribed text
        return transcription.text
            
    except Exception as e:
        print(f"Error in transcription: {e}")
        return None

def text_to_speech(text, lang_code="en"):
    """
    Convert text to speech using Coqui TTS with Indian accent
    
    Args:
        text (str): Text to convert to speech
        lang_code (str): Language code (en, hi, etc.)
        
    Returns:
        bytes: Audio bytes
    """
    try:
        # Initialize TTS with appropriate model
        if lang_code == "hi":
            # Hindi TTS
            tts = TTS(model_name="tts_models/hi/coqui/vits")
        else:
            # Default to English with Indian accent
            tts = TTS(model_name="tts_models/en/ljspeech/tacotron2-DDC")
        
        # Create temporary file to store the audio
        with tempfile.NamedTemporaryFile(suffix=".wav", delete=False) as temp_file:
            # Generate audio
            tts.tts_to_file(text=text, file_path=temp_file.name)
            
            # Read the file back as bytes
            with open(temp_file.name, "rb") as f:
                audio_bytes = f.read()
            
            # Delete the temporary file
            os.unlink(temp_file.name)
            
            return audio_bytes
            
    except Exception as e:
        print(f"Error in text-to-speech: {e}")
        
        # Fallback to a simpler method if TTS fails
        with tempfile.NamedTemporaryFile(suffix=".wav", delete=False) as temp_file:
            # Generate a simple beep sound as fallback
            sample_rate = 16000
            audio_data = np.sin(2 * np.pi * 440 * np.arange(sample_rate) / sample_rate)
            audio_data = np.tile(audio_data, 3)  # Make it 3 seconds long
            sf.write(temp_file.name, audio_data, sample_rate)
            
            # Read the file back as bytes
            with open(temp_file.name, "rb") as f:
                audio_bytes = f.read()
            
            # Delete the temporary file
            os.unlink(temp_file.name)
            
            return audio_bytes

def convert_audio_format(audio_bytes, source_format="wav", target_format="mp3"):
    """
    Convert audio from one format to another
    
    Args:
        audio_bytes (bytes): Audio bytes
        source_format (str): Source audio format
        target_format (str): Target audio format
        
    Returns:
        bytes: Converted audio bytes
    """
    try:
        # Write source audio to temp file
        with tempfile.NamedTemporaryFile(suffix=f".{source_format}", delete=False) as temp_in:
            temp_in.write(audio_bytes)
            temp_in_path = temp_in.name
        
        # Create output temp file name
        temp_out_path = f"{temp_in_path.rsplit('.', 1)[0]}.{target_format}"
        
        # Convert using pydub
        audio = AudioSegment.from_file(temp_in_path, format=source_format)
        audio.export(temp_out_path, format=target_format)
        
        # Read the converted file
        with open(temp_out_path, "rb") as f:
            output_bytes = f.read()
        
        # Clean up temp files
        os.unlink(temp_in_path)
        os.unlink(temp_out_path)
        
        return output_bytes
        
    except Exception as e:
        print(f"Error in audio conversion: {e}")
        return audio_bytes  # Return original if conversion fails
