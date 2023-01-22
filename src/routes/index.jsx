import React from 'react';
import { Switch } from 'react-router-dom';

import MyRoute from './myRoute';
import Register from '../pages/Register';
import Login from '../pages/Login';
import Page404 from '../pages/Page404';
import Home from '../pages/Home';

export default function Routes() {
  return (
    <Switch>
      <MyRoute path="/" component={Home} exact />
      <MyRoute path="/cadastro/" component={Register} exact />
      <MyRoute path="/login/" component={Login} exact />
      <MyRoute path="*" component={Page404} />
    </Switch>
  );
}
