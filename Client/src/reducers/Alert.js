import { SHOW_ALERT, HIDE_ALERT } from '../constants/actionTypes';

const initialState = {
  message: null,
  alertType: null,
};
const alertReducer = (state = initialState, action) => {
  switch (action.type) {
    case SHOW_ALERT:
      return {
        message: action.payload.message,
        alertType: action.payload.alertType,
      };
    case HIDE_ALERT:
      return initialState;
    default:
      return state;
  }
};
export default alertReducer;
