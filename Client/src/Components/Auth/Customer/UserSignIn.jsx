import React from 'react';
import { Avatar, Button, Paper, Typography, Container, Grid, TextField } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { GoogleLogin } from 'react-google-login';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Icon from '../Icon';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import useStyles from './styles';
import { signin, signUpCustomer } from '../../../actions/auth';

const validationSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string()
    .min(8, 'Password is too short - should be 8 chars minimum.')
    .required('Required'),
});

function UserSignIn() {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();

  const googleSuccess = async (res) => {
    const result = res?.profileObj;
    const token = res?.tokenId;
    try {
      dispatch({ type: 'AUTH', data: { result, token } });
      history.push('/');
    } catch (error) {
      console.log(error);
    }
  };

  const googleFailure = () => {
    console.log('Google Sign In Failed, Try Again Later');
  };

  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    console.log(values);
    dispatch(signin(values, history));
    setSubmitting(false);
    // resetForm();
  };

  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={6}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <h1>Sign In</h1>
        <Formik
          initialValues={{
            email: '',
            password: '',
          }}
          // validationSchema={validationSchema}
          onSubmit={handleSubmit}>
          {({ isSubmitting, handleChange, handleBlur, values, errors, touched }) => (
            <Form className={classes.form}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    type="email"
                    name="email"
                    label="Email Address"
                    variant="outlined"
                    fullWidth
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                    error={touched.email && Boolean(errors.email)}
                    helperText={touched.email && errors.email}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    type="password"
                    name="password"
                    label="Password"
                    variant="outlined"
                    fullWidth
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                    error={touched.password && Boolean(errors.password)}
                    helperText={touched.password && errors.password}
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                disabled={isSubmitting}>
                Sign Up
              </Button>
              <GoogleLogin
                clientId="515608838058-arhntpgkh6jhve3d361nch34vk1f68q3.apps.googleusercontent.com"
                render={(renderProps) => (
                  <Button
                    className={classes.googleButton}
                    color="primary"
                    onClick={renderProps.onClick}
                    disabled={renderProps.disabled}
                    startIcon={<Icon />}
                    variant="contained"
                    fullWidth>
                    Google Sign In
                  </Button>
                )}
                onSuccess={googleSuccess}
                onFailure={googleFailure}
              />
            </Form>
          )}
        </Formik>
        <Grid container justifyContent="flex-end">
          <Grid item>
            <Button onClick={() => history.push('/signin')}>
              Don&apos;t Have An Account ? Sign Up
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}

export default UserSignIn;
