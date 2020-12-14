import React from 'react';
import { Route, Redirect, withRouter } from 'react-router-dom';

import {
    securityService,
    userSessionService
} from '../Common/Services';

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
         securityService.getToken() && userSessionService.getUserGrade() === 3
            ? <Component {...props} />
            : <Redirect to={{pathname: '/par/login', state: { from: props.location } }} />
    )} />
)

export default PrivateRoute