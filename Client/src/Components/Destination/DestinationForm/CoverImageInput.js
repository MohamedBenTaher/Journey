import { useDropzone } from 'react-dropzone';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import './styles';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginTop: theme.spacing(2),
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  dropzone: {
    height: 150,
    border: '2px dashed #ccc',
    borderRadius: 5,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
  },
  preview: {
    display: 'flex',
    flexWrap: 'wrap',
    marginTop: theme.spacing(2),
  },
  imageWrapper: {
    position: 'relative',
    width: 100,
    height: 100,
    margin: theme.spacing(1),
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
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
}));
function CoverImageInput({ field, form: { setFieldValue, values } }) {
  const classes = useStyles();
  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    multiple: true,
    onDrop: (acceptedFiles) => {
      console.log('accepted cover', acceptedFiles);
      setFieldValue(field.name, acceptedFiles);
    },
  });

  return (
    <Paper>
      <div {...getRootProps()} className={classes.dropzone}>
        <input {...getInputProps()} />
        <Typography>Drag 'n' drop your cover Image</Typography>
      </div>
    </Paper>
  );
}
export default CoverImageInput;
