import { useState } from 'react';
import Head from 'next/head';
import Header from './Header';
import { Container, Box } from '@mui/material';

export default function Layout({ children, title = 'NyayaBot - Your AI Legal Assistant' }) {
  const [currentLanguage, setCurrentLanguage] = useState('en');

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Header currentLanguage={currentLanguage} setLanguage={setCurrentLanguage} />
        <Container component="main" maxWidth="lg" sx={{ flexGrow: 1, py: 4 }}>
          {children}
        </Container>
        <Box component="footer" sx={{ py: 3, textAlign: 'center', borderTop: '1px solid #eaeaea', mt: 'auto' }}>
          <Container>
            <Box sx={{ fontSize: '0.875rem', color: 'text.secondary' }}>
              © {new Date().getFullYear()} NyayaBot. All rights reserved. This AI assistant does not provide professional legal advice.
            </Box>
          </Container>
        </Box>
      </Box>
    </>
  );
}