import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme/theme';
import SignUp from './components/SignUp';
import NavBar from './components/NavBar';

function App() {
  return (
    <>
    <NavBar />
    <ThemeProvider theme={theme}>
      <SignUp />
      </ThemeProvider>
  </>
  );
}

export default App;
