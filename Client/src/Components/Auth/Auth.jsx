import React, { useState } from 'react';
import UserSignInForm from './Customer/UserSignIn';
import CustomerSignUpForm from './Customer/UserSignUp';
import OrganizerSignUpForm from './Organizer/OrganizerSignUp';
import { Button, Grid, Box } from '@material-ui/core';
import { ToggleButtonGroup, ToggleButton } from '@mui/material';

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
    <div>
      <h1>Auth</h1>
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

      <Grid container justifyContent="flex-end">
        <Grid item>
          <Button onClick={() => setFormToShow('customerSignUp')}>
            Don&apos;t Have An Account ? Sign Up
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}

export default Auth;
