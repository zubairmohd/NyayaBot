import { useState, useRef, useEffect } from 'react';
import { 
  Box, 
  TextField, 
  Button, 
  Typography, 
  Paper, 
  IconButton,
  CircularProgress,
  Divider,
  useTheme,
  Card,
  Avatar,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import MicIcon from '@mui/icons-material/Mic';
import StopIcon from '@mui/icons-material/Stop';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import axios from 'axios';

// Sample messages for development
const sampleMessages = [
  { role: 'assistant', content: 'Hello! I am NyayaBot, your AI legal assistant. How can I help you today?' },
];

export default function ChatInterface() {
  const [messages, setMessages] = useState(sampleMessages);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const messagesEndRef = useRef(null);
  const theme = useTheme();
  
  // Mock audio recording functionality (to be replaced with actual implementation)
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  
  // Scroll to bottom of messages
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
      // Make a real API call to our backend
      const response = await axios.post('/api/chat', {
        message: input,
        language: 'en' // This will be dynamic based on selected language
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
        
        // For debugging audio uploads
        console.log('Recording complete, sending audio data to server');
        
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
            
            // Then get AI response
            return axios.post('/api/chat', { 
              message: transcription,
              language: 'en' // This will be dynamic based on selected language
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
      
      // Set language - in a full implementation this would be dynamic
      utterance.lang = 'en-IN'; // Indian English
      
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

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '70vh', maxHeight: '800px' }}>
      {/* Chat header */}
      <Paper 
        elevation={0} 
        sx={{ 
          p: 2, 
          borderTopLeftRadius: 8, 
          borderTopRightRadius: 8,
          backgroundColor: theme.palette.primary.main,
          color: 'white'
        }}
      >
        <Typography variant="h6">NyayaBot Chat</Typography>
        <Typography variant="body2">
          Ask me any legal question related to Indian law
        </Typography>
      </Paper>
      
      {/* Messages container */}
      <Box 
        sx={{ 
          flexGrow: 1, 
          overflowY: 'auto', 
          p: 2,
          backgroundColor: '#f5f7fb',
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
                maxWidth: '80%'
              }}
            >
              {message.role === 'assistant' && (
                <Avatar 
                  sx={{ 
                    bgcolor: theme.palette.primary.main,
                    mr: 1,
                    height: 40,
                    width: 40
                  }}
                >
                  N
                </Avatar>
              )}
              
              <Card
                sx={{
                  p: 2,
                  borderRadius: 2,
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
                <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap' }}>
                  {message.content}
                </Typography>
                
                {message.role === 'assistant' && (
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1 }}>
                    <IconButton 
                      size="small" 
                      onClick={() => playAudio(message)}
                      sx={{ color: theme.palette.primary.main }}
                    >
                      <PlayArrowIcon />
                    </IconButton>
                  </Box>
                )}
              </Card>
              
              {message.role === 'user' && (
                <Avatar 
                  sx={{ 
                    bgcolor: theme.palette.secondary.main,
                    ml: 1,
                    height: 40,
                    width: 40
                  }}
                >
                  Y
                </Avatar>
              )}
            </Box>
          </Box>
        ))}
        
        {isLoading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
            <CircularProgress size={24} />
          </Box>
        )}
        
        <div ref={messagesEndRef} />
      </Box>
      
      {/* Input area */}
      <Paper 
        elevation={2} 
        sx={{ 
          p: 2, 
          borderBottomLeftRadius: 8, 
          borderBottomRightRadius: 8
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton 
            color={isRecording ? 'error' : 'primary'} 
            onClick={isRecording ? stopRecording : startRecording}
            sx={{ mr: 1 }}
          >
            {isRecording ? <StopIcon /> : <MicIcon />}
          </IconButton>
          
          <TextField
            fullWidth
            placeholder="Type your legal question here..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            multiline
            maxRows={3}
            variant="outlined"
            disabled={isLoading || isRecording}
            sx={{ mr: 1 }}
          />
          
          <Button
            variant="contained"
            color="primary"
            endIcon={<SendIcon />}
            onClick={handleSendMessage}
            disabled={isLoading || isRecording || input.trim() === ''}
          >
            Send
          </Button>
        </Box>
        
        {isRecording && (
          <Box sx={{ mt: 1, display: 'flex', alignItems: 'center', color: 'error.main' }}>
            <CircularProgress size={16} color="error" sx={{ mr: 1 }} />
            <Typography variant="caption">Recording... (Click stop icon when finished)</Typography>
          </Box>
        )}
      </Paper>
    </Box>
  );
}