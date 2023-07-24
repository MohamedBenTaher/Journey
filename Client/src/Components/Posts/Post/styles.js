import { makeStyles } from '@material-ui/core/styles';

export default makeStyles({
  media: {
    height: 0,
    paddingTop: '56.25%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    backgroundBlendMode: 'darken',
  },
  border: {
    border: 'solid',
  },
  fullHeightCard: {
    height: '40%',
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    borderRadius: '15px',
    height: '100%',
    position: 'relative',
  },
  smallCard:{
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    borderRadius: '15px',
    height: '100%',
    position: 'relative',
    transition: 'all 0.5s',
    '&:hover': {
      transform: 'scale(1.05)',
      '& $content': {
        opacity: 1,
      },
    },
  },
  overlay: {
    position: 'absolute',
    top: '10px',
    left: '20px',
    color: 'white',
  },
  grid: {
    display: 'flex',
  },
  details: {
    display: 'flex',
    justifyContent: 'space-between',
    marginRight: '20px',
    marginLeft:'20px'
  },
  title: {
    padding: '4px 16px',
  },
  cardActions: {
    // padding: '0 16px 8px 16px',
    display: 'flex',
    justifyContent: 'space-between',
  },
  smallActions:{
    display: 'flex',
    justifyContent: 'end',
  },
  cardAction: {
    display: 'block',
    textAlign: 'initial',
  },
  bookingButton:{
    borderRadius:'15px'
  }
});