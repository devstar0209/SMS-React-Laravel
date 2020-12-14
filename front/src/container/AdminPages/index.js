import React, {Fragment} from 'react';
import { connect } from 'react-redux';
import {withRouter} from 'react-router-dom'
import { ToastContainer } from 'react-toastify';

import AdminRoutes from '../../routes/AdminRoutes';
import {AppContainer} from '../../Layout/AppContainer'

import { logoutAction } from '../Auth/authactions';

class AdminPages extends React.Component {
  constructor(props) {
    super(props);

  }

    render() {
        return (
        <Fragment>
          <ToastContainer
            position="top-right"
            type="default"
            autoClose={5000}
            hideProgressBar
            newestOnTop={false}
            closeOnClick
            pauseOnHover
          />
            <AppContainer logout={this.props.logout} className="admin-page">
                <AdminRoutes />
            </AppContainer>
        </Fragment> 
        );
    }
}

const mapDispatchToProps = dispatch => ({
	logout: () => dispatch(logoutAction()),
});

export default withRouter(connect(null, mapDispatchToProps)(AdminPages));