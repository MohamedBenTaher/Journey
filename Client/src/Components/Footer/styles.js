import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
    },
  },
  link:{
    textDecoration:'none',
    fontSize:'18px',
    fontWeight:'500',
    color:'#ffffffcc',
    '&:hover':{
        color:'#ffffff'
    }
  },
  container:{
    height:'110%',
    backgroundColor:'#1CA0E3',
    alignItems:'center',
    padding:'5rem',

  },
  title:{
    fontWeight:'900',
    color:'white',
    fontSize:'24px'
  },
 
  list:{
    alignItems:'flex-start',
    justifyContent:'center',
  },
  ListItem:{
    alignItems:'start',
  },
  image:{
    width:'100px'
  },
  text:{
    color:'white',
    textAlign:'left'
  },
  content:{
    alignItems:'center',
    justifyContent:'center'
  },
  links:{
    padding:'1%',
  },
  Brand:{
    padding:'1%',
  },
  Divider:{
    backgroundColor:'white',
    color:'white',
    width:"1200x"
  }

}));