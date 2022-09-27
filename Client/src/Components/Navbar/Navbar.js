import React ,{useState,useEffect} from 'react'
import { AppBar,Avatar,Button,Toolbar,Typography } from '@material-ui/core'
import useStyles from './styles.js'
import memories from "../../Images/journey.png";
import title from "../../Images/title.png";
import { Link, useHistory ,useLocation} from "react-router-dom";
import { useDispatch } from 'react-redux';
import  decode  from 'jwt-decode';
const Navbar = () => {
  const dispatch=useDispatch();
  const history=useHistory();
  const location=useLocation();
    const [user, setUser]=useState(JSON.parse(localStorage.getItem('profile')))
    const classes=useStyles();
    useEffect(()=>{
      const token=user?.token;
      if(token){
        const decoded=decode(token);
        if(decode.exp*1000<new Date().getTime()) dispatch({type:'LOGOUT'});
      }
      setUser(JSON.parse(localStorage.getItem('profile')))
    },[location]);
    const Logout=()=>{
        dispatch({type:'LOGOUT'});
        history.push('/');
        setUser(null)
    }
  return (

    <AppBar className={classes.appBar} position='static' color='inherit'>
     <div className={classes.brandContainer} >
     <Link to="/">
     <img className={classes.image} src={memories} alt="Journey" height="60" />

     <img  src={title} alt="Journey" height="50"/>
     </Link>
   
     </div>
     <Toolbar className={classes.toolbar}>
        {user ?(
            <div className={classes.profile}>
                    <Avatar className={classes.purple} alt={user.result.name} src={user.result.imageUrl}>{user.result.name.charAt(0)}</Avatar>
                    <Typography className={classes.userName} variant='h6'>{user.result.name}</Typography>
                    <Button variant='contained' className={classes.logout} color='secondary' onClick={Logout} >Logout</Button>
            </div>
        ):(
            <Button component={Link} to="/auth" variant='contained'  color='primary'>Sign-In</Button>
        )}
     </Toolbar>
 
  </AppBar>
  )
}

export default Navbar