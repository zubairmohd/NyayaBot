"""
Retrieval Augmented Generation utilities for enhancing legal responses
"""
import os
import tempfile
from typing import List, Dict, Any, Optional
import PyPDF2

from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.vectorstores import FAISS
from langchain.embeddings import OpenAIEmbeddings
from langchain.schema.document import Document

# Path to legal documents
LEGAL_DOCS_PATH = "./attached_assets"
IPC_PDF_FILES = [
    os.path.join(LEGAL_DOCS_PATH, "Indian Penal Code Book (2).pdf"),
    os.path.join(LEGAL_DOCS_PATH, "THE-INDIAN-PENAL-CODE-1860.pdf"),
]

# Initialize OpenAI embeddings
embeddings = OpenAIEmbeddings()

# Vector store for our documents
vector_store = None

def extract_text_from_pdf(pdf_path: str) -> str:
    """
    Extract text from a PDF file
    
    Args:
        pdf_path (str): Path to the PDF file
        
    Returns:
        str: Extracted text
    """
    with open(pdf_path, 'rb') as file:
        reader = PyPDF2.PdfReader(file)
        text = ""
        for page_num in range(len(reader.pages)):
            page = reader.pages[page_num]
            text += page.extract_text()
    return text

def load_legal_documents() -> List[Document]:
    """
    Load legal documents from the assets folder
    
    Returns:
        List[Document]: List of Document objects
    """
    documents = []
    
    # Load IPC documents
    for pdf_path in IPC_PDF_FILES:
        if os.path.exists(pdf_path):
            text = extract_text_from_pdf(pdf_path)
            # Create document with source metadata
            doc = Document(
                page_content=text,
                metadata={"source": os.path.basename(pdf_path)}
            )
            documents.append(doc)
    
    return documents

def create_vector_store():
    """
    Create a vector store from legal documents
    
    Returns:
        FAISS: Vector store
    """
    global vector_store
    
    # Only create if it doesn't exist
    if vector_store is None:
        # Load documents
        documents = load_legal_documents()
        
        if not documents:
            print("No legal documents found!")
            return None
        
        # Split documents into chunks
        text_splitter = RecursiveCharacterTextSplitter(
            chunk_size=1000,
            chunk_overlap=200
        )
        splits = text_splitter.split_documents(documents)
        
        # Create vector store
        vector_store = FAISS.from_documents(splits, embeddings)
    
    return vector_store

def retrieve_relevant_context(query: str, k: int = 3) -> str:
    """
    Retrieve relevant context from legal documents based on query
    
    Args:
        query (str): User query
        k (int): Number of documents to retrieve
        
    Returns:
        str: Relevant context
    """
    # Ensure vector store is created
    if vector_store is None:
        create_vector_store()
    
    if vector_store is None:
        return "No legal reference documents available."
    
    # Search for relevant documents
    docs = vector_store.similarity_search(query, k=k)
    
    # Combine relevant contexts
    contexts = []
    for i, doc in enumerate(docs):
        source = doc.metadata.get("source", "Unknown")
        contexts.append(f"[Document {i+1} from {source}]: {doc.page_content}")
    
    return "\n\n".join(contexts)

# Initialize the vector store when module is imported
create_vector_store()