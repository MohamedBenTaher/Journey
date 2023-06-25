import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({

    card: {
      position: 'relative',
      width: '100%',
      height: 400,
      margin: 20,
      transition: 'all 0.5s',
      borderRadius:'15px',
      '&:hover': {
        transform: 'scale(1.05)',
        '& $content': {
          opacity: 1,
        },
      },
    },
    description: {
      height: '60px', // Set the desired height for the description container
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      display: '-webkit-box',
      '-webkit-line-clamp': '3', // Limit the description to 3 lines
      '-webkit-box-orient': 'vertical',
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
    likeButton:{
      position:'absolute',
      top:'10px',
      right:'10px',
      color:'#fff',
      '&:hover':{
          color:'#fff',
          backgroundColor: 'rgba(10, 10, 10, 0.5)'
          },
      zIndex:99
  },
  likeCount:{
    position:'absolute',
    top:'23px',
    right:'75px',
    color:'#fff',
    '&:hover':{
        color:'#fff',
        backgroundColor: 'rgba(10, 10, 10, 0.5)'
        },
    zIndex:99
  },
    textContainer: {
      padding: theme.spacing(0, 2),
    },
    title:{
      color:'#fff',
      fontSize:'30px',
      fontWeight:'bold',
    }
  
}));
  export default useStyles;