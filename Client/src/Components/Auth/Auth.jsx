import React, { useState } from 'react';
import UserSignInForm from './Customer/UserSignIn';
import CustomerSignUpForm from './Customer/UserSignUp';
import OrganizerSignUpForm from './Organizer/OrganizerSignUp';
import { Button, Grid, Box } from '@material-ui/core';
import { ToggleButtonGroup, ToggleButton } from '@mui/material';
import logoDark from '../../assets/images/logoDark.png';
function Auth() {
  const [formToShow, setFormToShow] = useState('signIn');
  const handleFormSwitch = (formName) => {
    setFormToShow(formName);
  };
  const forms = {
    signIn: <UserSignInForm switchForm={handleFormSwitch} />,
    customerSignUp: <CustomerSignUpForm switchForm={handleFormSwitch} />,
    organizerSignUp: <OrganizerSignUpForm switchForm={handleFormSwitch} />,
  };

  return (
    <div style={{ padding: '2em' }}>
      <img src={logoDark} alt="2rism" height={36} />
      <Box display="flex" justifyContent="center">
        {formToShow !== 'signIn' ? (
          <ToggleButtonGroup
            color="primary"
            value={formToShow}
            exclusive
            onChange={(event, newValue) => handleFormSwitch(newValue)}
            aria-label="Platform">
            <ToggleButton value="organizerSignUp" style={{ textTransform: 'none' }}>
              Organizer
            </ToggleButton>
            <ToggleButton value="customerSignUp" style={{ textTransform: 'none' }}>
              Traveler
            </ToggleButton>
          </ToggleButtonGroup>
        ) : null}
      </Box>
      <Grid container spacing={2}>
        {forms[formToShow]}
      </Grid>

      <Grid
        container
        justifyContent="center"
        style={{
          marginTop: '4em',
        }}>
        <Grid item>
          <Button
            onClick={() =>
              formToShow === 'signIn' ? setFormToShow('customerSignUp') : setFormToShow('signIn')
            }>
            {formToShow === 'signIn'
              ? "Don't Have An Account ? Sign Up"
              : 'Already Have An Account ? Sign In'}
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}

export default Auth;
