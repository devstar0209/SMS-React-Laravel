import React, {Fragment} from 'react';
import { connect } from 'react-redux';
import {withRouter} from 'react-router-dom'
import { ToastContainer } from 'react-toastify';

import PlayerRoutes from '../../routes/PlayerRoutes';
import {AppContainer} from '../../Layout/AppContainer'

import { logoutAction } from '../Auth/authactions';

// import './container.scss'

class PlayerPage extends React.Component {
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
                <PlayerRoutes />
            </AppContainer>
        </Fragment> 
        );
    }
}

const mapDispatchToProps = dispatch => ({
	logout: () => dispatch(logoutAction()),
});

export default withRouter(connect(null, mapDispatchToProps)(PlayerPage));