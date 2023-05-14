
import React ,{useState}from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { TextField, Button, FormControl, InputLabel, Select, MenuItem, Grid, Typography } from '@material-ui/core';
import { Formik, Form, Field,FieldArray } from 'formik';
import * as Yup from 'yup';
import AddRounded  from '@material-ui/icons/AddRounded'
import { useSelector } from 'react-redux';
import { s3 } from '../../../awsConfig';
import FileInput from './FileInput';
import './styles'
import CoverImageInput from './CoverImageInput';
import ChipInputField from './ChipInputField'
const useStyles = makeStyles((theme) =>
  createStyles({
    formControl: {
      minWidth: 120,
    },
    submitButton: {
      marginTop: theme.spacing(2),
    },
    heading:{
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
        color: 'black',
        fontWeight: 'bold',
        fontSize: '20px'
        
    },
    form:{
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(2),
    },
    Select:{
       paddingLeft:12
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
      borderRadius:'16px'
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
      borderRadius:'16px'
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
    InputLabel:{
      marginBottom:"1em",
      marginTop:"1em"
    }
  }),
);

const DestinationForm= () => {
  const user=useSelector((state)=>state.user)
  const classes = useStyles();
  const [images, setImages] = useState([]);
  const handleAddChip = (chip) => {
    const chips = [...field.value, chip];
    form.setFieldValue(field.name, chips);
  };

  const handleDeleteChip = (chip, index) => {
    const chips = [...field.value];
    chips.splice(index, 1);
    form.setFieldValue(field.name, chips);
  };

  const onSubmit = async (values, { setSubmitting }) => {
    setSubmitting(true);
 
    const promises = [];

    for (const image of values.images) {
      const params = {
        Bucket: '<your bucket name>',
        Key: image.name,
        Body: image,
        ACL: 'public-read',
      };

      const promise = new Promise((resolve, reject) => {
        s3.putObject(params, (error, data) => {
          if (error) {
            reject(error);
          } else {
            resolve(data);
          }
        });
      });
  
      promises.push(promise);
    }
  
    await Promise.all(promises);
  
    // ...save other form data to the database...
  
    setSubmitting(false);
  }
  return (
    <><Typography variant='h2'  className={classes.heading}>
        Add a new destination
      </Typography>
        <Formik
          initialValues={{
              title: '',
              description: '',
              Country: '',
              type: '',
              creator: user?._id?.toString(),
              coverImage: '',
              images: [],
              tags: [''],
          }}
          validationSchema={Yup.object().shape({
              title: Yup.string().required('Title is required'),
              description: Yup.string().required('Description is required'),
              Country: Yup.string().required('Country is required'),
              type: Yup.string().oneOf(['Location', 'city', 'country']).required('Type is required'),
              creator: Yup.string().required('Creator is required'),
              // coverImage: Yup.Object().required('Cover image is required'),
              images: Yup.array().min(1, 'At least one image is required'),
              tags: Yup.array(),
          })}
          onSubmit={(values, { setSubmitting }) => {
              onSubmit(values);
              setSubmitting(false);
          } }
      >
          {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting,setFieldValue }) => (
              <Form className={classes.form}>
                  <Grid container spacing={3}>
                  <Grid item xs={12}>
                      {values.coverImage && (
                        <div className={classes.preview}>
                          
                            <div  className={classes.coverImageWrapper}>
                               <img src={URL.createObjectURL(values.coverImage[0])} alt={`cover Image`} className={classes.coverImage} />
                              <div
                                className={classes.removeButton}
                                onClick={() => {
                                  setFieldValue('coverImage','');
                                }}
                              >
                                <Typography variant="caption">x</Typography>
                              </div>
                            </div>
                          
                        </div>
                      )}
                      </Grid>
                       
                        {
                          !values.coverImage && (
                            <Grid item xs={12}>
                        <InputLabel className={classes.InputLabel}>Cover Image</InputLabel>
                        <Field 
                        name="coverImage"
                        fullWidth
                        component={CoverImageInput}
                            />
                                </Grid>
                            )
                            }
                  
                      <Grid item xs={12}>
                          <Field
                              name="title"
                              label="Title"
                              variant="outlined"
                              fullWidth
                              as={TextField}
                              error={touched.title && Boolean(errors.title)}
                              helperText={touched.title && errors.title} />
                      </Grid>
                      <Grid item xs={12}>
                          <Field
                              name="description"
                              variant="outlined"
                              label="Description"
                              multiline
                              fullWidth
                              InputProps={{
                                style: {
                                  minHeight: '100px',
                                },
                              }}
                              as={TextField}
                              error={touched.description && Boolean(errors.description)}
                              helperText={touched.description && errors.description} />
                      </Grid>
                      <Grid item xs={12}>
                          <Field
                              name="Country"
                              label="Country"
                              variant="outlined"
                              fullWidth
                              as={TextField}
                              error={touched.Country && Boolean(errors.Country)}
                              helperText={touched.Country && errors.Country} />
                      </Grid>
                      <Grid item xs={12}>
                          <FormControl fullWidth className={classes.formControl}>
                              <InputLabel className={classes.Select}>Type</InputLabel>
                              <Field name="type" as={Select} label="Type" onBlur={handleBlur} variant="outlined" onChange={handleChange} value={values.type} >
                                  <MenuItem value="Location">Location</MenuItem>
                                  <MenuItem value="city">City</MenuItem>
                                  <MenuItem value="country">Country</MenuItem>
                              </Field>
                              {touched.type && Boolean(errors.type) && <div>{errors.type}</div>}
                          </FormControl>
                      </Grid>
                      <Grid item xs={12}>
                      <Field name="tags">
                        {({ field }) => (
                          <ChipInputField
                            {...field}
                            label="Tags"
                            variant="outlined"
                            fullWidth
                            onBlur={handleBlur}
                            error={touched.tags && Boolean(errors.tags)}
                            helperText={touched.tags && errors.tags}
                            fullWidthInput
                            chipRenderer={({ value, handleDelete }) => (
                              <Chip key={value} label={value} onDelete={handleDelete} />
                            )}
                          />
                        )}
                      </Field>
                      </Grid>
                      <Grid item xs={12}>
                          <Field
                              name="creator"
                              label="Creator"
                              variant="outlined"
                              fullWidth
                              as={TextField}
                              error={touched.creator && Boolean(errors.creator)}
                              helperText={touched.creator && errors.creator} />
                      </Grid>
                      <Grid item xs={12}>
                      {values.images.length > 0 && (
                        <div className={classes.preview}>
                          {values.images.map((image, index) => (
                            <div key={index} className={classes.imageWrapper}>
                               <img src={URL.createObjectURL(image)} alt={`Image ${index + 1}`} className={classes.image} />
                              <div
                                className={classes.removeButton}
                                onClick={() => {
                                  setFieldValue('images',values.images.filter((_, i) => i !== index));
                                }}
                              >
                                <Typography variant="caption">x</Typography>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                      </Grid>
                  
                      {values.images.length<5?(
                      <Grid item xs={12}>
                        <InputLabel className={classes.InputLabel}>Destination Images</InputLabel>
                      <Field name="images"  fullWidth component={FileInput} />
                       {touched.images && errors.images && (
                       <div className="error">{errors.images}</div>
                      )}
                     </Grid>
                           ):null
                          }
                    
                      <Grid item xs={12}>
                          <Button
                              type="submit"
                              fullWidth
                              variant="contained"
                              color="primary"
                              disabled={isSubmitting}
                              className={classes.submitButton}
                          >
                              <AddRounded />
                              Add your destination
                          </Button>
                      </Grid>
                  </Grid>
              </Form>
          )}
      </Formik></>
  )}
export default DestinationForm;