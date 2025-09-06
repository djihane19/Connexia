import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  colors: {
    primary: '#2B3A67',
    accent: '#E6B800',
    secondary: '#F5F6F5',
    neutral: '#FFFFFF',
    hover: '#496595',
    text: '#333333',
  },
  fonts: {
    body: "'Inter', sans-serif",
    heading: "'Inter', sans-serif",
  },
});

export default theme;