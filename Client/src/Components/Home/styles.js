import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  appBarSearch: {
    borderRadius: 4,
    marginBottom: '1rem',
    display: 'flex',
    padding: '16px',
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-evenly',
  },
  pagination: {
    borderRadius: 4,
    marginTop: '1rem',
    padding: '16px',
  },
  gridContainer: {
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column-reverse',
    },
  },
  search:{
    alignItems:'center',
    justifyContent:'space-evenly',
  },
  searchButton:{
    marginTop:'2em'
  }
}));