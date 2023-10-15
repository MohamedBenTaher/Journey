import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  appBarSearch: {
    borderRadius: 4,
    height:'auto',
    width:'95%',
    display: 'flex',
    flexDirection: 'row',
    padding:'12px',
    alignItems: 'center',
    alignSelf:'center',
    backgroundColor: 'white !important',
    justifyContent:'space-evenly',
    boxShadow:' 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
    marginBlock:'100px'
  },
  Inputs:{
    display:'flex',
    flexDirection:'row',
    flexBasis:'90%',
    
      [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
    },
     [theme.breakpoints.down('sm')]: {
      flexWrap:'wrap'
    },
  },
  pagination: {
    borderRadius: 4,
    marginTop: '1rem',
    padding: '16px',
  },
  gridContainer: {
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
    },
  },
  search: {
    alignItems: 'center',
    justifyContent: 'start',
  },
  searchButton: {
    backgroundColor: 'primary',
    fontWeight: 'bold',
    color: 'white',
    width:'100%',
    borderRadius:'18px',
    gap: '8px',
    padding: '18px',
    height: '3.2rem',
    '&:hover': {
      color: 'gray',
      backgroundColor: 'lightblue',
    },
   
  },
  buttonContainer:{
  [theme.breakpoints.down('sm')]: {
        width:'auto',
    },
     [theme.breakpoints.down('md')]: {
        width:'100%',
    },
  },
  searchBarContainer:{
    borderRadius: 4,
    height:'auto',
    width:'100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor:'red',
    justifyContent: 'space-evenly',
  }
}));
