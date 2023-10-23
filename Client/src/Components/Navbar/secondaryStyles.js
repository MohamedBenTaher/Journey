import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  appBar: {
    // borderRadius: 15,
    backgroundColor:'red',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: 'transparent',
    padding: '10px 0px',
    width: '100%',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },
  image: {
    marginLeft: '10px',
    marginRight:'10px',
  },
  heading: {
    color: theme.palette.primary.main,
    textDecoration: 'none',
    fontSize: '2em',
    fontWeight: 300,
  },
  image: {
    marginLeft: '10px',
    marginTop: '5px',
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'center',
    width: 'auto',
    [theme.breakpoints.down('sm')]: {
      width: 'auto',
    },
  },
  profile: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '400px',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
      width: 'auto',
      marginTop: 20,
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
    marginInline:16,
  },
  links: {
    textDecoration: 'none',
    color: 'black',
    transition: 'font-size 0.2s',
    '&:hover': {
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
    color: 'black',
  },
  profileAvatar: {
    display: 'flex',
    justifyContent: 'space-evenly',
    width: '400px',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
      width: 'auto',
      marginTop: 20,
      justifyContent: 'center',
    },
  },
}));
