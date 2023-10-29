import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  mainContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    width: '100%',
  },
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'left',
    flexDirection: 'column',
    width: '100%',
  },
  Container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent:  'space-evenly', // Change 'space-evenly' to 'flex-start'
    width: '100%',
  },
  smMargin: {
    margin: theme.spacing(1),
  },
  actionDiv: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  ul: {
    justifyContent: 'space-around',
  },
  Title: {
    color: '#161414',
    fontFamily: 'Poppins',
    fontSize: '32px',
    fontstyle: 'normal',
    fontWeight: '600',
    lineHeight: '48px',
    textAlign: 'left', // Add this line to align the text to the left
  },
}));
