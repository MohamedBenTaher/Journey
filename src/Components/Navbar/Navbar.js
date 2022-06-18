import React ,{useState,useEffect} from 'react'
import { AppBar,Avatar,Button,Toolbar,Typography } from '@material-ui/core'
import useStyles from './styles.js'
import memories from "../../Images/memories.png"
import { Link, useHistory ,useLocation} from "react-router-dom";
import { useDispatch } from 'react-redux';

const Navbar = () => {
  const dispatch=useDispatch();
  const history=useHistory();
  const location=useLocation();
    const [user, setUser]=useState(JSON.parse(localStorage.getItem('profile')))
    const classes=useStyles();
    useEffect(()=>{
      const token=user?.token;
      setUser(JSON.parse(localStorage.getItem('profile')))
    },[location]);
    const Logout=()=>{
        dispatch({type:'LOGOUT'});
        history.push('/');
        setUser(null)
    }
  return (
    <AppBar className={classes.appBar} position='static' color='inherit'>
     <div className={classes.brandContainer}>
     <Typography component={Link} to="/" className={classes.heading} variant='h2' align='center'>Memories </Typography>
    <img className={classes.image} src={memories} alt="memories" height="60" />
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