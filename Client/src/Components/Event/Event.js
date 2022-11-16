import { Button, Modal, Box, Typography, Backdrop, TextField, Grid, DesktopDatePicker } from '@material-ui/core';
import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import useStyles from "./styles.js"
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
function Event() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { events, isLoading } = useSelector((state) => state.events);
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
      title: 'foobar@example.com',
      description: 'foobar',
      startDate: '',
      endDate: '',
      numberOfPlaces: '',
      eventFee: '',
      discountRate: '',
      tags: ''
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });
  console.log('events', events)
  return (

    <>
      <div>{events}</div>
      <div>Event</div>
      <Button variant="outlined" color="primary" onClick={handleOpen}> Add a new Event </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 700,
          bgcolor: 'white',

          border: '2px solid #000',
          boxShadow: 24,
          p: 4,
        }}>
          <Typography variant='h4' gutterBottom> New Event</Typography>
          <Formik
            initialValues={{
              title: '', description: '', startDate: '', endDate: ''
            }}
            validate={values => {
              const errors = {};
              if (!values.email) {
                errors.email = 'Required';
              } else if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
              ) {
                errors.email = 'Invalid email address';
              }
              return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
              setTimeout(() => {
                alert(JSON.stringify(values, null, 2));
                setSubmitting(false);
              }, 400);
            }}
          >
            {({ isSubmitting }) => (



              <Form>
                <Grid container spacing={2}>
                  <Grid item md={12} lg={12} sm={12}>
                    <TextField
                      fullWidth
                      variant="outlined"
                      id="title"
                      name="title"
                      label="Title"
                      value={formik.values.title}
                      onChange={formik.handleChange}
                      error={formik.touched.title && Boolean(formik.errors.title)}
                    />
                    <ErrorMessage name="title" component="div" />
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
                      value={formik.values.description}
                      onChange={formik.handleChange}
                      error={formik.touched.description && Boolean(formik.errors.description)

                      }
                    />
                    <ErrorMessage name="description" component="div" />
                  </Grid>
                  <Grid item md={6} lg={6} sm={12}>
                    <LocalizationProvider variant='outlined' dateAdapter={AdapterDayjs}>
                      <DateTimePicker
                        variant='outlined'
                        label="Start Date"
                        value={formik.values.startDate}
                        onChange={formik.handleChange}
                        renderInput={(params) => <TextField variant='outlined' fullWidth {...params} />} />
                    </LocalizationProvider>
                  </Grid>
                  <Grid item md={6} lg={6} sm={12}>
                    <LocalizationProvider variant='outlined' dateAdapter={AdapterDayjs}>
                      <DateTimePicker
                        variant='outlined'
                        label="End Date"
                        value={formik.values.startDate}
                        onChange={formik.handleChange}
                        renderInput={(params) => <TextField variant='outlined' fullWidth {...params} />} />
                    </LocalizationProvider>
                  </Grid>
                  <Grid item md={12} lg={12} sm={12}>
                    <TextField
                      fullWidth
                      variant="outlined"
                      id="tags"
                      name="tags"
                      label="Tags"
                      value={formik.values.tags}
                      onChange={formik.handleChange}
                      error={formik.touched.tags && Boolean(formik.errors.tags)}
                    />
                  </Grid>
                  <Grid item md={12} lg={12} sm={12}>
                    <Button fullWidth type="submit" disabled={isSubmitting} variant="contained">
                      Submit
                    </Button>
                  </Grid>
                </Grid>
              </Form>

            )}
          </Formik>

        </Box>
      </Modal>
    </>
  )
}

export default Event