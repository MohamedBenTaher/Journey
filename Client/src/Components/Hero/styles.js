import { makeStyles } from '@material-ui/core/styles';
import hero12 from '../../Images/hero.jpg';
import BgImage from '../../assets/images/bg-image.png'
export default makeStyles((theme) => ({
heroContainer: {
  margin: 0,
  padding: '1.25em',
  height: '100vh',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  transition: 'opacity 0.5s ease-in-out',
  marginBottom: '1.25em',
  borderBottomRightRadius: '1em',
  borderBottomLeftRadius: '1em',
  display: 'flex',
  flexDirection: 'column',
  columnGap: '2em',
  rowGap: '4em',
  [theme.breakpoints.down('xs')]: {
    marginBottom: '30em',
  },
  [theme.breakpoints.down('md')]: {
    marginBottom: '30em',
  },
  [theme.breakpoints.up('md')]: {
    marginBottom: 'initial',
  },
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
    display:'flex',
    alignItems:'center',
    justifyContent:'center'
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
    padding: '10%',
    borderLeft: '2vh solid #3F95EC',
  },
  firstTitle: {
    fontWeight: '600',
    margin: '2%',
  },
}));
