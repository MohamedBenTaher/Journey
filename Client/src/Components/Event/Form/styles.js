import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  container: {
    width: '95%',
    padding: '5em',
  },
  coverImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover', // crop the image to fill the container
    objectPosition: 'center',
    borderRadius: '16px',
  },
  preview: {
    display: 'flex',
    flexWrap: 'wrap',
    marginTop: theme.spacing(1),
  },
  coverImageWrapper: {
    position: 'relative',
    width: '100%',
    height: '400px',
    margin: theme.spacing(1),
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover', // crop the image to fill the container
    objectPosition: 'center',
    borderRadius: '16px',
  },
  removeButton: {
    position: 'absolute',
    top: -5,
    right: -5,
    color: '#fff',
    backgroundColor: '#000',
    borderRadius: '50%',
    width: 20,
    height: 20,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
  },
  InputLabel: {
    marginBottom: '1em',
    marginTop: '1em',
  },
}));
