import jwtDecode from 'jwt-decode';

export const checkTokenValidity = (token) => {
  try {
    const decodedToken = jwtDecode(token);
    console.log('decoded token ',decodedToken)
    const currentTime = Date.now() / 1000;
    if (decodedToken.exp < currentTime) {
      return Promise.reject(new Error('Token has expired'));
    }
    return Promise.resolve(decodedToken);
  } catch (error) {
    return Promise.reject(error);
  }
};
