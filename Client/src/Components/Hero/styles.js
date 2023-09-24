import { makeStyles } from '@material-ui/core/styles';
import hero12 from '../../Images/hero.jpg';

export default makeStyles(() => ({
  heroContainer: {
    margin: 0,
    padding: 0,
    height: '100vh',
    backgroundImage: `url(${hero12})`,
    backgroundSize: 'cover',
    height: '100%',
    width: '100%',
    backgroundRepeat: 'no-repeat',
  },
  title: {
    color: 'white',
    fontWeight: 700,
    textAlign:'center',
    lineHeight: '140px'
  },
  subtitle: {
    color: 'white',
    fontWeight: 500,
    textAlign:'center'
  },
  SearchBar: {
    zIndex: 99,
  },
  content: {
    height: '40vh',
    alignItems:'center',
    justifyContent: 'center',

  },
  Devider: {
    backgroundColor: 'white',
  },
  deviderContent: {},
  secondTitle: {
    fontWeight: 'bold',
  },
  body: {
    padding: '1%',
    borderLeft: '2vh solid #3F95EC',
  },
  firstTitle: {
    fontWeight: '600',
    margin: '2%',
  },
}));
