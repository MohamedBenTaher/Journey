import React from 'react';
import { Formik, Field, Form } from 'formik';
import { TextField, Grid, Button, Container, Paper } from '@material-ui/core';
import useStyles from './styles';
import * as Yup from 'yup';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { signUpCustomer } from '../../../actions/auth';
const validationSchema = Yup.object().shape({
  firstName: Yup.string().required('Required'),
  lastName: Yup.string().required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string()
    .min(8, 'Password is too short - should be 8 chars minimum.')
    .required('Required'),
  confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match'),
  birthday: Yup.date().required('Required'),
  address: Yup.string(),
});

function UserSignUp() {
  const history = useHistory();
  const dispatch = useDispatch();
  const classes = useStyles();
  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    console.log(values);
    dispatch(signUpCustomer(values, history));
    setSubmitting(false);
    resetForm();
  };

  return (
    <Container component="main" maxWidth="sm">
      <Paper className={classes.SignUpPaper} elevation={6}>
        <h1>Sign Up</h1>
        <Formik
          initialValues={{
            firstName: 'Mohamed',
            lastName: 'Ben Taher',
            email: 'mbentaher@gmail.com',
            password: '12345678',
            confirmPassword: '12345678',
            birthday: new Date('1998-01-01'),
            address: 'Address Number 1 Street 1 City 1 Country 1',
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}>
          {({ handleChange, handleBlur, values }) => (
            <Form className={classes.SignUpForm}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <Field
                    as={TextField}
                    name="firstName"
                    label="First Name"
                    variant="outlined"
                    fullWidth
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.firstName}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Field
                    as={TextField}
                    name="lastName"
                    label="Last Name"
                    variant="outlined"
                    fullWidth
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.lastName}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    name="email"
                    label="Email"
                    variant="outlined"
                    fullWidth
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
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
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    type="date"
                    name="birthday"
                    label="Birthday"
                    variant="outlined"
                    fullWidth
                    InputLabelProps={{
                      shrink: true,
                    }}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.birthday}
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

export default UserSignUp;
