import React, { useEffect } from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { TextField, Button, InputLabel, Grid, Typography } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import AddRounded from '@material-ui/icons/AddRounded';
import FileInput from '../../Destination/DestinationForm/FileInput';
import './styles';
import CoverImageInput from '../../Destination/DestinationForm/CoverImageInput';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deleteS3Image } from '../../../api';
import { createContinent, getContinent, updateContinent } from '../../../actions/continent';
const useStyles = makeStyles((theme) =>
  createStyles({
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

const ContinentForm = () => {
  const { id } = useParams();
  const { continent, isLoading } = useSelector((state) => state.continents);
  const user = useSelector((state) => state.auth.user);
  const userId = user.result._id;
  const classes = useStyles();
  const dispatch = useDispatch();
  useEffect(() => {
    if (id) {
      dispatch(getContinent(id));
    }
  }, [id, dispatch]);
  const handleSubmit = async (values, { setSubmitting, setFieldValue, resetForm }) => {
    console.log('reached');
    setSubmitting(true);
    console.log(values);

    const formData = new FormData();
    formData.append('name', values.name);
    formData.append('description', values.description);
    formData.append('creator', user?.result?._id);
    formData.append('coverImage', values.coverImage[0]); // Assuming only one file is selected
    values.images.forEach((image) => {
      formData.append('images', image);
    });
    values.tags.forEach((tag) => {
      formData.append('tags', tag);
    });
    if (continent) {
      dispatch(updateContinent(continent?._id, formData));
    } else {
      dispatch(createContinent(formData));
    }
    resetForm();

    setSubmitting(false);
  };

  if (!user) {
    return; // `user` is null in the first render
  }

  return (
    <>
      <Typography variant="h2" className={classes.heading}>
        {!id ? 'Add a new continent' : 'Update this continent'}
      </Typography>
      <Formik
        enableReinitialize
        initialValues={{
          name: continent ? name?.title : '',
          description: continent ? continent?.description : '',
          creator: continent ? user?.result?._id : continent?.creator,
          coverImage: continent ? continent?.coverImage : '',
          images: continent ? continent?.images : [],
          tags: continent ? continent?.tags : [],
        }}
        validationSchema={Yup.object().shape({
          //   title: Yup.string().required('Title is required'),
          //   description: Yup.string().required('Description is required'),
          // //   type: Yup.string().oneOf(['location', 'city', 'country']).required('Type is required'),
          //   creator: Yup.string().required('Creator is required'),
          // coverImage: Yup.mixed().required('Cover Image is required'),
          // images: Yup.array().of(
          //   Yup.mixed().required('Image is required')
          // ).min(1, 'At least one image is required'),
          tags: Yup.array(),
        })}
        onSubmit={(values, { setSubmitting, setFieldValue, resetForm }) => {
          console.log('continent', values);
          handleSubmit(values, { setSubmitting, setFieldValue, resetForm });
          setSubmitting(false);
        }}>
        {({ values, errors, touched, handleChange, handleBlur, isSubmitting, setFieldValue }) => (
          <Form className={classes.form} encType="multipart/form-data">
            <Grid container spacing={3}>
              <Grid item xs={12}>
                {values.coverImage && (
                  <div className={classes.preview}>
                    <div className={classes.coverImageWrapper}>
                      <img
                        src={
                          continent?.coverImage
                            ? values.coverImage
                            : URL.createObjectURL(values.coverImage[0])
                        }
                        alt={`cover Image`}
                        className={classes.coverImage}
                      />
                      <div
                        className={classes.removeButton}
                        onClick={async (e) => {
                          e.preventDefault();
                          if (continent?.coverImage && typeof values.coverImage === 'string') {
                            const deleteImage = await deleteS3Image(
                              continent?._id,
                              values.coverImage,
                            );
                          }
                          setFieldValue('coverImage', '');
                        }}>
                        <Typography variant="caption">x</Typography>
                      </div>
                    </div>
                  </div>
                )}
              </Grid>
              {!values.coverImage && (
                <Grid item xs={12}>
                  <InputLabel className={classes.InputLabel}>Cover Image</InputLabel>
                  <Field name="coverImage" fullWidth component={CoverImageInput} />
                </Grid>
              )}

              <Grid item xs={12}>
                <Field
                  name="name"
                  label="Title"
                  variant="outlined"
                  fullWidth
                  as={TextField}
                  error={touched.name && Boolean(errors.name)}
                  helperText={touched.name && errors.name}
                />
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
                  helperText={touched.description && errors.description}
                />
              </Grid>
              {/* <Grid item xs={12}>
                          <Field
                              name="country"
                              label="country"
                              variant="outlined"
                              fullWidth
                              as={TextField}
                              error={touched.country && Boolean(errors.country)}
                              helperText={touched.country && errors.country} />
                      </Grid> */}

              <Grid item xs={12}>
                <Autocomplete
                  multiple
                  options={[]} // Provide your list of options here
                  value={values.tags}
                  onChange={(event, newValue) => {
                    setFieldValue('tags', newValue);
                  }}
                  renderInput={(params) => (
                    <TextField {...params} variant="outlined" label="Tags" placeholder="Tags" />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                {values?.images?.length > 0 && (
                  <div className={classes.preview}>
                    {values.images?.map((image, index) => (
                      <div key={index} className={classes.imageWrapper}>
                        <img
                          src={
                            continent?.images && continent?.images?.indexOf(image) !== -1
                              ? image
                              : URL.createObjectURL(image)
                          }
                          alt={`Image ${index + 1}`}
                          className={classes.image}
                        />
                        <div
                          className={classes.removeButton}
                          onClick={async (e) => {
                            e.preventDefault();
                            if (continent && typeof image === 'string') {
                              console.log('reached deletion');
                              await deleteS3Image(continent._id, image).then(() => {
                                console.log('image deleted successfully');
                              });
                            }
                            setFieldValue(
                              'images',
                              values.images?.filter((_, i) => i !== index),
                            );
                          }}>
                          <Typography variant="caption">x</Typography>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </Grid>
              {values.images?.length < 5 ? (
                <Grid item xs={12}>
                  <InputLabel className={classes.InputLabel}>Destination Images</InputLabel>
                  <Field name="images" fullWidth component={FileInput} />
                  {touched.images && errors.images && <div className="error">{errors.images}</div>}
                </Grid>
              ) : null}
              <Grid item xs={12}>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  disabled={isSubmitting}
                  className={classes.submitButton}>
                  <AddRounded />
                  Add your continent
                </Button>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </>
  );
};
export default ContinentForm;
