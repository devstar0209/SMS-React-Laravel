import classNames from 'classnames';
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import './Icon.scss';

class Icon extends PureComponent {
	render() {
		return (
			<span
				onClick={this.props.onClick}
				className={classNames(`avail__icon ${this.props.className}`)}
			/>
		);
	}
}

Icon.defaultProps = {
	onClick: () => {},
	className: '',
};

Icon.propTypes = {
	onClick: PropTypes.func,
	className: PropTypes.string,
};

export default Icon;
