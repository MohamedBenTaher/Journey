import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ children, isAuthenticated, ...rest }) => {
  return (
    <Route
      {...rest}
      render={() => {
        return isAuthenticated ? children : <Redirect to="/auth" />;
      }}
    />
  );
};
export default PrivateRoute;
