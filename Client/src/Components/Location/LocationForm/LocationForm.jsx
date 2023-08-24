import React, { useEffect, useState } from "react";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Typography,
} from "@material-ui/core";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import AddRounded from "@material-ui/icons/AddRounded";
import FileInput from "../../Destination/DestinationForm/FileInput";
import "./styles";
import CoverImageInput from "../../Destination/DestinationForm/CoverImageInput";
import ChipInput from "material-ui-chip-input";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteS3Image } from "../../../api";
import { getCountries } from "../../../actions/country";
import {
  createLocation,
  getLocation,
  updateLocation,
} from "../../../actions/locations";
import { getDestinations } from "../../../actions/destinations";
import  locationTypes  from "../../../constants/locals";

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
      color: "black",
      fontWeight: "bold",
      fontSize: "20px",
    },
    form: {
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2),
    },
    Select: {
      paddingLeft: 18,
      paddingBottom: 15,
    },
    input: {
      display: "none",
    },
    previewContainer: {
      display: "flex",
      alignItems: "center",
      marginBottom: theme.spacing(1),
    },
    previewImage: {
      width: "100%",
      maxWidth: 200,
      marginRight: theme.spacing(1),
    },
    addButton: {
      marginTop: theme.spacing(1),
    },
    dropzone: {
      height: 150,
      border: "2px dashed #ccc",
      borderRadius: 5,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      cursor: "pointer",
    },
    preview: {
      display: "flex",
      flexWrap: "wrap",
      marginTop: theme.spacing(1),
    },
    imageWrapper: {
      position: "relative",
      width: 200,
      height: 200,
      margin: theme.spacing(1),
    },
    coverImage: {
      width: "100%",
      height: "100%",
      objectFit: "cover", // crop the image to fill the container
      objectPosition: "center",
      borderRadius: "16px",
    },
    coverImageWrapper: {
      position: "relative",
      width: "100%",
      height: "200px",
      margin: theme.spacing(1),
    },
    image: {
      width: "100%",
      height: "100%",
      objectFit: "cover", // crop the image to fill the container
      objectPosition: "center",
      borderRadius: "16px",
    },
    removeButton: {
      position: "absolute",
      top: -5,
      right: -5,
      color: "#fff",
      backgroundColor: "#000",
      borderRadius: "50%",
      width: 20,
      height: 20,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      cursor: "pointer",
    },
    InputLabel: {
      marginBottom: "1em",
      marginTop: "1em",
    },
  }),
);

const LocationFom = () => {
  const { id } = useParams();
  const { location, isLoading } = useSelector((state) => state.locations);
  const user = useSelector((state)=>state.auth.user)
  const userId = user.result._id;
  const classes = useStyles();
  const countries = useSelector((state) => state.countries);
  const destinations = useSelector((state) => state.destinations);
  console.log("countires", countries);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCountries());
    dispatch(getDestinations());
  }, []);
  useEffect(() => {
    if (id) {
      dispatch(getLocation(id));
    }
  }, [id, dispatch]);
  console.log("my myLocation", location);
  const handleSubmit = async (
    values,
    { setSubmitting, setFieldValue, resetForm },
  ) => {
    setSubmitting(true);
    console.log(values);

    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("description", values.description);
    formData.append("country", values.country);
    formData.append("destination", values.destination);
    formData.append("type", values.type);
    formData.append("user", user?.result?._id);
    formData.append("coverImage", values.coverImage[0]);
    values.images.forEach((image) => {
      formData.append("images", image);
    });
    values.tags.forEach((tag) => {
      formData.append("tags", tag);
    });
    if (location) {
      dispatch(updateLocation(location?._id, formData));
    } else {
      dispatch(createLocation(formData));
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
        {!location ? "Add a new Location" : "Update this Location"}
      </Typography>
      <Formik
        enableReinitialize
        initialValues={{
          title: location ? location?.title : "",
          description: location ? location?.description : "",
          destination: location ? location.destination : "",
          country: location ? location?.country : "",
          type: location ? location?.type : "",
          creator: location ? user?.result?._id : location?.creator,
          coverImage: location ? location?.coverImage : "",
          images: location ? location?.images : [],
          tags: location ? location?.tags : [],
        }}
        validationSchema={Yup.object().shape({
          // title: Yup.string().required('Title is required'),
          // description: Yup.string().required('Description is required'),
          // country: Yup.string().required('country is required'),
          // creator: Yup.string().required('Creator is required'),
          // coverImage: Yup.mixed().required('Cover Image is required'),
          // images: Yup.array().of(
          //   Yup.mixed().required('Image is required')
          // ).min(1, 'At least one image is required'),
          tags: Yup.array(),
        })}
        onSubmit={(values, { setSubmitting, setFieldValue, resetForm }) => {
          handleSubmit(values, { setSubmitting, setFieldValue, resetForm });
          setSubmitting(false);
        }}
      >
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
                          location?.coverImage
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
                          if (
                            location?.coverImage &&
                            typeof values.coverImage === "string"
                          ) {
                            const deleteImage = await deleteS3Image(
                              location?._id,
                              values.coverImage,
                            );
                          }
                          setFieldValue("coverImage", "");
                        }}
                      >
                        <Typography variant="caption">x</Typography>
                      </div>
                    </div>
                  </div>
                )}
              </Grid>
              {!values.coverImage && (
                <Grid item xs={12}>
                  <InputLabel className={classes.InputLabel}>
                    Cover Image
                  </InputLabel>
                  <Field
                    name="coverImage"
                    fullWidth
                    component={CoverImageInput}
                  />
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
                      minHeight: "100px",
                    },
                  }}
                  as={TextField}
                  error={touched.description && Boolean(errors.description)}
                  helperText={touched.description && errors.description}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth className={classes.formControl}>
                  <InputLabel className={classes.Select}>Type</InputLabel>
                  <Field
                    name="type"
                    as={Select}
                    label="Type "
                    onBlur={handleBlur}
                    variant="outlined"
                    onChange={handleChange}
                    value={values.type}
                  >
                    {locationTypes.map((location) => {
                      return (
                        <MenuItem value={location.value}>
                          {location.name}
                        </MenuItem>
                      );
                    })}
                  </Field>
                  {touched.country && Boolean(errors.type) && (
                    <div>{errors.type}</div>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth className={classes.formControl}>
                  <InputLabel className={classes.Select}>Country</InputLabel>
                  <Field
                    name="country"
                    as={Select}
                    label="Country "
                    onBlur={handleBlur}
                    variant="outlined"
                    onChange={handleChange}
                    value={values.country}
                  >
                    {countries?.countries?.map((country) => {
                      return (
                        <MenuItem value={country._id}>{country.title}</MenuItem>
                      );
                    })}
                  </Field>
                  {touched.country && Boolean(errors.country) && (
                    <div>{errors.country}</div>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth className={classes.formControl}>
                  <InputLabel className={classes.Select}>City</InputLabel>
                  <Field
                    name="destination"
                    as={Select}
                    label="City "
                    onBlur={handleBlur}
                    variant="outlined"
                    onChange={handleChange}
                    value={values.destination}
                  >
                    {destinations?.destinations?.map((destination) => {
                      return (
                        <MenuItem value={destination._id}>
                          {destination.title}
                        </MenuItem>
                      );
                    })}
                  </Field>
                  {touched.destination && Boolean(errors.destination) && (
                    <div>{errors.destination}</div>
                  )}
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <ChipInput
                  label="Tags"
                  variant="outlined"
                  value={values.tags}
                  onAdd={(chip) => {
                    console.log(values.tags);
                    setFieldValue("tags", [...values.tags, chip]);
                  }}
                  onDelete={(chip, index) => {
                    const newTags = [...values.tags];
                    newTags.splice(index, 1);
                    setFieldValue("tags", newTags);
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
                            location?.images?.indexOf(image) !== -1
                              ? image
                              : URL.createObjectURL(image[0])
                          }
                          alt={`Image ${index + 1}`}
                          className={classes.image}
                        />
                        <div
                          className={classes.removeButton}
                          onClick={async (e) => {
                            e.preventDefault();
                            if (location && typeof image === "string") {
                              console.log("reached deletion");
                              await deleteS3Image(location?._id, image).then(
                                () => {
                                  console.log("image deleted successfully");
                                },
                              );
                            }
                            setFieldValue(
                              "images",
                              values.images?.filter((_, i) => i !== index),
                            );
                          }}
                        >
                          <Typography variant="caption">x</Typography>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </Grid>

              {values.images?.length < 5 ? (
                <Grid item xs={12}>
                  <InputLabel className={classes.InputLabel}>
                    location Images
                  </InputLabel>
                  <Field name="images" fullWidth component={FileInput} />
                  {touched.images && errors.images && (
                    <div className="error">{errors.images}</div>
                  )}
                </Grid>
              ) : null}

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
                  Add your location
                </Button>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </>
  );
};
export default LocationFom;
