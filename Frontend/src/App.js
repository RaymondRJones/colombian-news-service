// App.js

import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import News from './News';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', // Material Design blue
    },
    secondary: {
      main: '#ffc107', // Material Design amber
    },
  },
  typography: {
    h4: {
      fontFamily: 'Roboto, sans-serif',
      fontWeight: 700,
    },
    h5: {
      fontFamily: 'Roboto, sans-serif',
      fontWeight: 500,
    },
    h6: {
      fontFamily: 'Roboto, sans-serif',
      fontWeight: 500,
    },
    body1: {
      fontFamily: 'Roboto, sans-serif',
    },
    button: {
      textTransform: 'none',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <News />
    </ThemeProvider>
  );
}

export default App;
