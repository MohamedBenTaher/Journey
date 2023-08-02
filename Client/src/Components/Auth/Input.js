import React from 'react';
import { TextField, Grid, InputAdornment, IconButton } from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
const Input = ({
  half,
  name,
  label,
  onChange,
  autoFocus,
  type,
  handleShowPassword,
  handleChange
}) => {
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
                )
              }
            : null
        }
      />
    </Grid>
  );
};

export default Input;
