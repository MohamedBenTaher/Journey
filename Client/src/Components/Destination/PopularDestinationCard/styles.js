import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({

  smallCard: {
    height: 250,
    width: '200px',
    borderRadius: '15px',
    boxShadow:'none',
    transition: 'all 0.5s',
    backgroundColor:'transparent',
    display:'flex',
    alignItems:'center',
    flexDirection:'column',
    '&:hover': {
      transform: 'scale(1.05)',
      '& $content': {
        opacity: 1,
      },
    },
  },
  description: {
    color: '#979797',
    fontSize: '14px',
    fontStyle: 'normal',
    fontWeight: 400,
    lineHeight: '20px',
  },
  media: {
    width: '200px',
    height: '70%',  
    borderRadius: '15px',
    // backgroundSize: 'cover',
    // backgroundPosition: 'center',
    filter: 'brightness(70%)',
  },
  content: {
    textAlign:'start',
    display:'flex',
    flexDirection:'column',
    alignItems:'start',
    justifyContent:'start',
    padding:'2px',
    // position: 'absolute',
    // bottom: 0,
    // left: '50%',
    // transform: 'translateX(-50%)',
    // textAlign: 'left',
    // color: '#fff',
    // opacity: 0,
    width: '100%',
    // transition: 'all 0.5s',
  },
  textContainer: {
    padding: theme.spacing(0, 2),
  },
  title: {
    fontSize: '16px',
    fontStyle: 'normal',
    fontWeight: 500,
    lineHeight: '24px'
  },
}));
export default useStyles;
