import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
    card: {
      position: 'relative',
      width: 300,
      height: 400,
      margin: 'auto',
      transition: 'all 0.5s',
      '&:hover': {
        transform: 'scale(1.05)',
      },
    },
    media: {
      height: 400,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      filter: 'brightness(70%)',
    },
    content: {
      display:'flex',
      flexDirection:'column',
      alignItems:'center',
      justifyContent:'start',

      transform: 'translate(-50%, -50%)',
      textAlign: 'start',
      color: '#fff',
      opacity: 0,
      transition: 'all 0.5s',
      '&:hover': {
        opacity: 1,
      },
    },
    button: {
        marginTop: theme.spacing(2),
        backgroundColor: 'transparent',
        color: '#fff',
        border: '2px solid #fff',
        borderRadius: theme.spacing(1),
        width: '100%',
        transition: 'all 0.3s',
        '&:hover': {
          backgroundColor: '#fff',
          color: '#000',
        },
  },
  textContainer: {
    padding: theme.spacing(0, 2),
  },}));
  export default useStyles;