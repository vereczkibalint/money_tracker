import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, authUser, ...rest }) => (
  <Route
    {...rest}
    render={props => (
      authUser
        ? <Component {...props} />
        : <Redirect to="/login" />
    )}
  />
);

export default PrivateRoute;