import { useState } from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  IconButton, 
  Menu, 
  MenuItem, 
  Box,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import TranslateIcon from '@mui/icons-material/Translate';
import Link from 'next/link';

const languages = [
  { name: 'English', code: 'en' },
  { name: 'हिंदी', code: 'hi' },
  { name: 'বাংলা', code: 'bn' },
  { name: 'తెలుగు', code: 'te' },
  { name: 'தமிழ்', code: 'ta' },
  { name: 'ಕನ್ನಡ', code: 'kn' },
  { name: 'मराठी', code: 'mr' },
  { name: 'ગુજરાતી', code: 'gu' },
];

export default function Header({ currentLanguage, setLanguage }) {
  const [mobileMenuAnchorEl, setMobileMenuAnchorEl] = useState(null);
  const [languageMenuAnchorEl, setLanguageMenuAnchorEl] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleMobileMenuOpen = (event) => {
    setMobileMenuAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMenuAnchorEl(null);
  };

  const handleLanguageMenuOpen = (event) => {
    setLanguageMenuAnchorEl(event.currentTarget);
  };

  const handleLanguageMenuClose = () => {
    setLanguageMenuAnchorEl(null);
  };

  const handleLanguageSelect = (code) => {
    setLanguage(code);
    handleLanguageMenuClose();
  };

  return (
    <AppBar position="static" color="transparent" elevation={1} sx={{ backgroundColor: 'white' }}>
      <Toolbar>
        <Link href="/" passHref>
          <Box sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: theme.palette.primary.main, fontWeight: 'bold', fontFamily: 'Poppins' }}>
              NyayaBot
            </Typography>
          </Box>
        </Link>
        
        <Box sx={{ flexGrow: 1 }} />
        
        {isMobile ? (
          <>
            <IconButton
              edge="end"
              color="inherit"
              aria-label="language"
              onClick={handleLanguageMenuOpen}
            >
              <TranslateIcon />
            </IconButton>
            <IconButton
              edge="end"
              color="inherit"
              aria-label="menu"
              onClick={handleMobileMenuOpen}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={mobileMenuAnchorEl}
              open={Boolean(mobileMenuAnchorEl)}
              onClose={handleMobileMenuClose}
            >
              <MenuItem onClick={handleMobileMenuClose}>
                <Link href="/" passHref>
                  <Typography>Home</Typography>
                </Link>
              </MenuItem>
              <MenuItem onClick={handleMobileMenuClose}>
                <Link href="/upload" passHref>
                  <Typography>Upload Documents</Typography>
                </Link>
              </MenuItem>
              <MenuItem onClick={handleMobileMenuClose}>
                <Link href="/about" passHref>
                  <Typography>About</Typography>
                </Link>
              </MenuItem>
              <MenuItem onClick={handleMobileMenuClose}>
                <Link href="/contact" passHref>
                  <Typography>Contact</Typography>
                </Link>
              </MenuItem>
            </Menu>
          </>
        ) : (
          <>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button color="inherit">
                <Link href="/upload" passHref>
                  <Typography sx={{ color: theme.palette.text.secondary }}>Upload Documents</Typography>
                </Link>
              </Button>
              <Button color="inherit">
                <Link href="/about" passHref>
                  <Typography sx={{ color: theme.palette.text.secondary }}>About</Typography>
                </Link>
              </Button>
              <Button color="inherit">
                <Link href="/contact" passHref>
                  <Typography sx={{ color: theme.palette.text.secondary }}>Contact</Typography>
                </Link>
              </Button>
              <Button 
                color="inherit"
                onClick={handleLanguageMenuOpen}
                startIcon={<TranslateIcon />}
              >
                {languages.find(lang => lang.code === currentLanguage)?.name || 'English'}
              </Button>
            </Box>
          </>
        )}
        
        <Menu
          anchorEl={languageMenuAnchorEl}
          open={Boolean(languageMenuAnchorEl)}
          onClose={handleLanguageMenuClose}
        >
          {languages.map((language) => (
            <MenuItem 
              key={language.code} 
              onClick={() => handleLanguageSelect(language.code)}
              selected={currentLanguage === language.code}
            >
              {language.name}
            </MenuItem>
          ))}
        </Menu>
      </Toolbar>
    </AppBar>
  );
}