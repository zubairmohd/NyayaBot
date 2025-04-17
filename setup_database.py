#!/usr/bin/env python3
"""
Database initialization script for NyayaBot

This script creates the necessary database tables for NyayaBot if they don't already exist.
Run this script before starting the application for the first time.
"""

import os
import sys
import time
from sqlalchemy import create_engine, Column, Integer, String, DateTime, Text, ForeignKey
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship, sessionmaker
import datetime

# Check for database URL
DATABASE_URL = os.environ.get('DATABASE_URL')
if not DATABASE_URL:
    print("Error: DATABASE_URL environment variable not set.")
    print("Please set the DATABASE_URL environment variable and try again.")
    print("Example: export DATABASE_URL=postgresql://username:password@localhost:5432/nyayabot")
    sys.exit(1)

# Create SQLAlchemy engine and base
Base = declarative_base()

# Define models
class User(Base):
    """User model to store user information"""
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, index=True)
    session_id = Column(String, unique=True, index=True)
    preferred_language = Column(String, default="en")
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    last_active = Column(DateTime, default=datetime.datetime.utcnow, onupdate=datetime.datetime.utcnow)
    
    conversations = relationship("Conversation", back_populates="user", cascade="all, delete-orphan")

class Conversation(Base):
    """Model to store conversation history"""
    __tablename__ = "conversations"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    
    user = relationship("User", back_populates="conversations")
    messages = relationship("Message", back_populates="conversation", cascade="all, delete-orphan")

class Message(Base):
    """Model to store individual messages in a conversation"""
    __tablename__ = "messages"
    
    id = Column(Integer, primary_key=True, index=True)
    conversation_id = Column(Integer, ForeignKey("conversations.id"))
    role = Column(String)  # 'user' or 'assistant'
    content = Column(Text)
    original_content = Column(Text, nullable=True)  # For storing original English response if translated
    language = Column(String)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    
    conversation = relationship("Conversation", back_populates="messages")

class Document(Base):
    """Model to store generated legal documents"""
    __tablename__ = "documents"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    doc_type = Column(String)  # e.g., 'Bail Application', 'FIR Complaint', etc.
    content = Column(Text)  # Stored as text or reference to file
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    
    user = relationship("User")

def initialize_database():
    """Initialize the database and create tables if they don't exist"""
    print("Initializing database...")
    
    # Try to connect to the database with retries
    max_retries = 5
    retry_delay = 2
    
    for attempt in range(max_retries):
        try:
            engine = create_engine(DATABASE_URL)
            # Create all tables if they don't exist
            Base.metadata.create_all(engine)
            print("Database tables created successfully!")
            return
        except Exception as e:
            if attempt < max_retries - 1:
                print(f"Database connection failed, retrying in {retry_delay} seconds... (Attempt {attempt+1}/{max_retries})")
                print(f"Error: {str(e)}")
                time.sleep(retry_delay)
                retry_delay *= 2  # Exponential backoff
            else:
                print(f"Failed to initialize database after {max_retries} attempts.")
                print(f"Error: {str(e)}")
                print("\nPlease check your database connection and try again.")
                print("Ensure that:")
                print("1. PostgreSQL is running")
                print("2. The database exists")
                print("3. The user has proper permissions")
                print("4. The DATABASE_URL is correct")
                sys.exit(1)

if __name__ == "__main__":
    initialize_database()
    print("\nDatabase initialization complete. You can now start the NyayaBot application.")
    print("Run 'npm run dev' to start the development server.")