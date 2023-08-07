import { makeStyles } from '@material-ui/core/styles';
import hero12 from '../../Images/hero.jpg';

export default makeStyles((theme) => ({
  heroContainer: {
    backgroundImage: `url(${hero12})`,
    backgroundSize: 'cover',
    overflow: 'hidden',
    width: '100%',
    backgroundRepeat: 'no-repeat',
  },
  title: {
    color: 'white',
    fontWeight: 700,
  },
  subtitle: {
    color: 'white',
    fontWeight: 700,
  },
  SearchBar: {
    zIndex: 99,
  },
  content: {
    height: '40vh',
    justifyContent: 'space-between',
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
