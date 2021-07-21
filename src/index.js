import ReactDom from 'react-dom';
import React from 'react'
import App from './App';
import { ThemeProvider, createTheme, CssBaseline } from '@material-ui/core';
import { BrowserRouter as Router} from 'react-router-dom';

const theme = createTheme({
  //some custome theme here
})

ReactDom.render(
  // <React.StrictMode>
    <Router>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </Router>
  // </React.StrictMode>
  , document.getElementById('root'));