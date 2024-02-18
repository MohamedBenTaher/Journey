import { Grid, Typography, Button } from '@material-ui/core';
import React from 'react';
import Alert from '@mui/material/Alert';
import { Link } from 'react-router-dom';
import memories from '../../Images/journey.png';
import useStyles from './styles.js';
import logoDark from '../../assets/images/logoDark.png';
import Mail from '../../assets/icons/Mail.jsx';
import ArrowRight from '../../assets/icons/ArrowRight.jsx';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';
import { PropTypes } from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { showAlert, hideAlert } from '../../actions/alert.js';

function Footer() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').optional(),
  });

  const initialValues = {
    email: '',
  };

  const CustomInputComponent = ({ field, form, ...props }) => (
    <div
      style={{
        width: 300,
        height: 72,
        paddingLeft: 16,
        background: 'white',
        borderRadius: 12,
        justifyContent: 'space-between',
        alignItems: 'center',
        // gap: 16,

        display: 'flex',
      }}>
      <Mail />
      <input
        {...field}
        {...props}
        style={{
          width: 250,
          height: 72,
          padding: 16,
          background: 'white',
          '$:focus': {
            outline: 'none',
            border: 'none',
          },
          borderRadius: 12,
          border: '1px solid white',
        }}
      />
    </div>
  );
  CustomInputComponent.propTypes = {
    field: PropTypes.object,
    form: PropTypes.object,
  };
  return (
    <footer className={classes.container}>
      <Grid
        style={{
          height: 404,
          paddingTop: 120,
          paddingBottom: 120,
          paddingLeft: 50,
          paddingRight: 50,
          display: 'inline-flex',
          flexDirection: 'row',
          justifyContent: 'start',
          alignItems: 'start',
          // width: '100%',
          flexWrap: 'no-wrap',
          background: '#F9F9F9',
        }}>
        <Grid item container className={classes.Brand}>
          <img src={logoDark} alt="2rism" className={classes.image} />
          <Typography variant="body1" className={classes.text}>
            Travelling is not always about running away from things, sometimes it&apos;s about
            running to what you truly want,here at journey we offer a great touring guide
            experience, with a large and supportive community
          </Typography>
        </Grid>
        <Grid item container className={classes.links}>
          <div
            style={{
              width: 505.5,
              height: 164,
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              gap: 64,
              display: 'inline-flex',
            }}>
            <div
              style={{
                flexDirection: 'column',
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
                gap: 20,
                display: 'inline-flex',
              }}>
              <div
                style={{
                  width: 119.32,
                  color: '#161414',
                  fontSize: 18,
                  fontFamily: 'Poppins',
                  fontWeight: '500',
                  wordWrap: 'break-word',
                }}>
                About
              </div>
              <div
                style={{
                  flexDirection: 'column',
                  justifyContent: 'flex-start',
                  alignItems: 'flex-start',
                  gap: 12,
                  display: 'flex',
                }}>
                <a
                  href="/about"
                  style={{
                    width: 125.83,
                    color: '#979797',
                    fontSize: 14,
                    fontFamily: 'Poppins',
                    fontWeight: '400',
                    textDecoration: 'none',
                    wordWrap: 'break-word',
                  }}>
                  About Us
                </a>
                <a
                  href="/features"
                  style={{
                    width: 123.66,
                    color: '#979797',
                    textDecoration: 'none',
                    fontSize: 14,
                    fontFamily: 'Poppins',
                    fontWeight: '400',
                    wordWrap: 'break-word',
                  }}>
                  Features
                </a>
                <a
                  href="/news"
                  style={{
                    width: 75.93,
                    color: '#979797',
                    fontSize: 14,
                    fontFamily: 'Poppins',
                    fontWeight: '400',
                    textDecoration: 'none',
                    wordWrap: 'break-word',
                  }}>
                  News
                </a>
                <div
                  style={{
                    width: 78.1,
                    color: '#979797',
                    fontSize: 14,
                    fontFamily: 'Poppins',
                    fontWeight: '400',

                    wordWrap: 'break-word',
                  }}>
                  Menu
                </div>
              </div>
            </div>
            <div
              style={{
                flexDirection: 'column',
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
                gap: 20,
                display: 'inline-flex',
              }}>
              <div
                style={{
                  width: 115.66,
                  color: '#161414',
                  fontSize: 18,
                  fontFamily: 'Poppins',
                  fontWeight: '500',
                  wordWrap: 'break-word',
                }}>
                Company
              </div>
              <div
                style={{
                  flexDirection: 'column',
                  justifyContent: 'flex-start',
                  alignItems: 'flex-start',
                  gap: 12,
                  display: 'flex',
                }}>
                <div
                  style={{
                    width: 86.43,
                    color: '#979797',
                    fontSize: 14,
                    fontFamily: 'Poppins',
                    fontWeight: '400',

                    wordWrap: 'break-word',
                  }}>
                  Why 2rism
                </div>
                <div
                  style={{
                    width: 125.83,
                    color: '#979797',
                    fontSize: 14,
                    fontFamily: 'Poppins',
                    fontWeight: '400',

                    wordWrap: 'break-word',
                  }}>
                  Partner With Us
                </div>
                <div
                  style={{
                    width: 33.05,
                    color: '#979797',
                    fontSize: 14,
                    fontFamily: 'Poppins',
                    fontWeight: '400',

                    wordWrap: 'break-word',
                  }}>
                  FAQ
                </div>
                <div
                  style={{
                    width: 36.86,
                    color: '#979797',
                    fontSize: 14,
                    fontFamily: 'Poppins',
                    fontWeight: '400',

                    wordWrap: 'break-word',
                  }}>
                  Blog
                </div>
              </div>
            </div>
            <div
              style={{
                flexDirection: 'column',
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
                gap: 20,
                display: 'inline-flex',
              }}>
              <div
                style={{
                  width: 92.79,
                  color: '#161414',
                  fontSize: 18,
                  fontFamily: 'Poppins',
                  fontWeight: '500',
                  wordWrap: 'break-word',
                }}>
                Support
              </div>
              <div
                style={{
                  flexDirection: 'column',
                  justifyContent: 'flex-start',
                  alignItems: 'flex-start',
                  gap: 12,
                  display: 'flex',
                }}>
                <div
                  style={{
                    width: 69.91,
                    color: '#979797',
                    fontSize: 14,
                    fontFamily: 'Poppins',
                    fontWeight: '400',

                    wordWrap: 'break-word',
                  }}>
                  Account
                </div>
                <div
                  style={{
                    width: 125.83,
                    color: '#979797',
                    fontSize: 14,
                    fontFamily: 'Poppins',
                    fontWeight: '400',

                    wordWrap: 'break-word',
                  }}>
                  Support Center
                </div>
                <div
                  style={{
                    width: 81.35,
                    color: '#979797',
                    fontSize: 14,
                    fontFamily: 'Poppins',
                    fontWeight: '400',

                    wordWrap: 'break-word',
                  }}>
                  Feedback
                </div>
                <div
                  style={{
                    width: 91.52,
                    color: '#979797',
                    fontSize: 14,
                    fontFamily: 'Poppins',
                    fontWeight: '400',

                    wordWrap: 'break-word',
                  }}>
                  Contact Us
                </div>
              </div>
            </div>
          </div>

          <div
            style={{
              height: 148,
              flexDirection: 'column',
              justifyContent: 'flex-start',
              alignItems: 'flex-start',
              flexWrap: 'no-wrap',
              gap: 30,
              display: 'inline-flex',
              width: '70%',
            }}>
            <div
              style={{
                alignSelf: 'stretch',
                color: '#161414',
                fontSize: 18,
                fontFamily: 'Poppins',
                fontWeight: '500',
                wordWrap: 'break-word',
              }}>
              Subscribe on our destination review newsletters
            </div>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={(values) => {
                console.log(values);
                dispatch(
                  showAlert(
                    'Email has been submitted,welcome to the 2rism newsletter !',
                    'warning',
                  ),
                );
              }}>
              {({ errors, touched }) => (
                <Form
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'start',
                    padding: 0,
                  }}>
                  <div
                    style={{
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                      gap: 16,
                      display: 'inline-flex',
                    }}>
                    <div
                      style={{
                        alignSelf: 'stretch',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'flex-start',
                        display: 'inline-flex',
                      }}>
                      <Field
                        name="email"
                        type="email"
                        placeholder="Your Email ..."
                        component={CustomInputComponent}
                      />
                    </div>
                    {/* </div> */}
                    <Button
                      type="submit"
                      style={{
                        padding: 24,
                        background: '#7B61FF',
                        borderRadius: 12,
                        justifyContent: 'center',
                        alignItems: 'center',
                        gap: 8,
                        display: 'flex',
                      }}>
                      <div
                        style={{
                          width: 24,
                          height: 24,
                          position: 'relative',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}>
                        <ArrowRight color={'white'} size={30} />
                      </div>
                    </Button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </Grid>
      </Grid>
    </footer>
  );
}

export default Footer;
