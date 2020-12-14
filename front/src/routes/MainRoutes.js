import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import TeacherPages from '../container/TeacherPages';
import ParentPages from '../container/ParentPages';
import AdminPages from '../container/AdminPages';
import PlayerPages from '../container/PlayerPages';
import HomePage from '../container/Home/HomePage';
import { LoginPage, RegisterPage, ParentLoginPage, ParentRegisterPage, PlayerLoginPage, PlayerRegisterPage, AdminLoginPage, AdminRegisterPage } from '../container/Auth';
import PrivateRoute from './PrivateRoute';
import AdminPrivateRoute from './AdminPrivateRoute';
import ParentPrivateRoute from './ParentPrivateRoute';
import PlayerPrivateRoute from './PlayerPrivateRoute';
import EmptyPage from '../container/404';
import MembershipPage from "../container/PlayerPages/MembershipPage";

export default function MainRoutes() {
  return (
    
        <Switch>
          <Redirect exact from="/" to="/login" />
          <Redirect exact from="/back/login" to="/login" />
          <Redirect exact from="/par/login" to="/login" />
          <Redirect exact from="/pla/login" to="/login" />

          <AdminPrivateRoute path="/admin" component={AdminPages} />
          <Route path="/back/login" component={AdminLoginPage} />
          <Route path="/back/signup" component={AdminRegisterPage} />

          <ParentPrivateRoute path="/parent" component={ParentPages} />
          <Route path="/par/login" component={ParentLoginPage} />
          <Route path="/par/signup" component={ParentRegisterPage} />

          <PlayerPrivateRoute path="/player" component={PlayerPages} />
          <Route path="/pla/login" component={PlayerLoginPage} />
          <Route path="/pla/signup" component={PlayerRegisterPage} />
          <Route path="/pla/membership/:id" component={MembershipPage} />

          <PrivateRoute path="/page" component={TeacherPages} />
          <Route path="/home" component={HomePage} />
          <Route path="/login" component={LoginPage} />
          <Route path="/signup" component={RegisterPage} />
          <Route path="/notfound" component={EmptyPage} />
        </Switch>
      
  );
}