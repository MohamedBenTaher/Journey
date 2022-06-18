import React, { useEffect ,useState } from 'react'
import {Container} from '@material-ui/core'
import useStyles from "./styles.js"
import { useDispatch } from 'react-redux'
import { getPosts } from './actions/posts';
import Navbar from './Components/Navbar/Navbar'
import Home from './Components/Home/Home'
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Auth from './Components/Auth/Auth.js';
const App= ()=> {
  const [currentId,setCurrentId]=useState(0)
  const classes=useStyles(); 
  const dispatch =useDispatch();
  useEffect(()=>{
    dispatch(getPosts());
  },[currentId,dispatch])
  return (
    <BrowserRouter>
    <Container maxWidth='lg'>
    <Navbar />
    <Switch>
      <Route path='/' exact component={Home} />
      <Route path='/auth' exact component={Auth} />
    </Switch>
    </Container>
    </BrowserRouter>
  );
}

export default App;