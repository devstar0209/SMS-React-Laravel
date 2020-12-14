import React, { PureComponent } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import { fourOFour } from '../../../Common/Assets/Images';
import { Button } from '..';

import './404Page.scss';
// import userTypes from '../../Constants/userTypes';
// import { getcurrentUserTypes } from '../../../Features/Home/HomeSelectors';

class FourOFourPage extends PureComponent {
	redirect = () => {
		// this.props.history.push(userTypes[this.props.currentUserTypes].redirectionRoute);
	}

	render() {
		return (
			<div className="four-o-four__container">
				<img className="four-o-four-img" src={fourOFour} alt="fourOFour" />
				{/*<img className="logo" src={logo} alt="logo" />*/}
				<div className="four-o-four__label">Uh oh, this link isn't working.</div>
				<Button
					isFull
					className="four-o-four__redirect-button"
					onClick={this.redirect}
				>
					Back to homepage
				</Button>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	// currentUserTypes: getcurrentUserTypes(state),
});

export default withRouter(connect(mapStateToProps, undefined)(FourOFourPage));
