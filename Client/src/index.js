import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { legacy_createStore as createStore} from 'redux'
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { createTheme } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';
import reducers from './reducers';
import App from './App';
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers,  composeEnhancers((applyMiddleware(thunk))));
const theme = createTheme({
  typography: {
    fontFamily: ['Poppins', 'sans-serif'].join(','),
  },
  palette: {
    primary: {
      main: '#7B61FF', // Sky Blue
    },
    secondary: {
      main: '#FFFFFF', // Amber
    },
    success: {
      main: '#8BC34A', // Lime Green
    },
    background: {
      default: '#FFFFFF', // White
    },
    text: {
      primary: '#c161414', // Dark Gray
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
  <Provider store={store}>
  <ThemeProvider theme={theme}>
    <BrowserRouter>
        <App/>
    </BrowserRouter>
  </ThemeProvider>
  </Provider>,
  document.getElementById('root'),
);
