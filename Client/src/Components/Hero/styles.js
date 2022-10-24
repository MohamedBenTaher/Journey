

import { makeStyles } from '@material-ui/core/styles';
import hero12 from '../../Images/hero12.jpg'
export default makeStyles((theme) => ({

  heroContainer: { 
    height:'70vh',
    backgroundImage: `url(${hero12})`,
    backgroundSize:'cover',
    overflow: 'hidden',
    width: '100%',
    backgroundRepeat: 'no-repeat',
    
  },
  title:{
    color:'white',
    fontWeight:700,
  },
  subtitle:{
    color:'white',
    fontWeight:700,
  }
}));


