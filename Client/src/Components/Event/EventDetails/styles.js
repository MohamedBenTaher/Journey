import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    card: {
      maxWidth: 600,
      margin: '0 auto',
      marginTop: theme.spacing(3),
      boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.1)',
    },
    coverImage: {
      width: '100%',
      height: 200,
      objectFit: 'cover',
    },
    title: {
      marginTop: theme.spacing(2),
      fontWeight: 'bold',
    },
    description: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(2),
    },
    infoItem: {
      marginBottom: theme.spacing(1),
    },
  }));