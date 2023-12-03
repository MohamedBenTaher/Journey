import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  paper: {
    width: '100%', // Take full width
    padding: theme.spacing(2),
    boxShadow: 'none',
  },
  banner: {
    padding: theme.spacing(2),
    backgroundColor: theme.palette.background.default,
  },
  bannerGrid: {
    // Add any grid container styling here
  },
}));
export default useStyles;
