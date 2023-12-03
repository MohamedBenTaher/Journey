import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  smallCard: {
    height: '100%',
    width: '668px',
    borderRadius: '15px',
    boxShadow: 'none',
    transition: 'all 0.5s',
    backgroundColor: 'transparent',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
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
    width: '50%',
    height: '380px',
    borderRadius: '15px',
    filter: 'brightness(70%)',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'start',
    justifyContent: 'space-between',
    flexBasis: '50%',
    height: '380px',
    // rowGap: '16px',
    flexGrow: 1,
    padding: '2px',
    paddingLeft: '12px',
    backgroundColor: 'transparent',
  },
  contentFooter: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  footerText: {
    fontSize: '12px',
    fontWeight: 400,
    lineHeight: '16px',
    letterSpacing: '0em',
    textAlign: 'left',
  },
  footerItem: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'start',
    columnGap: '5px',
  },
  textContainer: {
    padding: theme.spacing(0, 2),
  },
  title: {
    fontSize: '24px',
    fontStyle: 'normal',
    fontWeight: 600,
    lineHeight: '38px',
    textAlign: 'left',
    whiteSpace: 'normal', // Allow text to wrap
    textOverflow: 'ellipsis', // Add ellipsis (...) if the text overflows
    overflow: 'hidden', // Hide the overflow text
    maxHeight: '48px', // Adjust the max height as needed
  },
}));
export default useStyles;
