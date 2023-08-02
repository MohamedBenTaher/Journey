import { makeStyles } from '@material-ui/core/styles';
import { deepPurple } from '@material-ui/core/colors';

export default makeStyles((theme) => ({
  appBar: {
    borderRadius: 15,
    margin: '30px 0',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 0px',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column'
    }
  },
  heading: {
    color: theme.palette.primary.main,
    textDecoration: 'none',
    fontSize: '2em',
    fontWeight: 300
  },
  image: {
    marginLeft: '10px',
    marginTop: '5px'
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'flex-end',
    width: '400px',
    [theme.breakpoints.down('sm')]: {
      width: 'auto'
    }
  },
  profile: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '400px',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
      width: 'auto',
      marginTop: 20,
      justifyContent: 'center'
    }
  },
  logout: {
    marginLeft: '20px'
  },
  userName: {
    display: 'flex',
    alignItems: 'center',
    textAlign: 'center',
    color: 'black'
  },
  brandContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  purple: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500]
  },
  links: {
    textDecoration: 'none',
    color: 'white',
    '&:hover': {
      //textDecoration: "underline blue ",
      borderBottom: '2px solid #3F95EC'
    }
  },
  Drawer: {
    width: '30vh',
    height: '80vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-evenly'
  },
  linksDrawer: {
    textDecoration: 'none',
    color: 'black',
    '&:hover': {
      borderBottom: '2px solid #3F95EC'
      //textDecoration: "underline blue ",
    }
  },
  navLinks: {
    backgroundColor: 'red',
    justifyContent: 'space-evenly',
    alignItems: 'center'
  },
  title: {
    textDecoration: 'none',
    fontWeight: 'bold',
    color: 'white'
  }
}));
