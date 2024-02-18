import { SHOW_ALERT, HIDE_ALERT } from '../constants/actionTypes';
export const showAlert = (message, alertType) => ({
  type: SHOW_ALERT,
  payload: { message, alertType },
});

export const hideAlert = () => ({
  type: HIDE_ALERT,
});
