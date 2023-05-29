import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
    },
  },
  paper: {
    padding: theme.spacing(2),
  },
  form: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'start',
  },
  fileInput: {
    width: '97%',
    margin: '10px 0',
  },
  buttonSubmit: {
    marginBottom: 10,
  },
  dropZone: {
    height: 150,
    border: '2px dashed #ccc',
    width:'100%',
    padding:'30px',
    borderRadius: 5,
    margin:10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
  },
  droppedImage:{
    width:'100%',
    borderRadius:'16px'
  },
  select:{
    width:'100%',   
    margin:10
  }
}));