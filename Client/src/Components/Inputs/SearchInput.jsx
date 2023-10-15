import React from 'react';
import useStyles from './styles.js';
import { Typography } from '@material-ui/core';
const SearchInput = ({ value, label, name, placeholder, type, onChange, Icon }) => {
  const classes = useStyles();
  return (
    <div className={classes.InputWrapper}>
      <div className={classes.inputIcon}>{Icon ? <Icon /> : null}</div>
      <div className={classes.InputField}>
        {label && (
          <Typography className={classes.Label} htmlFor="input-field">
            {label}
          </Typography>
        )}
        <input
          type={type}
          value={value}
          name={name}
          placeholder={placeholder}
          className={`${classes.inputText} ${classes.placeholderText}`}
          onChange={onChange}
        />
      </div>
    </div>
  );
};

export default SearchInput;
