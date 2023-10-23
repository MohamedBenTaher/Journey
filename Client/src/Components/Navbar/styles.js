import { makeStyles } from '@material-ui/core/styles';
import { deepPurple } from '@material-ui/core/colors';

export default makeStyles((theme) => ({
  appBar: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // padding: '10px 0px',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },
  heading: {
    color: theme.palette.primary.main,
    textDecoration: 'none',
    fontSize: '2em',
    fontWeight: 300,
  },
  image: {
    marginLeft: '10px',
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'flex-end',
    width: 'auto',
    [theme.breakpoints.down('sm')]: {
      width: 'auto',
    },
  },
  profile: {
    display: 'flex',
    justifyContent: 'end',
    width: 'auto',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
      width: 'auto',
      // marginTop: 20,
      justifyContent: 'center',
    },
  },
  logout: {
    marginLeft: '20px',
  },
  userName: {
    display: 'flex',
    alignItems: 'center',
    textAlign: 'center',
    color: 'black',
  },
  brandContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  purple: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
  },
  links: {
    textDecoration: 'none',
    color: 'white',
    opacity:0.7,
    transition: 'font-size 0.2s',
    '&:hover': {
      opacity:1,
      fontSize: '1.1em',
    },
  },
  Drawer: {
    width: '40vh',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  linksDrawer: {
    textDecoration: 'none',
    color: 'black',
    fontSize:'1.3em',
    transition: 'font-size 0.2s',
    '&:hover': {
      opacity:1,
      fontSize: '1.5em',
    },
  },
  navLinks: {
    backgroundColor: 'red',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  title: {
    textDecoration: 'none',
    fontWeight: 'bold',
    color: 'white',
  },
  profileAvatar: {
    display: 'flex',
    justifyContent: 'space-evenly',
    width: 'auto',
    alignItems: 'center',
    backgroundColor:'transparent',
    [theme.breakpoints.down('sm')]: {
      width: 'auto',
      marginTop: 20,
      justifyContent: 'center',
    },
    navbarText:{
      fontSize: '20px',
      fontStyle: 'normal',
      fontWeight: 400,
      lineHeight: '20px'
    },

  },
}));
