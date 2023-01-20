import React from 'react';
import { Switch } from 'react-router-dom';

import MyRoute from './myRoute';
import Register from '../pages/Register';
import Page404 from '../pages/Page404';

export default function Routes() {
  return (
    <Switch>
      <MyRoute path="/cadastro/" component={Register} exact isClosed />
      <MyRoute path="*" component={Page404} />
    </Switch>
  );
}
