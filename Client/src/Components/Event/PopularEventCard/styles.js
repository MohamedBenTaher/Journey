import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  smallCard: {
    height: 'auto',
    width: '380px',
    borderRadius: '15px',
    gap: '1em',
    boxShadow: 'none',
    transition: 'all 0.5s',
    backgroundColor: 'transparent',
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap', // Allow content to wrap
    '&:hover': {
      transform: 'scale(1.02)',
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
    width: '380px',
    height: '450px',
    borderRadius: '15px',
    // backgroundSize: 'cover',
    // backgroundPosition: 'center',
    filter: 'brightness(70%)',
    '&:hover': {
      filter: 'brightness(85%)',
    },
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'start',
    justifyContent: 'flex-start',
    gap: '2em', // Align content to the left
    padding: '2px',
    width: '100%', // Take full width
  },
  textContainer: {
    padding: theme.spacing(0, 2),
  },
  title: {
    fontSize: '16px',
    fontStyle: 'normal',
    fontWeight: 500,
    lineHeight: '24px',
    textAlign: 'left',
    whiteSpace: 'normal', // Allow text to wrap
    textOverflow: 'ellipsis', // Add ellipsis (...) if the text overflows
    overflow: 'hidden', // Hide the overflow text
    maxHeight: '48px', // Adjust the max height as needed
  },
}));
export default useStyles;
