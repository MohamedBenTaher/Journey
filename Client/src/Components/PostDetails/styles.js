import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  media: {
    borderRadius: '20px',
    objectFit: 'cover',
    width: '100%',
    maxHeight: '600px',
  },
  card: {
    display: 'flex',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'start',
    [theme.breakpoints.down('sm')]: {
      flexWrap: 'wrap',
      flexDirection: 'column',
    },
  },
  section: {
    borderRadius: '20px',
    margin: '10px',
    flex: 1,
  },
  recommendedPosts: {
    display: 'flex',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },
  loadingPaper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
    borderRadius: '15px',
    height: '39vh',
  },
  commentsOuterContainer: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  commentsInnerContainer: {
    height: '200px',
    overflowY: 'auto',
    marginRight: '30px',
  },
  PostInformations: {
    width: '40%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'start',
    flexDirection: 'row',
  },
  info: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  tags: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'start',
    marginLeft: '2em',
  },
  title: {
    marginTop: theme.spacing(2),
    fontWeight: 'bold',
  },
  message: {
    margin: '20px 0',
    padding: '10px',
    lineHeight: '1.5',
    textJustify: 'auto',
  },
  imageSection: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'flex-end',
  },
  savePost: {
    position: 'absolute',
    top: 20,
    right: 20,
    zIndex: 99,
  },
}));