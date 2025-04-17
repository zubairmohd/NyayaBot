import os
import datetime
from sqlalchemy import create_engine, Column, Integer, String, Text, DateTime, ForeignKey
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, relationship

# Get database URL from environment
DATABASE_URL = os.getenv("DATABASE_URL")

# Add connection pool settings and SSL handling to make connection more resilient
engine_args = {
    "pool_recycle": 280,  # Recycle connections before they reach PostgreSQL's timeout
    "pool_pre_ping": True,  # Verify connections before using them
    "pool_size": 5,  # Adjust based on expected usage
    "max_overflow": 10,
    "pool_timeout": 30,  # Timeout waiting for a connection from the pool
    "connect_args": {
        "sslmode": "require",
        "connect_timeout": 10,
        "keepalives": 1,  # Enable keepalives
        "keepalives_idle": 60,  # Seconds before sending a keepalive
        "keepalives_interval": 10,  # Seconds between keepalives
        "keepalives_count": 5  # Maximum fails before connection is considered dead
    }
}

# Create SQLAlchemy engine and session
engine = create_engine(DATABASE_URL, **engine_args)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# Define database models
class User(Base):
    """User model to store user information"""
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, index=True)
    session_id = Column(String, unique=True, index=True)
    preferred_language = Column(String, default="en")
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    last_active = Column(DateTime, default=datetime.datetime.utcnow, onupdate=datetime.datetime.utcnow)
    
    # Relationships
    conversations = relationship("Conversation", back_populates="user", cascade="all, delete-orphan")

class Conversation(Base):
    """Model to store conversation history"""
    __tablename__ = "conversations"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    
    # Relationships
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
    
    # Relationships
    conversation = relationship("Conversation", back_populates="messages")
    
class Document(Base):
    """Model to store generated legal documents"""
    __tablename__ = "documents"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    doc_type = Column(String)  # e.g., 'Bail Application', 'FIR Complaint', etc.
    content = Column(Text)  # Stored as text or reference to file
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    
    # Relationships
    user = relationship("User")

def get_db():
    """
    Get database session with retry logic
    
    Returns:
        SQLAlchemy session
    """
    import time
    from sqlalchemy.exc import OperationalError, ProgrammingError, DatabaseError
    
    max_retries = 3
    retry_delay = 1  # seconds
    
    for attempt in range(max_retries):
        try:
            db = SessionLocal()
            # Test the connection with a simple query
            db.execute("SELECT 1")
            return db
        except (OperationalError, ProgrammingError, DatabaseError) as e:
            if attempt < max_retries - 1:
                print(f"Database connection error (attempt {attempt+1}/{max_retries}): {e}")
                time.sleep(retry_delay)
                # Increase delay for next retry (exponential backoff)
                retry_delay *= 2
            else:
                print(f"Failed to connect to database after {max_retries} attempts")
                # On final attempt, still return the session and let the caller handle any errors
                db = SessionLocal()
                return db
        except Exception as e:
            print(f"Unexpected database error: {e}")
            db = SessionLocal()
            return db

def init_db():
    """Initialize database, creating tables if they don't exist"""
    import time
    from sqlalchemy.exc import OperationalError, ProgrammingError, DatabaseError
    
    max_retries = 3
    retry_delay = 1  # seconds
    
    for attempt in range(max_retries):
        try:
            Base.metadata.create_all(bind=engine)
            print("Database tables created successfully.")
            return
        except (OperationalError, ProgrammingError, DatabaseError) as e:
            if attempt < max_retries - 1:
                print(f"Database initialization error (attempt {attempt+1}/{max_retries}): {e}")
                time.sleep(retry_delay)
                # Increase delay for next retry (exponential backoff)
                retry_delay *= 2
            else:
                print(f"Failed to initialize database after {max_retries} attempts: {e}")
                # Don't raise here to allow app to start even if DB isn't available yet
        except Exception as e:
            print(f"Unexpected error during database initialization: {e}")
            break

# Initialize database on module import - wrapped in try/except to avoid
# app startup failures if database is temporarily unavailable
try:
    init_db()
except Exception as e:
    print(f"Database initialization deferred due to error: {e}")