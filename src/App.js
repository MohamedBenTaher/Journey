import React, { useEffect ,useState } from 'react'
import {Container} from '@material-ui/core'
import useStyles from "./styles.js"
import { useDispatch } from 'react-redux'
import { getPosts } from './actions/posts';
import Navbar from './Components/Navbar/Navbar'
import Home from './Components/Home/Home'
import { BrowserRouter, Route, Switch,Redirect } from 'react-router-dom';
import Auth from './Components/Auth/Auth.js';
import PostDetails from './Components/PostDetails/PostDetails.js';
const App= ()=> {
  const user=JSON.parse(localStorage.getItem('profile'));
  return (
    <BrowserRouter>
    <Container maxWidth='lg'>
    <Navbar />
    <Switch>
      <Route path='/' exact component={()=><Redirect to="/posts"/>} />
      <Route path='/posts' exact component={Home} />
      <Route path='/posts/search' exact component={Home} />
      <Route path='/posts/:id' exact component={PostDetails} />
      <Route path='/auth' exact component={()=> !user ? <Auth /> :<Redirect to="/posts" />} />
    </Switch>
    </Container>
    </BrowserRouter>
  );
}

export default App;