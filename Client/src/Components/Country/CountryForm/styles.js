import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    formControl: {
      minWidth: 120,
    },
    submitButton: {
      marginTop: theme.spacing(2),
    },
    heading: {
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2),
      color: 'black',
      fontWeight: 'bold',
      fontSize: '20px',
    },
    form: {
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2),
    },
    Select: {
      paddingLeft: 12,
    },
    input: {
      display: 'none',
    },
    previewContainer: {
      display: 'flex',
      alignItems: 'center',
      marginBottom: theme.spacing(1),
    },
    previewImage: {
      width: '100%',
      maxWidth: 200,
      marginRight: theme.spacing(1),
    },
    addButton: {
      marginTop: theme.spacing(1),
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
      marginTop: theme.spacing(1),
    },
    imageWrapper: {
      position: 'relative',
      width: 200,
      height: 200,
      margin: theme.spacing(1),
    },
    coverImage: {
      width: '100%',
      height: '100%',
      objectFit: 'cover', // crop the image to fill the container
      objectPosition: 'center',
      borderRadius: '16px',
    },
    coverImageWrapper: {
      position: 'relative',
      width: '100%',
      height: '200px',
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
  }),
);