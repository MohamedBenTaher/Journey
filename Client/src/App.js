import React, { useEffect ,useState } from 'react'
import {Container,Box,CssBaseline} from '@material-ui/core'
import useStyles from "./styles.js"
import { useDispatch } from 'react-redux'
import { getPosts } from './actions/posts';
import Navbar from './Components/Navbar/Navbar'
import Hero from './Components/Hero/Hero.js';
import Home from './Components/Home/Home'
import Footer from './Components/Footer/Footer'
import { BrowserRouter, Route, Switch,Redirect } from 'react-router-dom';
import Auth from './Components/Auth/Auth.js';
import PostDetails from './Components/PostDetails/PostDetails.js';
import { ThemeProvider, createTheme } from '@material-ui/core/styles';
import SearchBar from './Components/Home/SearchBar.js';
import CreatorOrTag from './Components/CreatorOrTag/CreatorOrTag'
const theme = createTheme({
  typography: {
    fontFamily: [
      'Gilroy', 'sans-serif'
    ].join(','),
  },});
const App= ()=> {
  const user=JSON.parse(localStorage.getItem('profile'));
  return (
    <ThemeProvider theme={theme}>
    <CssBaseline >
    <BrowserRouter>

     <Hero />
    <Container maxWidth={false} disableGutters>
         
      <Container maxWidth='lg'>
  
        <Switch>
          <Route path='/' exact component={() => <Redirect to="/posts" />} />
          <Route path='/posts' exact component={Home} />
          <Route path="/posts/search" exact component={Home} />
          <Route path='/posts/:id' exact component={PostDetails} />
          <Route path={['/creators/:name', '/tags/:name']} component={CreatorOrTag} />
          <Route path='/auth' exact component={() => !user ? <Auth /> : <Redirect to="/posts" />} />
        </Switch>
      </Container>
      </Container>
    </BrowserRouter>
    <Footer/>
    </CssBaseline>
    </ThemeProvider>
  );
}

export default App;