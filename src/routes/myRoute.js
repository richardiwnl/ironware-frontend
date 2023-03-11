import React from 'react';
import { useSelector } from 'react-redux';
import { isEmpty } from 'lodash';
import { Route, Redirect } from 'react-router-dom';
import propTypes from 'prop-types';

export default function MyRoute({
  component: Component,
  isClosed,
  isAdminClosed,
  ...rest
}) {
  const isLoggedIn = useSelector(state => state.auth.user);
  const isAdminLoggedIn = useSelector(state => state.auth.admin);
  if (isClosed && isEmpty(isLoggedIn)) {
    return (
      <Redirect
        to={{ pathname: '/login', state: { prevPath: rest.location.pathname } }}
      />
    );
  }

  if (isAdminClosed && isEmpty(isAdminLoggedIn)) {
    return (
      <Redirect
        to={{
          pathname: '/administrativo/login',
          state: { prevPath: rest.location.pathname },
        }}
      />
    );
  }

  // eslint-disable-next-line react/jsx-props-no-spreading
  return <Route component={Component} {...rest} />;
}

MyRoute.defaultProps = {
  isClosed: false,
  isAdminClosed: false,
};

MyRoute.propTypes = {
  component: propTypes.oneOfType([propTypes.element, propTypes.func])
    .isRequired,
  isClosed: propTypes.bool,
  isAdminClosed: propTypes.bool,
};
