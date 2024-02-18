import * as React from 'react';
import { PropTypes } from 'prop-types';

const ArrowRight = (props) => {
  const { color, size } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size || 20}
      height={size || 20}
      viewBox="0 0 20 20"
      fill="none"
      style={{ display: 'block', margin: 'auto' }} // Add this line
      {...props}>
      <path
        fill={color || '#7B61FF'}
        d="m13.477 9.167-4.47-4.47 1.178-1.179L16.667 10l-6.482 6.482-1.178-1.179 4.47-4.47H3.333V9.167h10.144Z"
      />
    </svg>
  );
};

ArrowRight.propTypes = {
  color: PropTypes.string,
  size: PropTypes.number,
};

export default ArrowRight;
