import { useState, useRef, useEffect } from 'react';
import { 
  Box, 
  TextField, 
  Button, 
  Typography, 
  Paper, 
  IconButton,
  CircularProgress,
  useTheme,
  Card,
  Avatar,
  Container,
  Select,
  MenuItem,
  Chip,
  Stack,
  Tooltip
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import MicIcon from '@mui/icons-material/Mic';
import StopIcon from '@mui/icons-material/Stop';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import HeadsetIcon from '@mui/icons-material/Headset';
import axios from 'axios';
import LanguageIcon from '@mui/icons-material/Language';
import SmartToyIcon from '@mui/icons-material/SmartToy';

export default function ChatInterface() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [selectedModel, setSelectedModel] = useState('openai/gpt-4o');
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const messagesEndRef = useRef(null);
  const theme = useTheme();
  
  // Available languages
  const languages = [
    { code: 'en', name: 'English' },
    { code: 'hi', name: 'हिंदी (Hindi)' },
    { code: 'bn', name: 'বাংলা (Bengali)' },
    { code: 'te', name: 'తెలుగు (Telugu)' },
    { code: 'ta', name: 'தமிழ் (Tamil)' },
    { code: 'kn', name: 'ಕನ್ನಡ (Kannada)' },
    { code: 'mr', name: 'मराठी (Marathi)' },
    { code: 'gu', name: 'ગુજરાતી (Gujarati)' },
  ];

  // Initial welcome message with proper styling
  useEffect(() => {
    // Only add welcome message if there are no messages yet
    if (messages.length === 0) {
      setMessages([{ 
        role: 'assistant', 
        content: 'Hello! I am NyayaBot, your AI legal assistant. How can I help you today?'
      }]);
    }
  }, [messages.length]);
  
  // Media recorder setup for voice input
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  
  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async () => {
    if (input.trim() === '') return;
    
    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    
    try {
      // Get provider and model from selection
      const [provider, model] = selectedModel.split('/');
      
      // Make a real API call to our backend
      const response = await axios.post('/api/chat', {
        message: input,
        language: selectedLanguage,
        provider,
        model
      });
      
      if (response.data && response.data.message) {
        const botResponse = {
          role: 'assistant',
          content: response.data.message
        };
        setMessages(prev => [...prev, botResponse]);
      } else {
        throw new Error('Invalid response format from API');
      }
    } catch (error) {
      console.error('Error getting response:', error);
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: 'I apologize, but I encountered an error processing your request. Please try again.' 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      
      // Reset audio chunks
      audioChunksRef.current = [];
      
      // Create media recorder
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      
      // Add audio chunks when data is available
      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };
      
      // Handle recording stop
      mediaRecorder.onstop = () => {
        // Show loading state
        setIsLoading(true);
        
        // Create proper audio file from chunks
        const fileData = new File([new Blob(audioChunksRef.current)], 'audio.wav', { 
          type: 'audio/wav' 
        });
        
        // Create form data to send to server
        const formData = new FormData();
        formData.append('audio', fileData);
        
        // Send audio to server for transcription and response
        axios.post('/api/transcribe', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
          .then(response => {
            const transcription = response.data.transcription;
            setMessages(prev => [...prev, { role: 'user', content: transcription }]);
            
            // Get provider and model from selection
            const [provider, model] = selectedModel.split('/');
            
            // Then get AI response
            return axios.post('/api/chat', { 
              message: transcription,
              language: selectedLanguage,
              provider,
              model
            });
          })
          .then(response => {
            setMessages(prev => [...prev, { role: 'assistant', content: response.data.message }]);
          })
          .catch(error => {
            console.error('Error processing audio:', error);
            setMessages(prev => [...prev, { 
              role: 'assistant', 
              content: 'I apologize, but I encountered an error processing your audio. Please try typing your question instead.' 
            }]);
          })
          .finally(() => {
            setIsLoading(false);
          });
      };
      
      // Start recording
      mediaRecorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error('Error starting recording:', error);
      alert('Unable to access microphone. Please check your browser permissions.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      
      // Stop all audio tracks
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
    }
  };

  const playAudio = (message) => {
    // Use the browser's SpeechSynthesis API
    if ('speechSynthesis' in window) {
      // Cancel any ongoing speech
      window.speechSynthesis.cancel();
      
      // Create a new utterance
      const utterance = new SpeechSynthesisUtterance(message.content);
      
      // Map language code to a suitable speech synthesis language code
      const langMap = {
        'en': 'en-IN', // Indian English
        'hi': 'hi-IN', // Hindi (India)
        'bn': 'bn-IN', // Bengali (India)
        'te': 'te-IN', // Telugu (India)
        'ta': 'ta-IN', // Tamil (India)
        'kn': 'kn-IN', // Kannada (India)
        'mr': 'mr-IN', // Marathi (India)
        'gu': 'gu-IN', // Gujarati (India)
      };
      
      // Set language based on selected language (with fallback to English)
      utterance.lang = langMap[selectedLanguage] || 'en-IN';
      
      // Optional: Configure voice properties
      utterance.rate = 0.9; // Slightly slower
      utterance.pitch = 1;
      
      // Speak the text
      window.speechSynthesis.speak(utterance);
    } else {
      console.error('Speech synthesis not supported by this browser');
      alert('Text-to-speech is not supported by your browser.');
    }
  };

  // Get model name without provider prefix for display
  const getDisplayModelName = (fullModelName) => {
    const parts = fullModelName.split('/');
    if (parts.length > 1) {
      const provider = parts[0].charAt(0).toUpperCase() + parts[0].slice(1);
      return `${provider} ${parts[1]}`;
    }
    return fullModelName;
  };

  // Find language name from code
  const getLanguageName = (code) => {
    const language = languages.find(lang => lang.code === code);
    return language ? language.name : code;
  };

  return (
    <Container maxWidth="lg" sx={{ height: '85vh', paddingY: 2 }}>
      <Paper 
        elevation={3} 
        sx={{ 
          height: '100%', 
          borderRadius: 3, 
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        {/* Elegant Header */}
        <Box
          sx={{
            backgroundColor: theme.palette.primary.main,
            color: 'white',
            p: 2,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            borderBottom: `1px solid ${theme.palette.primary.dark}`
          }}
        >
          <Box>
            <Typography variant="h5" fontWeight="bold" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <SmartToyIcon /> NyayaBot
            </Typography>
            <Typography variant="subtitle2" sx={{ mt: 0.5, opacity: 0.9 }}>
              Your AI Legal Assistant for Indian Law
            </Typography>
          </Box>
          
          <Stack direction="row" spacing={2} alignItems="center">
            {/* Model Selector */}
            <Box>
              <Tooltip title="Select AI Model" arrow placement="bottom">
                <Chip
                  icon={<SmartToyIcon />}
                  label={
                    <Select
                      value={selectedModel}
                      onChange={(e) => setSelectedModel(e.target.value)}
                      size="small"
                      variant="standard"
                      sx={{ 
                        color: 'white', 
                        '& .MuiSelect-icon': { color: 'white' },
                        '&::before, &::after': { display: 'none' },
                        fontSize: '0.875rem'
                      }}
                      disableUnderline
                    >
                      <MenuItem value="openai/gpt-4o">OpenAI GPT-4o</MenuItem>
                      <MenuItem value="openai/gpt-3.5-turbo">OpenAI GPT-3.5</MenuItem>
                      <MenuItem value="qwen/qwen2.5-7b">Qwen 2.5 (7B)</MenuItem>
                      <MenuItem value="qwen/qwen2.5-32b">Qwen 2.5 (32B)</MenuItem>
                      <MenuItem value="huggingface/llama-3-8b">Llama 3 (8B)</MenuItem>
                      <MenuItem value="huggingface/llama-3-70b">Llama 3 (70B)</MenuItem>
                    </Select>
                  }
                  sx={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.15)',
                    color: 'white',
                    border: 'none',
                    '& .MuiChip-label': { px: 1 }
                  }}
                />
              </Tooltip>
            </Box>
            
            {/* Language Selector */}
            <Box>
              <Tooltip title="Select Language" arrow placement="bottom">
                <Chip
                  icon={<LanguageIcon />}
                  label={
                    <Select
                      value={selectedLanguage}
                      onChange={(e) => setSelectedLanguage(e.target.value)}
                      size="small"
                      variant="standard"
                      sx={{ 
                        color: 'white', 
                        '& .MuiSelect-icon': { color: 'white' },
                        '&::before, &::after': { display: 'none' },
                        fontSize: '0.875rem'
                      }}
                      disableUnderline
                    >
                      {languages.map((lang) => (
                        <MenuItem key={lang.code} value={lang.code}>
                          {lang.name}
                        </MenuItem>
                      ))}
                    </Select>
                  }
                  sx={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.15)',
                    color: 'white',
                    border: 'none',
                    '& .MuiChip-label': { px: 1 }
                  }}
                />
              </Tooltip>
            </Box>
          </Stack>
        </Box>
        
        {/* Chat Messages Area */}
        <Box 
          sx={{ 
            flexGrow: 1, 
            overflowY: 'auto', 
            p: 3,
            backgroundColor: '#f8f9fb',
            display: 'flex',
            flexDirection: 'column',
            gap: 2
          }}
        >
          {messages.map((message, index) => (
            <Box 
              key={index}
              sx={{
                display: 'flex',
                justifyContent: message.role === 'user' ? 'flex-end' : 'flex-start',
                mb: 2
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  maxWidth: '70%'
                }}
              >
                {message.role === 'assistant' && (
                  <Avatar 
                    sx={{ 
                      bgcolor: theme.palette.primary.main,
                      mr: 1.5,
                      height: 40,
                      width: 40,
                      boxShadow: '0px 2px 4px rgba(0,0,0,0.1)'
                    }}
                  >
                    <SmartToyIcon fontSize="small" />
                  </Avatar>
                )}
                
                <Card
                  elevation={1}
                  sx={{
                    p: 2,
                    borderRadius: 2.5,
                    boxShadow: '0px 2px 8px rgba(0,0,0,0.08)',
                    ...(message.role === 'user' 
                      ? { 
                          bgcolor: theme.palette.primary.main, 
                          color: 'white',
                          borderTopRightRadius: 0
                        } 
                      : { 
                          bgcolor: 'white',
                          borderTopLeftRadius: 0
                        }
                    )
                  }}
                >
                  <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap', lineHeight: 1.6 }}>
                    {message.content}
                  </Typography>
                  
                  {message.role === 'assistant' && (
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1, opacity: 0.7 }}>
                      <Tooltip title="Listen to response" placement="top">
                        <IconButton 
                          size="small" 
                          onClick={() => playAudio(message)}
                          sx={{ 
                            color: theme.palette.primary.main,
                            '&:hover': { backgroundColor: 'rgba(0,0,0,0.04)' }
                          }}
                        >
                          <HeadsetIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  )}
                </Card>
                
                {message.role === 'user' && (
                  <Avatar 
                    sx={{ 
                      bgcolor: theme.palette.secondary.main,
                      ml: 1.5,
                      height: 40,
                      width: 40,
                      boxShadow: '0px 2px 4px rgba(0,0,0,0.1)'
                    }}
                  >
                    U
                  </Avatar>
                )}
              </Box>
            </Box>
          ))}
          
          {isLoading && (
            <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
              <CircularProgress size={30} thickness={4} sx={{ color: theme.palette.primary.main }} />
            </Box>
          )}
          
          <div ref={messagesEndRef} />
        </Box>
        
        {/* Input Area */}
        <Paper 
          elevation={3} 
          sx={{ 
            p: 2,
            backgroundColor: 'white',
            borderTop: `1px solid ${theme.palette.grey[200]}`
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'flex-end', gap: 1 }}>
            <Tooltip title={isRecording ? "Stop recording" : "Start voice input"}>
              <IconButton 
                color={isRecording ? 'error' : 'default'} 
                onClick={isRecording ? stopRecording : startRecording}
                sx={{ 
                  p: 1.5, 
                  backgroundColor: isRecording ? 'rgba(244, 67, 54, 0.1)' : 'transparent',
                  transition: 'all 0.2s ease',
                  '&:hover': { 
                    backgroundColor: isRecording ? 'rgba(244, 67, 54, 0.2)' : 'rgba(0, 0, 0, 0.04)'
                  }
                }}
              >
                {isRecording ? <StopIcon /> : <MicIcon />}
              </IconButton>
            </Tooltip>
            
            <TextField
              fullWidth
              placeholder="Type your legal question here..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              multiline
              maxRows={4}
              variant="outlined"
              disabled={isLoading || isRecording}
              sx={{ 
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  fontSize: '1rem',
                  backgroundColor: '#f8f9fb',
                  '&.Mui-focused': {
                    backgroundColor: 'white'
                  }
                }
              }}
            />
            
            <Button
              variant="contained"
              color="primary"
              endIcon={<SendIcon />}
              onClick={handleSendMessage}
              disabled={isLoading || isRecording || input.trim() === ''}
              sx={{ 
                borderRadius: 2,
                py: 1,
                px: 3,
                textTransform: 'none',
                fontWeight: 'bold',
                boxShadow: 2
              }}
            >
              Send
            </Button>
          </Box>
          
          {isRecording && (
            <Box sx={{ mt: 1.5, ml: 2, display: 'flex', alignItems: 'center', color: 'error.main' }}>
              <CircularProgress size={14} color="error" sx={{ mr: 1 }} />
              <Typography variant="caption" fontWeight="medium">
                Recording in progress... Click the stop button when finished.
              </Typography>
            </Box>
          )}
        </Paper>
      </Paper>
    </Container>
  );
}