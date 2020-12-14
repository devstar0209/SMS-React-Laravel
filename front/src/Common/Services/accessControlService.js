import AccessControlList from '../Acl/AccessControlList';

class AccessControlService {
	static doesUserHaveAccess = (userRoles, action, context, data) => {
		const hasAccess = [];

		userRoles.forEach((userRole) => {
			const userPermission = AccessControlList[userRole];
			const staticPermissions = userPermission.static;
			if (staticPermissions && staticPermissions[action].includes(context)) {
				hasAccess.push(true);
			}

			const dynamicPermissions = userPermission.dynamic;
			if (dynamicPermissions && (dynamicPermissions[action] && data)) {
				const permissionCondition = dynamicPermissions[action][context];
				if (!permissionCondition) {
					return false;
				}
				hasAccess.push(permissionCondition(data));
			}
		});
		return hasAccess.includes(true);
	};
}

export default AccessControlService;
