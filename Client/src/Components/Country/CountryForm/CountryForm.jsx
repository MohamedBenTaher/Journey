import React, { useEffect } from 'react';
import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Typography,
} from '@material-ui/core';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import AddRounded from '@material-ui/icons/AddRounded';
import FileInput from '../../Destination/DestinationForm/FileInput';
import './styles';
import CoverImageInput from '../../Destination/DestinationForm/CoverImageInput';
import useStyles from './styles';
import ChipInput from 'material-ui-chip-input';
import { useParams } from 'react-router-dom';
import { createCountry, getCountry, updateCountry } from '../../../actions/country.js';
import { useDispatch, useSelector } from 'react-redux';
import { deleteS3Image } from '../../../api';
import { getContinents } from '../../../actions/continent';

const CountryForm = () => {
  const { id } = useParams();
  const { country, isLoading } = useSelector((state) => state.countries);
  const { continents } = useSelector((state) => state.continents);
  const user = useSelector((state) => state.auth.user);
  const classes = useStyles();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getContinents());
  }, []);
  useEffect(() => {
    if (id) {
      dispatch(getCountry(id));
    }
  }, [id, dispatch]);
  const handleSubmit = async (values, { setSubmitting, setFieldValue, resetForm }) => {
    setSubmitting(true);
    console.log(values);

    const formData = new FormData();
    formData.append('title', values.title);
    formData.append('description', values.description);
    formData.append('continent', values.continent);
    formData.append('user', user?.result?._id);
    formData.append('coverImage', values.coverImage[0]); // Assuming only one file is selected
    values.images.forEach((image) => {
      formData.append('images', image);
    });
    values.tags.forEach((tag) => {
      formData.append('tags', tag);
    });
    if (country) {
      dispatch(updateCountry(country?._id, formData));
    } else {
      dispatch(createCountry(formData));
    }
    resetForm();

    setSubmitting(false);
  };

  if (!user) {
    return;
  }

  return (
    <>
      <Typography variant="h2" className={classes.heading}>
        {!country ? 'Add a new country' : 'Update this country'}
      </Typography>
      <Formik
        enableReinitialize
        initialValues={{
          title: country ? country?.title : '',
          description: country ? country?.description : '',
          continent: country ? country?.country : '',
          user: country ? user?.result?._id : country?.user,
          coverImage: country ? country?.coverImage : '',
          images: country ? country?.images : [],
          tags: country ? country?.tags : [],
        }}
        validationSchema={Yup.object().shape({
          // name: Yup.string().required('name is required'),
          // description: Yup.string().required('Description is required'),
          // continent: Yup.string().required('Type is required'),
          // user: Yup.string().required('user is required'),
          // coverImage: Yup.mixed().required('Cover Image is required'),
          // images: Yup.array().of(
          //   Yup.mixed().required('Image is required')
          // ).min(1, 'At least one image is required'),
          tags: Yup.array(),
        })}
        onSubmit={(values, { setSubmitting, setFieldValue, resetForm }) => {
          handleSubmit(values, { setSubmitting, setFieldValue, resetForm });
          setSubmitting(false);
        }}>
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          setFieldValue,
        }) => (
          <Form className={classes.form} encType="multipart/form-data">
            <Grid container spacing={3}>
              <Grid item xs={12}>
                {values.coverImage && (
                  <div className={classes.preview}>
                    <div className={classes.coverImageWrapper}>
                      <img
                        src={
                          country?.coverImage
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
                          if (country?.coverImage && typeof values.coverImage === 'string') {
                            const deleteImage = await deleteS3Image(
                              country?._id,
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
                  name="title"
                  label="Title"
                  variant="outlined"
                  fullWidth
                  as={TextField}
                  error={touched.title && Boolean(errors.title)}
                  helperText={touched.title && errors.title}
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
              <Grid item xs={12}>
                <FormControl fullWidth className={classes.formControl}>
                  <InputLabel className={classes.Select}>Continent</InputLabel>
                  <Field
                    name="continent"
                    as={Select}
                    label="Continent"
                    onBlur={handleBlur}
                    variant="outlined"
                    onChange={handleChange}
                    value={values.continent}>
                    {continents &&
                      continents?.map((continent) => (
                        <MenuItem value={continent?._id} key={continent?._id}>
                          {continent.name}
                        </MenuItem>
                      ))}
                  </Field>
                  {touched.type && Boolean(errors.type) && <div>{errors.type}</div>}
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <ChipInput
                  label="Tags"
                  variant="outlined"
                  value={values.tags}
                  onAdd={(chip) => {
                    console.log(values.tags);
                    setFieldValue('tags', [...values.tags, chip]);
                  }}
                  onDelete={(chip, index) => {
                    const newTags = [...values.tags];
                    newTags.splice(index, 1);
                    setFieldValue('tags', newTags);
                  }}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                {values?.images?.length > 0 && (
                  <div className={classes.preview}>
                    {values.images?.map((image, index) => (
                      <div key={index} className={classes.imageWrapper}>
                        <img
                          src={
                            country?.images?.indexOf(image) === -1
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
                            if (country && typeof image === 'string') {
                              await deleteS3Image(country._id, image).then(() => {
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
                  <InputLabel className={classes.InputLabel}>Country Images</InputLabel>
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
                  Add your country
                </Button>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </>
  );
};
export default CountryForm;
