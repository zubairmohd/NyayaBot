import { useState } from 'react';
import { 
  Box, 
  Typography, 
  Grid, 
  Button, 
  Paper, 
  Container,
  Tab,
  Tabs,
  useTheme,
} from '@mui/material';
import ChatIcon from '@mui/icons-material/Chat';
import DescriptionIcon from '@mui/icons-material/Description';
import Layout from '../components/layout/Layout';
import ChatInterface from '../components/chat/ChatInterface';
import DocumentGenerator from '../components/document/DocumentGenerator';

export default function Home() {
  const [activeTab, setActiveTab] = useState(0);
  const [conversationHistory, setConversationHistory] = useState([]);
  const theme = useTheme();

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <Layout>
      <Box sx={{ mb: 6, textAlign: 'center' }}>
        <Typography 
          variant="h2" 
          component="h1" 
          gutterBottom
          sx={{ 
            fontWeight: 700, 
            color: theme.palette.primary.main,
            mb: 2,
          }}
        >
          NyayaBot - आपका AI वकील
        </Typography>
        <Typography 
          variant="h5" 
          component="h2" 
          gutterBottom
          sx={{ 
            fontWeight: 400, 
            color: theme.palette.text.secondary,
            mb: 4,
          }}
        >
          Instant Legal Advice in Your Language / आपकी भाषा में तत्काल कानूनी सलाह
        </Typography>
        
        <Container maxWidth="md">
          <Typography variant="body1" sx={{ mb: 4 }}>
            NyayaBot provides free, accessible legal assistance powered by artificial intelligence.
            Ask questions about Indian law, get guidance on legal procedures, and generate basic legal documents.
            Available in multiple Indian languages to make legal help accessible to all.
          </Typography>
        </Container>
      </Box>
      
      <Paper sx={{ borderRadius: 2, overflow: 'hidden', mb: 6 }}>
        <Tabs 
          value={activeTab} 
          onChange={handleTabChange} 
          variant="fullWidth"
          textColor="primary"
          indicatorColor="primary"
          aria-label="Legal Assistant Tabs"
        >
          <Tab icon={<ChatIcon />} label="Chat with NyayaBot" />
          <Tab icon={<DescriptionIcon />} label="Generate Documents" />
        </Tabs>
        
        <Box sx={{ p: { xs: 2, md: 3 } }}>
          {activeTab === 0 && (
            <ChatInterface 
              onMessageHistoryChange={(history) => setConversationHistory(history)} 
            />
          )}
          {activeTab === 1 && (
            <DocumentGenerator conversationHistory={conversationHistory} />
          )}
        </Box>
      </Paper>
      
      <Box sx={{ my: 6 }}>
        <Typography variant="h4" component="h2" gutterBottom sx={{ mb: 4, textAlign: 'center' }}>
          How NyayaBot Helps You / न्यायबॉट आपकी कैसे मदद करता है
        </Typography>
        
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Paper elevation={2} sx={{ p: 3, height: '100%', borderRadius: 2 }}>
              <Typography variant="h6" gutterBottom color="primary">
                Legal Information
              </Typography>
              <Typography variant="body1">
                Get accurate information about Indian laws, legal procedures, and your rights, presented in simple, easy-to-understand language.
              </Typography>
            </Paper>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Paper elevation={2} sx={{ p: 3, height: '100%', borderRadius: 2 }}>
              <Typography variant="h6" gutterBottom color="primary">
                Multilingual Support
              </Typography>
              <Typography variant="body1">
                Access legal assistance in your preferred language, including Hindi, Bengali, Telugu, Tamil, Kannada, Marathi, and Gujarati.
              </Typography>
            </Paper>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Paper elevation={2} sx={{ p: 3, height: '100%', borderRadius: 2 }}>
              <Typography variant="h6" gutterBottom color="primary">
                Document Generation
              </Typography>
              <Typography variant="body1">
                Create basic legal documents like bail applications, FIR complaints, legal notices, affidavits, and PIL drafts based on your situation.
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Box>
      
      <Box sx={{ my: 6, textAlign: 'center' }}>
        <Typography variant="h5" component="h2" gutterBottom>
          Important Disclaimer
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ maxWidth: '800px', mx: 'auto' }}>
          NyayaBot provides general information and guidance based on Indian laws.
          It is not a substitute for professional legal advice. The information provided should not
          be considered as legal advice, and no attorney-client relationship is created by using this service.
          For critical legal matters, please consult with a qualified attorney.
        </Typography>
      </Box>
    </Layout>
  );
}