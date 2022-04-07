import React from 'react';

import { Route, Navigate } from 'react-router-dom';

export const PublicRoute = ({ isAuthenticated, element: Element, ...rest }) => {
  return (
    <Route
      {...rest}
      element={(props) =>
        isAuthenticated ? <Navigate to='/' /> : <Element {...props} />
      }
    />
  );
};
