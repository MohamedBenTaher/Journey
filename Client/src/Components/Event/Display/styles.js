import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  card: {
    position: 'relative',
    width: '100%',
    margin: 20,
    transition: 'all 0.5s',
    borderRadius: '15px',
    '&:hover': {
      transform: 'scale(1.05)',
      transition: 'all 0.5s',
      '& $content': {
        opacity: 1
      }
    }
  },
  likeButton: {
    position: 'absolute',
    top: '10px',
    right: '10px',
    color: '#fff',
    '&:hover': {
      color: '#fff',
      backgroundColor: 'rgba(10, 10, 10, 0.5)'
    },
    zIndex: 99
  }
}));
