import React from 'react';
import { useDropzone } from 'react-dropzone';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
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
function FileInput({ field, form: { setFieldValue, values } }) {
  const classes = useStyles();
  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    multiple: true,
    onDrop: (acceptedFiles) => {
      const filesArray = [...values[field.name], ...acceptedFiles];
      setFieldValue(field.name, filesArray);
    },
  });

  return (
    <Paper>
      <div {...getRootProps()} className={classes.dropzone}>
        <input {...getInputProps()} />
        <Typography>Drag &apos;n&apos; drop your photos here, or click to select photos</Typography>
      </div>
    </Paper>
  );
}
FileInput.propTypes = {
  field: PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
  form: PropTypes.shape({
    setFieldValue: PropTypes.func.isRequired,
    values: PropTypes.object.isRequired,
  }).isRequired,
};

export default FileInput;
