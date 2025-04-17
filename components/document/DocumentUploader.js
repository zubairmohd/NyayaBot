import { useState } from 'react';
import { 
  Box, 
  Button, 
  Paper, 
  Typography, 
  CircularProgress,
  Alert,
  IconButton,
  Collapse,
  List,
  ListItem,
  ListItemText,
  Divider
} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';

export default function DocumentUploader() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [uploadedDocs, setUploadedDocs] = useState([]);

  // Handle file selection
  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    
    // Check if a file was selected
    if (!file) {
      return;
    }
    
    // Check file type (only allow PDFs)
    if (file.type !== 'application/pdf') {
      setUploadStatus({
        success: false,
        message: 'Only PDF files are supported'
      });
      setShowAlert(true);
      return;
    }
    
    // Check file size (limit to 10MB)
    if (file.size > 10 * 1024 * 1024) {
      setUploadStatus({
        success: false,
        message: 'File size exceeds 10MB limit'
      });
      setShowAlert(true);
      return;
    }
    
    setSelectedFile(file);
    setUploadStatus(null);
    setShowAlert(false);
  };

  // Handle file upload
  const handleUpload = async () => {
    if (!selectedFile) {
      return;
    }
    
    setIsUploading(true);
    setUploadStatus(null);
    
    try {
      // Create form data for file upload
      const formData = new FormData();
      formData.append('document', selectedFile);
      
      // Send file to API endpoint
      const response = await axios.post('/api/upload-document', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      if (response.data && response.data.success) {
        // Upload successful
        setUploadStatus({
          success: true,
          message: 'Document uploaded successfully'
        });
        
        // Add to uploaded documents list
        setUploadedDocs(prev => [
          ...prev, 
          {
            name: response.data.document.originalName,
            size: response.data.document.size,
            uploadedAt: new Date().toLocaleString()
          }
        ]);
        
        // Reset selected file
        setSelectedFile(null);
      } else {
        throw new Error(response.data?.error || 'Unknown error');
      }
    } catch (error) {
      console.error('Error uploading document:', error);
      setUploadStatus({
        success: false,
        message: `Upload failed: ${error.message}`
      });
    } finally {
      setIsUploading(false);
      setShowAlert(true);
    }
  };

  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column', 
      height: '100%',
      maxWidth: '800px',
      margin: '0 auto'
    }}>
      <Paper 
        elevation={2} 
        sx={{ 
          p: 3, 
          mb: 3,
          borderRadius: 2
        }}
      >
        <Typography variant="h6" gutterBottom>
          Document Upload for AI Analysis
        </Typography>
        
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          Upload legal documents (PDF only) to enhance the AI's knowledge. 
          The system will analyze the document and use it to provide more accurate answers to your questions.
        </Typography>
        
        <Collapse in={showAlert}>
          <Alert 
            severity={uploadStatus?.success ? "success" : "error"}
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => setShowAlert(false)}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
            sx={{ mb: 2 }}
          >
            {uploadStatus?.message}
          </Alert>
        </Collapse>
        
        <Box 
          sx={{ 
            border: '2px dashed #ccc', 
            borderRadius: 2, 
            p: 3, 
            textAlign: 'center',
            backgroundColor: '#f8f9fa',
            cursor: 'pointer',
            mb: 2,
            transition: 'all 0.3s',
            '&:hover': {
              borderColor: 'primary.main',
              backgroundColor: '#f0f7ff'
            }
          }}
          onClick={() => document.getElementById('file-input').click()}
        >
          <input
            id="file-input"
            type="file"
            accept=".pdf"
            onChange={handleFileSelect}
            style={{ display: 'none' }}
          />
          
          <CloudUploadIcon sx={{ fontSize: 48, color: 'primary.main', mb: 1 }} />
          
          <Typography variant="body1" gutterBottom>
            {selectedFile ? selectedFile.name : 'Click to select or drag & drop a PDF file'}
          </Typography>
          
          {selectedFile && (
            <Typography variant="body2" color="text.secondary">
              {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
            </Typography>
          )}
        </Box>
        
        <Button
          variant="contained"
          color="primary"
          fullWidth
          disabled={!selectedFile || isUploading}
          onClick={handleUpload}
          startIcon={isUploading ? <CircularProgress size={24} color="inherit" /> : <PictureAsPdfIcon />}
          sx={{ py: 1.5 }}
        >
          {isUploading ? 'Uploading...' : 'Upload Document'}
        </Button>
      </Paper>
      
      {/* Uploaded Documents List */}
      {uploadedDocs.length > 0 && (
        <Paper 
          elevation={2} 
          sx={{ 
            p: 3, 
            borderRadius: 2
          }}
        >
          <Typography variant="h6" gutterBottom>
            Uploaded Documents
          </Typography>
          
          <List>
            {uploadedDocs.map((doc, index) => (
              <Box key={index}>
                {index > 0 && <Divider component="li" />}
                <ListItem>
                  <PictureAsPdfIcon sx={{ mr: 2, color: 'error.light' }} />
                  <ListItemText
                    primary={doc.name}
                    secondary={`${(doc.size / 1024 / 1024).toFixed(2)} MB • Uploaded on ${doc.uploadedAt}`}
                  />
                </ListItem>
              </Box>
            ))}
          </List>
        </Paper>
      )}
    </Box>
  );
}