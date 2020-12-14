import React, {Fragment} from 'react';
import { connect } from 'react-redux';
import {withRouter} from 'react-router-dom'
import {ToastContainer} from 'react-toastify'

import {AppContainer} from '../../Layout/AppContainer'
import PagesRoutes from '../../routes/PagesRoutes';

import { logoutAction } from '../Auth/authactions';

class TeacherPages extends React.Component {
  constructor(props) {
    super(props);

    const { dispatch } = this.props;

   
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
            <AppContainer logout={this.props.logout}>
                <PagesRoutes />
            </AppContainer>
        </Fragment> 
        );
    }
}

const mapDispatchToProps = dispatch => ({
	logout: () => dispatch(logoutAction()),
});

export default withRouter(connect(null, mapDispatchToProps)(TeacherPages));