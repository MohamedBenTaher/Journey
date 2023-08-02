import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  mainContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'start',
    width: '100%',
    padding: '2em'
  },
  smMargin: {
    margin: theme.spacing(1)
  },
  actionDiv: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  ul: {
    justifyContent: 'space-around'
  }
}));
