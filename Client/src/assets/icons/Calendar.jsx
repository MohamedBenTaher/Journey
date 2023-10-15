import * as React from 'react';
const Calendar = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={25} height={24} fill="none" {...props}>
    <path
      fill="#FFA800"
      d="M17.667 3h4a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1h-18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h4V1h2v2h6V1h2v2Zm-13 6v10h16V9h-16Zm2 4h5v4h-5v-4Z"
    />
  </svg>
);
export default Calendar;
