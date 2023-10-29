import * as React from 'react';
const CalendarSmall = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="none" {...props}>
    <path
      fill="#979797"
      d="M11.333 2.667H14a.667.667 0 0 1 .667.666V14a.667.667 0 0 1-.667.667H2A.667.667 0 0 1 1.333 14V3.333A.667.667 0 0 1 2 2.667h2.667V1.333H6v1.334h4V1.333h1.333v1.334Zm2 5.333H2.667v5.333h10.666V8ZM10 4H6v1.333H4.667V4h-2v2.667h10.666V4h-2v1.333H10V4ZM4 9.333h1.333v1.334H4V9.333Zm3.333 0h1.334v1.334H7.333V9.333Zm3.334 0H12v1.334h-1.333V9.333Z"
    />
  </svg>
);
export default CalendarSmall;
