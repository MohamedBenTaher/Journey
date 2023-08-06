import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ children, user, ...rest }) => {
  return (
    <Route
      {...rest}
      render={() => {
        return user ? children : <Redirect to="/auth" />;
      }}
    />
  );
};
export default PrivateRoute;
