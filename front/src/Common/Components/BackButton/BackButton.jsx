import React, { PureComponent } from 'react';
import { withRouter } from 'react-router-dom';
import Button from '../Button/Button';
import Icon from '../Icon/Icon';

import './BackButton.scss';

class BackButton extends PureComponent {
	goBack = () => this.props.history.goBack();

	render() {
		return (
			<Button
				className="back-button"
				onClick={this.goBack}
				type="button"
				{...this.props}
			>
				<Icon className="icon-chevron-left-outline back-button__icon icon--dark-blue" />
				<span>Back</span>
			</Button>
		);
	}
}

export default withRouter(BackButton);
