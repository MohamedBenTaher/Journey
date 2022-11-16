import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
   modal:{
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 700,
    bgcolor: theme.palette.background.paper,
    color: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    
   }
}));