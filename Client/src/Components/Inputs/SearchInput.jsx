import React from 'react';
import useStyles from './styles.js';
import { Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
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
SearchInput.propTypes = {
  value: PropTypes.string.isRequired,
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  Icon: PropTypes.elementType,
};

export default SearchInput;
