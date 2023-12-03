import { Button, Typography } from '@material-ui/core';
import React from 'react';
import { PropTypes } from 'prop-types';
const SecondaryButton = ({ content, icon }) => {
  const IconComponent = icon;
  return (
    <Button
      color="secondary"
      style={{
        padding: '0.8em',
        borderRadius: '12px ',
        backgroundColor: '#F6F4FF',
        textTransform: 'none',
        '&:active': {
          border: '1px primary solid',
        },
      }}>
      <Typography variant="body1" color="primary">
        {content}
      </Typography>
      <IconComponent />
    </Button>
  );
};
SecondaryButton.propTypes = {
  content: PropTypes.string.isRequired,
  icon: PropTypes.element.isRequired,
};

export default SecondaryButton;
