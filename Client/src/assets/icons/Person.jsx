import * as React from 'react';
const Person = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="none" {...props}>
    <path
      fill="#979797"
      d="M2.667 14.667a5.333 5.333 0 0 1 10.666 0H12a4 4 0 0 0-8 0H2.667Zm5.333-6c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4Zm0-1.334A2.666 2.666 0 1 0 8 2a2.666 2.666 0 1 0 0 5.333Z"
    />
  </svg>
);
export default Person;
