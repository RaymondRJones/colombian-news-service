import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import News from './News';
/*
import Stopwatch from './components/StopWatch';
import TodoName from './components/Todo2';
import BenchmarkComponent from './components/Fib';
import Weather from './components/Weather';
import CounterName from './Counter2';
import Calculator from './components/Calculator';
*/
const theme = createTheme({
  palette: {
    primary: {
      main: '#00695f', // Example: Medellin green
    },
    secondary: {
      main: '#ffab00', // Example: Accent color
    },
  },
  typography: {
    h3: {
      fontFamily: 'Roboto, sans-serif',
      fontWeight: 700,
    },
    h6: {
      fontFamily: 'Roboto, sans-serif',
      fontWeight: 500,
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <News/ > 
    </ThemeProvider>
  );
}

export default App;
