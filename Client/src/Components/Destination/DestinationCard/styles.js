import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({

    card: {
      position: 'relative',
      width: 500,
      height: 400,
      margin: 'auto',
      transition: 'all 0.5s',
      borderRadius:'15px',
      '&:hover': {
        transform: 'scale(1.05)',
        '& $content': {
          opacity: 1,
        },
      },
    },
    media: {
      height: 400,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      filter: 'brightness(70%)',
    },
    content: {
      position: 'absolute',
      bottom: 0,
      left: '50%',
      transform: 'translateX(-50%)',
      textAlign: 'left',
      color: '#fff',
      opacity: 0,
      width:'100%',
      transition: 'all 0.5s',
    },
    button: {
      marginTop: theme.spacing(2),
      backgroundColor: 'transparent',
      color: '#fff',
      border: '2px solid #fff',
      borderRadius: '15px',
      width: '100%',
      transition: 'all 0.3s',
      '&:hover': {
        backgroundColor: '#fff',
        color: '#000',
      },
    },
    textContainer: {
      padding: theme.spacing(0, 2),
    },
  
}));
  export default useStyles;