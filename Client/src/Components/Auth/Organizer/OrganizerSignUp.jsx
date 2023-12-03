import React from 'react';
import { Formik, Field, Form } from 'formik';
import { TextField, Container, Paper, Grid, Button } from '@material-ui/core';
import useStyles from '../Customer/styles';
import * as Yup from 'yup';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { signupOrganizer } from '../../../actions/auth';

const validationSchema = Yup.object().shape({
  organization_name: Yup.string().required('Required'),
  description: Yup.string().required('Required'),
  website: Yup.string().url('Invalid URL'),
  contact_email: Yup.string().email('Invalid email'),
  phone_number: Yup.string(),
  name: Yup.string().required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string()
    .min(8, 'Password is too short - should be 8 chars minimum.')
    .required('Required'),
  address: Yup.string(),
});

function OrganizerRegistrationForm() {
  const history = useHistory();
  const dispatch = useDispatch();
  const classes = useStyles();
  const handleSubmit = (values, { setSubmitting, resetForm, errors }) => {
    console.log('called submit');
    console.log(errors);
    console.log(values);
    setSubmitting(false);
    dispatch(signupOrganizer(values, history));
    resetForm();
  };

  return (
    <Container component="main" maxWidth="sm">
      <Paper className={classes.SignUpPaper} elevation={6}>
        <h1>Organizer Sign Up</h1>
        <Formik
          initialValues={{
            organization_name: 'Travelers Inc',
            description:
              'Travelers Inc is a travel agency that provides the best travel experience for its customers.',
            website: ' https://www.travelersinc.com',
            contact_email: 'contact@travelersInc.com',
            phone_number: '1234567890',
            name: 'John Doe',
            email: 'John Doe',
            password: '12345678',
            confirmPassword: '12345678',
            address: '12 th Street, New York, NY, USA',
          }}
          //   validationSchema={validationSchema}
          onSubmit={handleSubmit}>
          {({ handleChange, handleBlur, values, touched, errors }) => (
            <Form>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    name="organization_name"
                    variant="outlined"
                    label="Organization Name"
                    fullWidth
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.organization_name}
                    helperText={touched.organization_name && errors.organization_name}
                    error={touched.organization_name && Boolean(errors.organization_name)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    name="description"
                    label="Description"
                    multiline
                    rows={4}
                    variant="outlined"
                    fullWidth
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.description}
                    helperText={touched.description && errors.description}
                    error={touched.description && Boolean(errors.description)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    name="website"
                    label="Website"
                    variant="outlined"
                    fullWidth
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.website}
                    helperText={touched.website && errors.website}
                    error={touched.website && Boolean(errors.website)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Field
                    as={TextField}
                    name="contact_email"
                    label="Contact Email"
                    variant="outlined"
                    fullWidth
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.contact_email}
                    helperText={touched.contact_email && errors.contact_email}
                    error={touched.contact_email && Boolean(errors.contact_email)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Field
                    as={TextField}
                    name="phone_number"
                    label="Phone Number"
                    variant="outlined"
                    fullWidth
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.phone_number}
                    helperText={touched.phone_number && errors.phone_number}
                    error={touched.phone_number && Boolean(errors.phone_number)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    name="name"
                    label="Reperesentative Name"
                    variant="outlined"
                    fullWidth
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.name}
                    helperText={touched.name && errors.name}
                    error={touched.name && Boolean(errors.name)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    name="email"
                    label="Reperesentative Email"
                    variant="outlined"
                    fullWidth
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                    helperText={touched.email && errors.email}
                    error={touched.email && Boolean(errors.email)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    type="password"
                    name="password"
                    label="Password"
                    variant="outlined"
                    fullWidth
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                    helperText={touched.password && errors.password}
                    error={touched.password && Boolean(errors.password)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    type="password"
                    name="confirmPassword"
                    label="Confirm Password"
                    variant="outlined"
                    fullWidth
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.confirmPassword}
                    helperText={touched.confirmPassword && errors.confirmPassword}
                    error={touched.confirmPassword && Boolean(errors.confirmPassword)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    name="address"
                    label="Address"
                    variant="outlined"
                    fullWidth
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.address}
                    helperText={touched.address && errors.address}
                    error={touched.address && Boolean(errors.address)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}>
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </Paper>
    </Container>
  );
}

export default OrganizerRegistrationForm;
