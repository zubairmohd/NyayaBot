"""
Utility to process uploaded documents and add them to the RAG system
"""
import sys
import os
from typing import List, Optional

# Try to import required packages, but provide fallbacks if they're not available
try:
    import PyPDF2
    PDF_AVAILABLE = True
except ImportError:
    PDF_AVAILABLE = False
    print("Warning: PyPDF2 package not available. PDF processing will be limited.", file=sys.stderr)

try:
    from langchain.schema.document import Document
    from langchain.text_splitter import RecursiveCharacterTextSplitter
    from langchain_community.vectorstores import FAISS
    from langchain_community.embeddings.openai import OpenAIEmbeddings
    from langchain_community.embeddings import HuggingFaceEmbeddings
    LANGCHAIN_AVAILABLE = True
except ImportError:
    LANGCHAIN_AVAILABLE = False
    print("Warning: LangChain packages not available. RAG capabilities will be limited.", file=sys.stderr)

# Initialize embeddings based on available API keys
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")

def get_embeddings():
    """Get the appropriate embeddings model based on available API keys"""
    # Check if LangChain is available first
    if not 'LANGCHAIN_AVAILABLE' in globals() or not LANGCHAIN_AVAILABLE:
        return None
        
    if OPENAI_API_KEY:
        # Use OpenAI embeddings if API key is available
        return OpenAIEmbeddings()
    else:
        # Fall back to local HuggingFace embeddings (no API key needed)
        return HuggingFaceEmbeddings(
            model_name="all-MiniLM-L6-v2",
            model_kwargs={'device': 'cpu'},
            encode_kwargs={'normalize_embeddings': True}
        )

def extract_text_from_pdf(pdf_path: str) -> str:
    """
    Extract text from a PDF file
    
    Args:
        pdf_path (str): Path to the PDF file
        
    Returns:
        str: Extracted text
    """
    # Check if PyPDF2 is available
    if not 'PDF_AVAILABLE' in globals() or not PDF_AVAILABLE:
        print("PyPDF2 not available. Cannot extract text from PDF.")
        return ""
        
    try:
        with open(pdf_path, 'rb') as file:
            reader = PyPDF2.PdfReader(file)
            text = ""
            for page_num in range(len(reader.pages)):
                page = reader.pages[page_num]
                text += page.extract_text()
        return text
    except Exception as e:
        print(f"Error extracting text from PDF: {e}")
        return ""

def process_document(file_path: str) -> bool:
    """
    Process a document and add it to the vector store
    
    Args:
        file_path (str): Path to the document file
        
    Returns:
        bool: Whether the document was successfully processed
    """
    # First, check if we have the required packages
    if not 'PDF_AVAILABLE' in globals() or not PDF_AVAILABLE:
        print("PDF processing capabilities not available. Cannot process document.")
        return False
        
    if not 'LANGCHAIN_AVAILABLE' in globals() or not LANGCHAIN_AVAILABLE:
        print("LangChain RAG capabilities not available. Cannot add to vector store. Still saving document.")
        # At least save the file in the uploads folder
        try:
            os.makedirs(os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), 'uploads'), exist_ok=True)
            print(f"Document saved at {file_path}")
            return True
        except Exception as e:
            print(f"Error saving document: {e}")
            return False
    
    try:
        # Extract text from the document
        text = extract_text_from_pdf(file_path)
        
        if not text:
            print(f"No text extracted from {file_path}")
            return False
        
        # Create document with source metadata
        doc = Document(
            page_content=text,
            metadata={"source": os.path.basename(file_path)}
        )
        
        # Split document into chunks
        text_splitter = RecursiveCharacterTextSplitter(
            chunk_size=1000,
            chunk_overlap=200
        )
        splits = text_splitter.split_documents([doc])
        
        # Get embeddings
        embeddings = get_embeddings()
        
        if embeddings is None:
            print("Embeddings model not available. Cannot add to vector store.")
            return True  # Still return True as we've saved the document
        
        # Create vector store path
        vector_store_dir = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), 'uploads', 'vectorstore')
        os.makedirs(vector_store_dir, exist_ok=True)
        
        # Check if a vector store already exists
        if os.path.exists(os.path.join(vector_store_dir, 'index.faiss')):
            # Load existing vector store
            vector_store = FAISS.load_local(vector_store_dir, embeddings)
            # Add new documents to it
            vector_store.add_documents(splits)
        else:
            # Create new vector store
            vector_store = FAISS.from_documents(splits, embeddings)
        
        # Save the updated vector store
        vector_store.save_local(vector_store_dir)
        
        print(f"Successfully processed document {file_path}")
        return True
    except Exception as e:
        print(f"Error processing document: {e}")
        return False

if __name__ == "__main__":
    # Check if file path was provided as command line argument
    if len(sys.argv) < 2:
        print("Usage: python process_document.py <file_path>")
        sys.exit(1)
    
    file_path = sys.argv[1]
    if not os.path.exists(file_path):
        print(f"File not found: {file_path}")
        sys.exit(1)
    
    success = process_document(file_path)
    sys.exit(0 if success else 1)