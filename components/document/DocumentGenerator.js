import { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  CircularProgress,
  Alert,
  Snackbar,
  useTheme,
} from '@mui/material';
import DescriptionIcon from '@mui/icons-material/Description';
import FileDownloadIcon from '@mui/icons-material/FileDownload';

// Document types with Hindi translations
const documentTypes = [
  { label: 'Bail Application / जमानत अर्जी', value: 'bail_application' },
  { label: 'FIR Complaint / प्राथमिकी शिकायत', value: 'fir_complaint' },
  { label: 'Legal Notice / कानूनी नोटिस', value: 'legal_notice' },
  { label: 'Affidavit / शपथ पत्र', value: 'affidavit' },
  { label: 'PIL Draft / जनहित याचिका', value: 'pil_draft' },
];

export default function DocumentGenerator({ conversationHistory = [] }) {
  const [docType, setDocType] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedDocument, setGeneratedDocument] = useState(null);
  const [error, setError] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const theme = useTheme();

  const handleDocTypeChange = (event) => {
    setDocType(event.target.value);
  };

  const handleGenerateDocument = async () => {
    if (!docType) {
      setError('Please select a document type');
      return;
    }
    
    if (conversationHistory.length === 0) {
      setError('You need to have a conversation first to generate a document');
      return;
    }
    
    setIsGenerating(true);
    setError('');
    
    try {
      // Mock document generation - replace with actual API call
      setTimeout(() => {
        // This would be the response from the server with the PDF data
        const mockDocument = {
          filename: `${docType}_document.pdf`,
          // Mock base64 encoded PDF - in real app, this would be actual PDF data
          data: 'JVBERi0xLjMKJcTl8uXrp/Og0MTGCjQgMCBvYmoKPDwgL0xlbmd0aCA1IDAgUiAvRmlsdGVyIC9GbGF0ZURlY29kZSA+PgpzdHJlYW0KeAFLK89XyEjNycnXS8rPV0gsKsmLL1YISFXIzS9JVchIzEtRKE7MLchJBQCFiQvnCmVuZHN0cmVhbQplbmRvYmoKNSAwIG9iago2NwplbmRvYmoKMiAwIG9iago8PCAvVHlwZSAvUGFnZSAvUGFyZW50'
        };
        
        setGeneratedDocument(mockDocument);
        setIsGenerating(false);
        setShowSuccess(true);
      }, 2000);
      
      // Actual API call would look like:
      /*
      const response = await axios.post('/api/generate-document', {
        docType,
        conversationHistory
      });
      
      setGeneratedDocument(response.data);
      */
    } catch (error) {
      console.error('Error generating document:', error);
      setError('Failed to generate document. Please try again later.');
      setIsGenerating(false);
    }
  };

  const handleDownloadDocument = () => {
    if (!generatedDocument) return;
    
    // Create a link element to download the document
    const linkSource = `data:application/pdf;base64,${generatedDocument.data}`;
    const downloadLink = document.createElement('a');
    downloadLink.href = linkSource;
    downloadLink.download = generatedDocument.filename;
    downloadLink.click();
  };

  const handleCloseSnackbar = () => {
    setShowSuccess(false);
  };

  return (
    <Paper elevation={3} sx={{ p: 3, borderRadius: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <DescriptionIcon color="primary" sx={{ mr: 1, fontSize: 28 }} />
        <Typography variant="h5" component="h2">
          Generate Legal Document / क़ानूनी दस्तावेज़ बनाएँ
        </Typography>
      </Box>
      
      <Typography variant="body1" sx={{ mb: 3 }}>
        Based on our conversation, I can generate legal documents tailored to your situation. 
        Select the type of document you need:
      </Typography>
      
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}
      
      <FormControl fullWidth sx={{ mb: 3 }}>
        <InputLabel id="document-type-label">Document Type / दस्तावेज़ का प्रकार</InputLabel>
        <Select
          labelId="document-type-label"
          id="document-type"
          value={docType}
          label="Document Type / दस्तावेज़ का प्रकार"
          onChange={handleDocTypeChange}
          disabled={isGenerating}
        >
          {documentTypes.map((type) => (
            <MenuItem key={type.value} value={type.value}>
              {type.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleGenerateDocument}
          disabled={!docType || isGenerating || conversationHistory.length === 0}
          startIcon={isGenerating ? <CircularProgress size={20} color="inherit" /> : null}
        >
          {isGenerating ? 'Generating...' : 'Generate Document / दस्तावेज़ बनाएँ'}
        </Button>
        
        {generatedDocument && (
          <Button
            variant="outlined"
            color="primary"
            onClick={handleDownloadDocument}
            startIcon={<FileDownloadIcon />}
          >
            Download / डाउनलोड
          </Button>
        )}
      </Box>
      
      <Snackbar 
        open={showSuccess} 
        autoHideDuration={6000} 
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          Your document has been generated successfully! / आपका दस्तावेज़ सफलतापूर्वक बनाया गया है!
        </Alert>
      </Snackbar>
    </Paper>
  );
}