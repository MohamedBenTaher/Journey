import React from'react'
import  ReactDOM  from 'react-dom'
import { Provider } from 'react-redux'
import { createStore,applyMiddleware,compose } from 'redux'
import thunk from'redux-thunk'
import  App from './App'
import reducers from './reducers'
import './index.css'
import { BrowserRouter } from 'react-router-dom/cjs/react-router-dom.min'
import { createTheme } from '@material-ui/core'
import { ThemeProvider } from '@material-ui/core/styles';
const store=createStore(reducers,compose(applyMiddleware(thunk)))
const theme = createTheme({
   typography: {
     fontFamily: [
       'Gilroy', 'sans-serif'
     ].join(','),
   },
 });

ReactDOM.render(
   <ThemeProvider theme={theme}>
   <BrowserRouter>
   <Provider store={store}>
    <App />
   </Provider>
   </BrowserRouter>
   </ThemeProvider>
,document.getElementById('root'));
 