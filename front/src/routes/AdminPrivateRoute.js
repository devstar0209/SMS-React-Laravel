import React from 'react';
import { Route, Redirect, withRouter } from 'react-router-dom';

import {
    userSessionService,
	securityService,
} from '../Common/Services';

const AdminPrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
         securityService.getToken() && userSessionService.getUserGrade() === 0
            ? <Component {...props} />
            : <Redirect to={{pathname: '/back/login', state: { from: props.location } }} />
    )} />
)

export default AdminPrivateRoute