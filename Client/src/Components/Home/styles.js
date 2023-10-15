import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  appBarSearch: {
    borderRadius: 4,
    marginBottom: '1rem',
    display: 'flex',
    padding: '16px',
    flexDirection: 'row',
    alignItems: 'center',
    height: '9rem',
    justifyContent: 'space-evenly',
  },
  pagination: {
    borderRadius: 4,
    marginTop: '1rem',
    padding: '16px',
  },
  gridContainer: {
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
      alignItems:'center',
      justifyContent:'center',
      width:'100%',
    },
    padding:5,
    marginTop:25,
    display:'flex',
    alignItems:'center',
    justifyContent:'center',
    alignSelf:'center',
    width:'100%',
    // backgroundColor:'red'
  },
  search: {
    alignItems: 'center',
    justifyContent: 'start',
  },
  searchButton: {
    backgroundColor: '#3f95ec',
    fontWeight: 'bold',
    color: 'white',
    height: '3.2rem',
    '&:hover': {
      color: 'gray',
      backgroundColor: 'lightblue',
    },
  },
}));
