import React from 'react';
import { Switch } from 'react-router-dom';

import MyRoute from './myRoute';
import Register from '../pages/Register';
import AdminRegister from '../pages/AdminRegister';
import AdminLogin from '../pages/AdminLogin';
import AdminDashboard from '../pages/AdminDashboard';
import Login from '../pages/Login';
import Page404 from '../pages/Page404';
import Home from '../pages/Home';
import ProductRegister from '../pages/ProductRegister';
import ProductList from '../pages/ProductList';

export default function Routes() {
  return (
    <Switch>
      <MyRoute path="/" component={Home} exact />
      <MyRoute path="/cadastro/" component={Register} exact />
      <MyRoute path="/login/" component={Login} exact />
      <MyRoute
        path="/administrativo/cadastro"
        component={AdminRegister}
        exact
      />
      <MyRoute path="/administrativo/login" component={AdminLogin} exact />
      <MyRoute
        path="/administrativo/dashboard"
        component={AdminDashboard}
        exact
        isAdminClosed
      />
      <MyRoute
        path="/administrativo/produto/cadastro/"
        component={ProductRegister}
        exact
        isAdminClosed
      />
      <MyRoute
        path="/administrativo/produto/listagem"
        component={ProductList}
        exact
        isAdminClosed
      />
      <MyRoute path="*" component={Page404} />
    </Switch>
  );
}
