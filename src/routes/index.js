import React from 'react';
import { Switch } from 'react-router-dom';

import MyRoute from './myRoute';
import Login from '../pages/Login';
import Page404 from '../pages/Page404';

export default function Routes() {
  return (
    <Switch>
      <MyRoute path="/" component={Login} exact isClosed />
      <MyRoute path="*" component={Page404} />
    </Switch>
  );
}
