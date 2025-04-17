#!/usr/bin/env python
"""
Utility to retrieve relevant context from RAG system based on user query
"""
import sys
import os
from typing import List

# Try to import required packages, but provide fallbacks if they're not available
try:
    from langchain.schema.document import Document
    from langchain_community.vectorstores import FAISS
    from langchain_community.embeddings.openai import OpenAIEmbeddings
    from langchain_community.embeddings import HuggingFaceEmbeddings
    LANGCHAIN_AVAILABLE = True
except ImportError:
    LANGCHAIN_AVAILABLE = False
    print("Warning: LangChain packages not available. Falling back to basic context retrieval.", file=sys.stderr)

# Initialize embeddings based on available API keys
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")

def get_embeddings():
    """Get the appropriate embeddings model based on available API keys"""
    # Return None if LangChain isn't available
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

def retrieve_context(query: str, k: int = 3) -> str:
    """
    Retrieve relevant context from legal documents based on query
    
    Args:
        query (str): User query
        k (int): Number of documents to retrieve
        
    Returns:
        str: Relevant context
    """
    # If LangChain isn't available, fall back to basic extraction
    if not 'LANGCHAIN_AVAILABLE' in globals() or not LANGCHAIN_AVAILABLE:
        return extract_context_from_assets(query)
    
    try:
        # Get embeddings
        embeddings = get_embeddings()
        
        # Check for vector store directory
        vector_store_dir = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), 'uploads', 'vectorstore')
        
        # Check if the directory exists and contains FAISS indices
        if not os.path.exists(vector_store_dir) or not os.path.exists(os.path.join(vector_store_dir, 'index.faiss')):
            # If no vector store exists, use PDF assets included in the project
            context = extract_context_from_assets(query)
            return context
        
        # Load the vector store
        vector_store = FAISS.load_local(vector_store_dir, embeddings)
        
        # Search for similar documents
        docs = vector_store.similarity_search(query, k=k)
        
        # Compile the relevant context
        context = "\n\n".join([doc.page_content for doc in docs])
        
        return context
    except Exception as e:
        print(f"Error retrieving context: {e}", file=sys.stderr)
        # Return context from assets if vector store retrieval fails
        return extract_context_from_assets(query)

def extract_context_from_assets(query: str) -> str:
    """
    Extract context from project asset PDFs (Indian Penal Code)
    
    Args:
        query (str): User query
        
    Returns:
        str: Relevant context
    """
    try:
        import PyPDF2
        
        # Default context if extraction fails
        default_context = """
        The Indian Penal Code (IPC) is the official criminal code of India that covers all substantive aspects of criminal law. 
        It was drafted in 1860 and came into force in 1862.
        Section 299 and 300 deal with culpable homicide and murder.
        Section 375 covers sexual assault.
        Section 378 covers theft.
        Section 415 covers fraud and cheating.
        It applies to the whole of India, except Jammu and Kashmir.
        """
        
        # Path to assets
        assets_dir = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), 'attached_assets')
        pdf_files = [
            os.path.join(assets_dir, 'Indian Penal Code Book (2).pdf'),
            os.path.join(assets_dir, 'THE-INDIAN-PENAL-CODE-1860.pdf')
        ]
        
        # Extract text from PDFs (limited to first 20 pages for performance)
        all_text = ""
        for pdf_path in pdf_files:
            if os.path.exists(pdf_path):
                try:
                    with open(pdf_path, 'rb') as f:
                        reader = PyPDF2.PdfReader(f)
                        max_pages = min(20, len(reader.pages))
                        for i in range(max_pages):
                            text = reader.pages[i].extract_text()
                            all_text += text + "\n\n"
                except Exception as e:
                    print(f"Error reading PDF {pdf_path}: {e}", file=sys.stderr)
        
        # If no text was extracted, return default context
        if not all_text:
            return default_context
        
        # Simple keyword search for relevant sections
        query_words = query.lower().split()
        relevant_paragraphs = []
        
        # Split text into paragraphs and search for query terms
        paragraphs = all_text.split('\n\n')
        for paragraph in paragraphs:
            paragraph_text = paragraph.lower()
            score = sum(1 for word in query_words if word in paragraph_text)
            if score > 0:
                relevant_paragraphs.append((paragraph, score))
        
        # Sort by relevance score
        relevant_paragraphs.sort(key=lambda x: x[1], reverse=True)
        
        # Take top 5 paragraphs or fewer if not enough
        top_paragraphs = [p[0] for p in relevant_paragraphs[:5]]
        
        # Join the paragraphs with separators
        context = "\n\n".join(top_paragraphs)
        
        return context if context else default_context
    except Exception as e:
        print(f"Error extracting context from assets: {e}", file=sys.stderr)
        return """
        The Indian Penal Code (IPC) is the official criminal code of India that covers all substantive aspects of criminal law. 
        It was drafted in 1860 and came into force in 1862.
        Section 299 and 300 deal with culpable homicide and murder.
        Section 375 covers sexual assault.
        Section 378 covers theft.
        Section 415 covers fraud and cheating.
        It applies to the whole of India, except Jammu and Kashmir.
        """

if __name__ == "__main__":
    # Check if query was provided as command line argument
    if len(sys.argv) < 2:
        print("Usage: python retrieve_context.py <query>")
        sys.exit(1)
    
    query = sys.argv[1]
    context = retrieve_context(query)
    print(context)
    sys.exit(0)