import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  card: {
    width: '100%',
    height: '100%',
    backgroundColor: theme.palette.background.main,
    borderRadius: '10px',
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2)'
  },
  title: {
    marginBottom: theme.spacing(2),
    color: theme.palette.primary.main
  },
  info: {
    marginBottom: theme.spacing(1)
  },
  locationsTitle: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(2)
  },
  locationsList: {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2)
  },
  locationItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing(1)
  },
  locationText: {
    fontWeight: 'bold'
  },
  locationCost: {
    color: theme.palette.primary.main
  }
}));
