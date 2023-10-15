import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ children, ...rest }) => {
  const isLoggedIn = rest.isLoggedIn;
  return (
    <Route
      {...rest}
      render={() => {
        return isLoggedIn ? children : <Redirect to="/auth" />;
      }}
    />
  );
};
export default PrivateRoute;
