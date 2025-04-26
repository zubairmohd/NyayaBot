# NyayaBot
Indian Legal and Law Informations according to Indian Penal Code
=======
# NyayaBot - Your AI Legal Assistant

NyayaBot is an AI-powered legal assistance platform tailored for Indian users, providing accessible, multilingual legal support across various communication channels.

![NyayaBot Screenshot](https://github.com/Zubair2020/NyayaBot/blob/main/attached_assets/Screenshot.PNG)


## Features

- **AI Legal Assistance**: Get legal information and advice related to Indian law
- **Multiple AI Models**: Choose from OpenAI GPT-4o, GPT-3.5, Qwen models, or Llama models
- **Multilingual Support**: Communicate in English, Hindi, Bengali, Telugu, Tamil, Kannada, Marathi, and Gujarati
- **Voice Interaction**: Use voice input to ask questions and get voice responses
- **Document Upload**: Upload legal documents for analysis and context-aware responses
- **Legal Document Generation**: Create legal documents like applications and notices

## Quick Start Guide

### Prerequisites

- Node.js (v14.x or higher)
- Python (v3.9 or higher)
- PostgreSQL database
- API keys for language models (OpenAI, Anthropic, etc.)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Zubair2020/NyayaBot.git
   cd NyayaBot
   ```

2. **Install Node.js dependencies**
   ```bash
   npm install
   ```

3. **Install Python dependencies**
   ```bash
   pip install -r requirements.txt
   ```
   
   Note: If there's no requirements.txt file, install the packages listed in PYTHON_DEPENDENCIES.md:
   ```bash
   pip install openai anthropic langchain langchain-community faiss-cpu pypdf2 langdetect psycopg2-binary pydub soundfile tts
   ```

4. **Set up environment variables**
   Create a `.env` file in the root directory with the following variables:
   ```
   # Database
   DATABASE_URL=postgres://username:password@localhost:5432/nyayabot
   
   # API Keys
   OPENAI_API_KEY=your_openai_api_key
   ANTHROPIC_API_KEY=your_anthropic_api_key  # Optional
   XAI_API_KEY=your_xai_api_key  # Optional
   
   # Server Configuration
   PORT=5000
   NODE_ENV=development
   ```

5. **Initialize the database**
   Create a PostgreSQL database and initialize it using the provided script:
   ```bash
   # Create a PostgreSQL database
   createdb nyayabot
   
   # Set DATABASE_URL environment variable
   export DATABASE_URL=postgres://username:password@localhost:5432/nyayabot
   
   # Run the database initialization script
   python setup_database.py
   ```

6. **Start the development server**
   ```bash
   npm run dev
   ```

7. **Access the application**
   Open your browser and navigate to `http://localhost:5000`

## Detailed Setup Guide

### Database Setup

1. Install PostgreSQL if not already installed
2. Create a new database:
   ```bash
   createdb nyayabot
   ```
3. The application will automatically create the necessary tables on first run

### API Keys Setup

The application requires API keys for the language models:

1. **OpenAI API Key (Required)**
   - Sign up at [OpenAI](https://platform.openai.com/signup)
   - Create an API key at [API Keys](https://platform.openai.com/account/api-keys)
   - Add to your `.env` file as `OPENAI_API_KEY=your_key_here`

2. **Anthropic API Key (Optional, for Claude models)**
   - Sign up at [Anthropic](https://console.anthropic.com/)
   - Create an API key
   - Add to your `.env` file as `ANTHROPIC_API_KEY=your_key_here`

3. **xAI API Key (Optional, for Grok models)**
   - Sign up at [x.ai](https://x.ai/)
   - Create an API key
   - Add to your `.env` file as `XAI_API_KEY=your_key_here`

### Environment Configuration

Create a `.env` file in the root directory with the following:

```
# Database
DATABASE_URL=postgres://username:password@localhost:5432/nyayabot
PGUSER=your_postgres_username
PGPASSWORD=your_postgres_password
PGDATABASE=nyayabot
PGHOST=localhost
PGPORT=5432

# API Keys
OPENAI_API_KEY=your_openai_api_key
ANTHROPIC_API_KEY=your_anthropic_api_key  # Optional
XAI_API_KEY=your_xai_api_key  # Optional

# Server Configuration
PORT=5000
NODE_ENV=development
```

### Running the Application

#### Development Mode
```bash
npm run dev
```

#### Production Mode
```bash
npm run build
npm start
```

### Folder Structure

- `components/` - React components
  - `chat/` - Chat interface components
  - `document/` - Document handling components
  - `layout/` - Layout components
- `pages/` - Next.js pages and API routes
  - `api/` - API endpoints
- `utils/` - Utility functions and Python scripts
  - `db_utils.py` - Database utilities
  - `rag_utils.py` - Retrieval Augmented Generation
  - `process_document.py` - Document processing
- `public/` - Static assets
- `styles/` - CSS stylesheets
- `assets/` - Legal documents for RAG context
- `uploads/` - Temporary storage for uploaded documents

## Technologies Used

### Frontend
- Next.js (React framework)
- Material UI (Component library)
- Axios (API requests)

### Backend
- Node.js API routes (Web interface)
- Python (NLP and document processing)
- PostgreSQL (Data storage)
- LangChain (RAG system)

## AI Models

The application supports multiple AI models:
- OpenAI GPT-4o (default)
- OpenAI GPT-3.5 Turbo
- Qwen 2.5 (7B and 32B variants)
- Llama 3 (8B and 70B variants)

## Troubleshooting

### Database Connection Issues
- Verify PostgreSQL is running: `pg_isready`
- Check connection details in `.env` file
- Ensure PostgreSQL user has proper permissions

### API Key Issues
- Verify API keys in `.env` file
- Check API key permissions and rate limits
- OpenAI key must have access to GPT-4 models if using GPT-4o

### Audio Not Working
- Check browser permissions for microphone
- Ensure proper audio libraries are installed for Python
- For text-to-speech, browser must support SpeechSynthesis API

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contributors

- [Zubair](https://github.com/Zubair2020)

## Acknowledgements

- OpenAI for GPT models
- Anthropic for Claude models
- Indian Penal Code documentation used for RAG
