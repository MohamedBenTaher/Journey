import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1)
    }
  },
  paper: {
    padding: theme.spacing(2)
  },
  form: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'start'
  },
  fileInput: {
    width: '97%',
    margin: '10px 0'
  },
  buttonSubmit: {
    marginBottom: 10
  },
  dropZone: {
    height: 150,
    border: '2px dashed #ccc',
    width: '100%',
    padding: '30px',
    borderRadius: 5,
    margin: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer'
  },
  droppedImage: {
    width: '100%',
    borderRadius: '16px'
  },
  select: {
    width: '100%',
    margin: 10
  },
  coverImageWrapper: {
    position: 'relative',
    width: '100%',
    height: '200px',
    margin: theme.spacing(1)
  },
  coverImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover', // crop the image to fill the container
    objectPosition: 'center',
    borderRadius: '16px'
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
    cursor: 'pointer'
  }
}));
