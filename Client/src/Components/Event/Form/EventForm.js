import { Button, Modal, Box, Typography, Backdrop, TextField, Grid, Input,InputLabel } from '@material-ui/core';
import React, { useState, Fragment ,useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import useStyles from "./styles.js"
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import ChipInput from "material-ui-chip-input";
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { createEvent, getEvent } from '../../../actions/events';
import FileBase64 from 'react-file-base64';
import { deleteS3Image } from '../../../api/index.js';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min.js';
import CoverImageInput from '../../Destination/DestinationForm/CoverImageInput.js';
function Event() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const {id}=useParams()
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const dispatch = useDispatch()
  const [image, setImage] = useState({})
  const user = JSON.parse(localStorage.getItem('profile'))
  const { event, isLoading } = useSelector((state) => state.events);
  const validationSchema = yup.object({
    email: yup
      .string('Enter your email')
      .email('Enter a valid email')
      .required('Email is required'),
    password: yup
      .string('Enter your password')
      .min(8, 'Password should be of minimum 8 characters length')
      .required('Password is required'),
  });

  const formik = useFormik({
    initialValues: {
      title: event?event.title:'',
      description: event?event.description:'',
      startDate: event?event.startDate:new Date(),
      endDate:event?event.endDate:new Date(),
      numberOfPlaces: event?event.numberOfPlaces:0,
      eventFee: event?event.numberOfPlaces:0,
      location: event?event.location:'',
      discountRate: event?event.discountRate:0,
      tags: event?event.tags:[],
      coverImage: event?event.coverImage[0]:'',
      creator: user?.result?.name,
    },
    // validationSchema: validationSchema,
    onSubmit: (values) => {
      dispatch(createEvent(values));
      console.log(values);
    },
  });
  useEffect(()=>{
    if(id){ 
      dispatch(getEvent(id))
    }},[id,dispatch])
  console.log('events', event)
  return (

    <>

      <div>Event</div>


      <Typography variant='h4' sx={{ fontWeight: '700' }} gutterBottom> New Event</Typography>


      <Formik
        initialValues={{
          title: 'Meet Up at Sicily ',
          description: 'This Our first meetup at sicily we will be having activities and enjoy our time ',
          startDate: new Date(),
          endDate: new Date(),
          numberOfPlaces: 50,
          eventFee: 100,
          location: 'Italy',
          discountRate: 5,
          tags: '',
          selectedFile: '',
          creator: user?.result?.name,
        }}
        // validate={values => {
        //   const errors = {};
        //   if (!values.email) {
        //     errors.email = 'Required';
        //   } else if (
        //     !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
        //   ) {
        //     errors.email = 'Invalid email address';
        //   }
        //   return errors;
        // }}
        onSubmit={(values, { setSubmitting }) => {
          // setTimeout(() => {
          //   alert(JSON.stringify(values, null, 2));
          //   setSubmitting(false);
          // }, 400);
          console.log('submitting')
          dispatch(createEvent(values));
          console.log(values);
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
          setFieldValue

          /* and other goodies */

        }) => (
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item md={12} lg={12} sm={12}>
                <TextField
                  fullWidth
                  variant="outlined"
                  id="title"
                  name="title"
                  label="Title"
                  value={values.title}
                  onChange={handleChange}
                  error={touched.title && Boolean(errors.title)}
                />

              </Grid>
              <Grid item md={12} lg={12} sm={12}>
                <TextField
                  fullWidth
                  variant="outlined"
                  id="description"
                  name="description"
                  label="Description"
                  multiline={true}
                  minRows={5}
                  value={values.description}
                  onChange={handleChange}
                  error={touched.description && Boolean(errors.description)}


                />
              </Grid>
              <Grid item md={6} lg={6} sm={12}>
                <LocalizationProvider variant='outlined' dateAdapter={AdapterDayjs}>
                  <DateTimePicker
                    variant='outlined'
                    label="Start Date"
                    value={values.startDate}
                    onChange={handleChange}
                    renderInput={(params) => <TextField variant='outlined' fullWidth {...params} />} />
                </LocalizationProvider>
              </Grid>
              <Grid item md={6} lg={6} sm={12}>
                <LocalizationProvider variant='outlined' dateAdapter={AdapterDayjs}>
                  <DateTimePicker
                    variant='outlined'
                    label="End Date"
                    value={values.startDate}
                    onChange={handleChange}

                    renderInput={(params) => <TextField variant='outlined' fullWidth {...params} />} />
                </LocalizationProvider>
              </Grid>
              <Grid item md={12} lg={12} sm={12}>
                <TextField
                  fullWidth
                  variant="outlined"
                  id="location"
                  name="location"
                  label="Location"
                  value={values.location}
                  onChange={handleChange}
                  error={touched.location && Boolean(errors.location)}
                />
              </Grid>
              <Grid item md={6} lg={6} sm={12}>
                <TextField
                  fullWidth
                  type={'number'}
                  variant="outlined"
                  id="eventFee"
                  name="eventFee"
                  label="Event Fee"
                  value={values.eventFee}
                  onChange={handleChange}
                  error={touched.eventFee && Boolean(errors.eventFee)}
                />
              </Grid>
              <Grid item md={6} lg={6} sm={12}>
                <TextField
                  fullWidth
                  type={'number'}
                  variant="outlined"
                  id="discountRate"
                  name="discountRate"
                  label="Discount Rate"
                  value={values.discountRate}
                  onChange={handleChange}
                  error={touched.discountRate && Boolean(errors.discountRate)}
                />
              </Grid>
              <Grid item md={12} lg={12} sm={12}>
                <TextField
                  fullWidth
                  type={'number'}
                  variant="outlined"
                  id="numberOfPlaces"
                  name="numberOfPlaces"
                  label="Available Places"
                  value={values.numberOfPlaces}
                  onChange={handleChange}
                  error={touched.numberOfPlaces && Boolean(errors.numberOfPlaces)}
                />
              </Grid>
              <Grid item md={12} lg={12} sm={12}>
                <ChipInput
                  value={values.tags.split(' ')}
                  id="tags"
                  name="tags"
                  onAdd={(tag) => setFieldValue('tags', [...values.tags, tag].join(''))}
                  onDelete={(tagToDelete) => {

                    let arr = values.tags.split(' ').filter((tag) => tag !== tagToDelete)
                    console.log(arr, tagToDelete)
                    setFieldValue('tags', arr.join(' '))
                  }}
                  label="Tags"
                  variant="outlined"
                  fullWidth

                />
              </Grid>
              <Grid item xs={12}>
                      {values.coverImage && (
                        <div className={classes.preview}>
                            <div  className={classes.coverImageWrapper}>
                               <img src={event?.coverImage?values.coverImage:URL.createObjectURL(values.coverImage[0])} alt={`cover Image`} className={classes.coverImage} />
                              <div
                                className={classes.removeButton}
                                onClick={ async (e) => {
                                  e.preventDefault()
                                  if(event?.coverImage && typeof values.coverImage==='string'){
                                    const deleteImage= await deleteS3Image(event?._id,values.coverImage)
                                  }
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
                          !values.file && (
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
                  
              <Grid item md={12} lg={12} sm={12}>
                <Button fullWidth type="submit"
                  //  disabled={isSubmitting}
                  variant="contained">
                  Submit
                </Button>
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>



    </>
  )
}

export default Event