import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import App from './App';
import reducers from './reducers';
import './index.css';
import { BrowserRouter } from 'react-router-dom/cjs/react-router-dom.min';
import { createTheme } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';
const store = createStore(reducers, compose(applyMiddleware(thunk)));
const theme = createTheme({
  typography: {
    fontFamily: ['Gilroy', 'sans-serif'].join(','),
  },
  palette: {
    primary: {
      main: '#3F95EC', // Sky Blue
    },
    secondary: {
      main: '#FFC107', // Amber
    },
    success: {
      main: '#8BC34A', // Lime Green
    },
    background: {
      default: '#FFFFFF', // White
    },
    text: {
      primary: '#333333', // Dark Gray
    },
    error: {
      main: '#FF5722', // Deep Orange
    },
  },
  link: {
    main: '#2196F3', // Blue
  },
  highlight: {
    main: '#FF9800', // Orange
  },
  subtleShade: {
    main: '#E0E0E0', // Light Gray
  },
});

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </ThemeProvider>,
  document.getElementById('root'),
);
