import streamlit as st
import os
import base64
import time
import tempfile
import datetime
from io import BytesIO
import uuid
from utils.audio_utils import transcribe_audio, text_to_speech
from utils.llm_utils import get_legal_response, initialize_memory
from utils.document_generator import generate_document
from utils.language_utils import translate_text, detect_language, supported_languages
from utils.db_utils import User, Conversation, Message, Document, get_db, init_db

# Page configuration
st.set_page_config(
    page_title="NyayaBot - Your Free AI Lawyer",
    page_icon="⚖️",
    layout="wide"
)

# Initialize database
init_db()

# Get or create user in database
def get_or_create_user(session_id, preferred_language="en"):
    db = next(get_db())
    user = db.query(User).filter(User.session_id == session_id).first()
    
    if not user:
        user = User(
            session_id=session_id,
            preferred_language=preferred_language
        )
        db.add(user)
        db.commit()
        db.refresh(user)
        
        # Create initial conversation
        conversation = Conversation(user_id=user.id)
        db.add(conversation)
        db.commit()
        db.refresh(conversation)
        
        # Store conversation ID in session state
        st.session_state.conversation_id = conversation.id
    else:
        # Get the most recent conversation
        conversation = db.query(Conversation).filter(
            Conversation.user_id == user.id
        ).order_by(Conversation.created_at.desc()).first()
        
        if not conversation:
            # Create a new conversation if none exists
            conversation = Conversation(user_id=user.id)
            db.add(conversation)
            db.commit()
            db.refresh(conversation)
        
        # Store conversation ID in session state
        st.session_state.conversation_id = conversation.id
        
        # Update the user's last_active timestamp
        user.last_active = datetime.datetime.utcnow()
        db.commit()
        
        # If user has a preferred language, use it
        lang_code = user.preferred_language
        for name, code in supported_languages.items():
            if code == lang_code:
                st.session_state.language = name
                break
    
    return user.id

# Initialize session state variables
if 'conversation_history' not in st.session_state:
    st.session_state.conversation_history = []
if 'memory' not in st.session_state:
    st.session_state.memory = initialize_memory()
if 'language' not in st.session_state:
    st.session_state.language = "English"
if 'session_id' not in st.session_state:
    st.session_state.session_id = str(uuid.uuid4())
if 'user_id' not in st.session_state:
    # Get or create user from database
    st.session_state.user_id = get_or_create_user(
        st.session_state.session_id, 
        supported_languages.get(st.session_state.language, "en")
    )

# Custom function to display the SVG logo
def render_svg():
    with open("assets/nyayabot_logo.svg", "r") as f:
        svg_content = f.read()
    
    b64 = base64.b64encode(svg_content.encode('utf-8')).decode("utf-8")
    html = f'''
    <div style="display: flex; justify-content: center;">
        <img src="data:image/svg+xml;base64,{b64}" width="150px" />
    </div>
    '''
    st.markdown(html, unsafe_allow_html=True)

# Header
col1, col2, col3 = st.columns([1, 2, 1])
with col2:
    render_svg()
    st.title("NyayaBot - आपका AI वकील")
    st.markdown("##### Instant Legal Advice in Your Language")

# Language selection
languages = list(supported_languages.keys())
selected_language = st.selectbox(
    "Choose your preferred language:",
    languages,
    index=languages.index(st.session_state.language)
)

if selected_language != st.session_state.language:
    st.session_state.language = selected_language
    st.rerun()

# Disclaimer
with st.expander("📝 Important Disclaimer", expanded=False):
    disclaimer_text = "This AI legal assistant provides general information and guidance based on Indian laws. " \
                     "It is not a substitute for professional legal advice. The information provided should not " \
                     "be considered as legal advice, and no attorney-client relationship is created by using this service. " \
                     "For critical legal matters, please consult with a qualified attorney."
    
    # Translate disclaimer if not in English
    if st.session_state.language != "English":
        disclaimer_text = translate_text(disclaimer_text, supported_languages[st.session_state.language])
    
    st.markdown(disclaimer_text)

# Main interface
st.markdown("### How can I help you with your legal query today?")

# Voice input section
st.markdown("#### 🎤 Speak Your Query")

# Record audio button
audio_file = st.file_uploader("Or upload an audio file", type=['wav', 'mp3', 'ogg'], label_visibility="collapsed")
            
if st.button("🎙️ Click to Record (10 seconds)"):
    with st.spinner("Recording your voice..."):
        # Using streamlit's audio recorder and displaying a countdown
        audio_bytes = st.audio_recorder(pause_threshold=10.0, sample_rate=16000)
        if audio_bytes:
            st.audio(audio_bytes, format="audio/wav")
            
            # Process the audio
            with st.spinner("Processing your audio..."):
                with tempfile.NamedTemporaryFile(delete=False, suffix='.wav') as tmp_file:
                    tmp_file.write(audio_bytes)
                    tmp_file_path = tmp_file.name
                
                # Transcribe the audio using Whisper API
                transcribed_text = transcribe_audio(tmp_file_path)
                
                # Clean up temp file
                os.unlink(tmp_file_path)
                
                if transcribed_text:
                    # Detect language if not obvious
                    detected_lang = detect_language(transcribed_text)
                    st.session_state.conversation_history.append({"role": "user", "content": transcribed_text, "language": detected_lang})
                    
                    # Save user message to database
                    db = next(get_db())
                    user_message = Message(
                        conversation_id=st.session_state.conversation_id,
                        role="user",
                        content=transcribed_text,
                        language=detected_lang
                    )
                    db.add(user_message)
                    db.commit()
                    
                    # Get AI response
                    response = get_legal_response(transcribed_text, st.session_state.memory, detected_lang)
                    
                    # Translate response if needed (based on detected input language)
                    if detected_lang != "en" and detected_lang in supported_languages.values():
                        translated_response = translate_text(response, detected_lang)
                        st.session_state.conversation_history.append({
                            "role": "assistant", 
                            "content": translated_response, 
                            "original": response, 
                            "language": detected_lang
                        })
                        
                        # Save assistant response to database
                        assistant_message = Message(
                            conversation_id=st.session_state.conversation_id,
                            role="assistant",
                            content=translated_response,
                            original_content=response,
                            language=detected_lang
                        )
                    else:
                        st.session_state.conversation_history.append({
                            "role": "assistant", 
                            "content": response, 
                            "language": "en"
                        })
                        
                        # Save assistant response to database
                        assistant_message = Message(
                            conversation_id=st.session_state.conversation_id,
                            role="assistant",
                            content=response,
                            language="en"
                        )
                        
                    db.add(assistant_message)
                    db.commit()
                    
                    # Generate audio response
                    audio_response = text_to_speech(
                        st.session_state.conversation_history[-1]["content"], 
                        detected_lang if detected_lang != "en" else "en"
                    )
                    
                    st.rerun()

if audio_file is not None:
    # Process uploaded audio file
    with st.spinner("Processing your audio file..."):
        # Save uploaded file to temp location
        with tempfile.NamedTemporaryFile(delete=False, suffix='.wav') as tmp_file:
            tmp_file.write(audio_file.getvalue())
            tmp_file_path = tmp_file.name
        
        # Transcribe the audio
        transcribed_text = transcribe_audio(tmp_file_path)
        
        # Clean up temp file
        os.unlink(tmp_file_path)
        
        if transcribed_text:
            # Detect language
            detected_lang = detect_language(transcribed_text)
            st.session_state.conversation_history.append({"role": "user", "content": transcribed_text, "language": detected_lang})
            
            # Save user message to database
            db = next(get_db())
            user_message = Message(
                conversation_id=st.session_state.conversation_id,
                role="user",
                content=transcribed_text,
                language=detected_lang
            )
            db.add(user_message)
            db.commit()
            
            # Get AI response
            response = get_legal_response(transcribed_text, st.session_state.memory, detected_lang)
            
            # Translate response if needed
            if detected_lang != "en" and detected_lang in supported_languages.values():
                translated_response = translate_text(response, detected_lang)
                st.session_state.conversation_history.append({
                    "role": "assistant", 
                    "content": translated_response, 
                    "original": response, 
                    "language": detected_lang
                })
                
                # Save assistant response to database
                assistant_message = Message(
                    conversation_id=st.session_state.conversation_id,
                    role="assistant",
                    content=translated_response,
                    original_content=response,
                    language=detected_lang
                )
            else:
                st.session_state.conversation_history.append({
                    "role": "assistant", 
                    "content": response, 
                    "language": "en"
                })
                
                # Save assistant response to database
                assistant_message = Message(
                    conversation_id=st.session_state.conversation_id,
                    role="assistant",
                    content=response,
                    language="en"
                )
                
            db.add(assistant_message)
            db.commit()
            
            # Generate audio response
            audio_response = text_to_speech(
                st.session_state.conversation_history[-1]["content"], 
                detected_lang if detected_lang != "en" else "en"
            )
            
            st.rerun()

# Text input as alternative
text_query = st.text_input("Or type your query here:")
if st.button("Submit Query") and text_query:
    with st.spinner("Processing your query..."):
        # Detect language
        detected_lang = detect_language(text_query)
        st.session_state.conversation_history.append({"role": "user", "content": text_query, "language": detected_lang})
        
        # Save user message to database
        db = next(get_db())
        user_message = Message(
            conversation_id=st.session_state.conversation_id,
            role="user",
            content=text_query,
            language=detected_lang
        )
        db.add(user_message)
        db.commit()
        
        # Get AI response
        response = get_legal_response(text_query, st.session_state.memory, detected_lang)
        
        # Translate response if needed
        if detected_lang != "en" and detected_lang in supported_languages.values():
            translated_response = translate_text(response, detected_lang)
            st.session_state.conversation_history.append({
                "role": "assistant", 
                "content": translated_response, 
                "original": response, 
                "language": detected_lang
            })
            
            # Save assistant response to database
            assistant_message = Message(
                conversation_id=st.session_state.conversation_id,
                role="assistant",
                content=translated_response,
                original_content=response,
                language=detected_lang
            )
        else:
            st.session_state.conversation_history.append({
                "role": "assistant", 
                "content": response, 
                "language": "en"
            })
            
            # Save assistant response to database
            assistant_message = Message(
                conversation_id=st.session_state.conversation_id,
                role="assistant",
                content=response,
                language="en"
            )
            
        db.add(assistant_message)
        db.commit()
        
        # Generate audio response
        audio_response = text_to_speech(
            st.session_state.conversation_history[-1]["content"], 
            detected_lang if detected_lang != "en" else "en"
        )
        
        st.rerun()

# Display conversation
st.markdown("### 💬 Conversation History")

if not st.session_state.conversation_history:
    sample_queries = [
        "मुझे जमानत चाहिए under Section 437 CrPC",
        "How do I file an FIR for theft?",
        "What are my rights if I'm arrested?",
        "Rent agreement के लिए क्या process है?",
        "Consumer court में complaint कैसे file करें?"
    ]
    
    st.info("No conversation yet. Try asking a legal question like:")
    for query in sample_queries:
        st.markdown(f"- *{query}*")
else:
    for i, message in enumerate(st.session_state.conversation_history):
        if message["role"] == "user":
            st.markdown(f"**You:** {message['content']}")
        else:
            col1, col2 = st.columns([10, 1])
            with col1:
                st.markdown(f"**NyayaBot:** {message['content']}")
                
                # Add original English response in expander if translated
                if "original" in message:
                    with st.expander("See in English"):
                        st.markdown(message["original"])
            
            with col2:
                # Play audio button
                audio_file_key = f"audio_{i}"
                if audio_file_key not in st.session_state:
                    audio_bytes = text_to_speech(message["content"], message["language"])
                    st.session_state[audio_file_key] = audio_bytes
                
                if st.button("🔊", key=f"play_{i}"):
                    st.audio(st.session_state[audio_file_key], format="audio/mp3")

# Document Generation Section
st.markdown("### 📄 Generate Legal Documents")

doc_type = st.selectbox(
    "Select document type to generate:",
    ["Bail Application", "FIR Complaint", "Legal Notice", "Affidavit", "PIL Draft"]
)

if st.button("Generate Document"):
    # Check if there's conversation history to use
    if not st.session_state.conversation_history:
        st.error("Please have a conversation first so I understand your legal needs.")
    else:
        with st.spinner("Generating your legal document..."):
            # Extract relevant information from conversation
            conversation_text = "\n".join([f"{msg['role']}: {msg['content']}" 
                                          for msg in st.session_state.conversation_history])
            
            # Generate the document and save to database
            doc_content = generate_document(doc_type, conversation_text, st.session_state.user_id)
            
            # No need to encode as generate_document now returns bytes
            pdf_bytes = BytesIO(doc_content)
            pdf_bytes.seek(0)
            
            # Offer download
            st.download_button(
                label=f"Download {doc_type}",
                data=pdf_bytes,
                file_name=f"{doc_type.lower().replace(' ', '_')}_{st.session_state.session_id}.pdf",
                mime="application/pdf"
            )
            
            st.success(f"Your {doc_type} has been generated successfully!")

# Clear conversation button
if st.button("Clear Conversation"):
    st.session_state.conversation_history = []
    st.session_state.memory = initialize_memory()
    
    # Create a new conversation in the database
    db = next(get_db())
    conversation = Conversation(user_id=st.session_state.user_id)
    db.add(conversation)
    db.commit()
    db.refresh(conversation)
    
    # Update the conversation ID in session state
    st.session_state.conversation_id = conversation.id
    
    st.rerun()

# Footer
st.markdown("---")
st.markdown(
    "**NyayaBot** - Providing free legal assistance in Indian languages. "
    "This is an AI assistant and not a substitute for professional legal advice."
)
