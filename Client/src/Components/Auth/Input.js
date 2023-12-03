import React from 'react';
import { TextField, Grid, InputAdornment, IconButton } from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import PropTypes from 'prop-types';
function Input({ half, name, label, onChange, autoFocus, type, handleShowPassword, handleChange }) {
  return (
    <Grid item xs={12} sm={half ? 6 : 12}>
      <TextField
        variant="outlined"
        name={name}
        label={label}
        onChange={handleChange}
        fullWidth
        required
        autoFocus={autoFocus}
        type={type}
        InputProps={
          name === 'password'
            ? {
                endAdornment: (
                  <InputAdornment>
                    <IconButton onClick={handleShowPassword}>
                      {type === 'password' ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }
            : null
        }
      />
    </Grid>
  );
}

Input.propTypes = {
  half: PropTypes.bool,
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  autoFocus: PropTypes.bool,
  type: PropTypes.string.isRequired,
  handleShowPassword: PropTypes.func,
  onChange: PropTypes.func,
};

Input.defaultProps = {
  half: false,
  autoFocus: false,
  handleShowPassword: null,
  onChange: null,
};

export default Input;
