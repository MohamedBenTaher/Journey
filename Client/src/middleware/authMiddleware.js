import { UNAUTHORIZED } from '../constants/httpStatusCodes';
import { signOut } from '../actions/auth';

const authMiddleware = (store) => (next) => (action) => {
  // Handle API response here
  if (action.error && action.payload.response.status === UNAUTHORIZED) {
    console.log('unauthorized user action')
    store.dispatch(signOut());
  }

  return next(action);
};

export default authMiddleware;
