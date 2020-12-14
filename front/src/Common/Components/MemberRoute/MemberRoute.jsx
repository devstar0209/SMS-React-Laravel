import React, { PureComponent } from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

class MemberRoute extends PureComponent {
	render() {
		const { component: Component, roles, currentUserRole, clickedUserRole, ...rest } = this.props;
		return (
			<Route
				{...rest}
				render={(props) => {
					if (roles && roles.indexOf(currentUserRole) === -1) {
						return (
							<Redirect
								to={{
									pathname: '/dashboard',
								}}
							/>
						);
					}
					return <Component {...props} />;
				}}
			/>
		);
	}
}

MemberRoute.propTypes = {
	roles: PropTypes.arrayOf(PropTypes.string),
	currentUserRole: PropTypes.string.isRequired,
};

export default MemberRoute;
