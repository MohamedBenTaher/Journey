import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  card: {
    width: '80%',
    margin: '0 auto',
    marginTop: theme.spacing(3),
    boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.1)'
  },
  coverImage: {
    width: '100%',
    height: 400,
    objectFit: 'cover'
  },
  title: {
    marginTop: theme.spacing(2),
    fontWeight: 'bold'
  },
  description: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(2)
  },
  infoItem: {
    marginBottom: theme.spacing(1),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  saveEvent: {
    position: 'absolute',
    top: 20,
    right: 20,
    zIndex: 99
  },
  imageSection: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'flex-end'
  },
  content: {
    padding: '16px'
  }
}));
