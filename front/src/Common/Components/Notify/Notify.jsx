import React from 'react';
import { toast } from 'react-toastify';

import './Notify.scss';
import Icon from '../Icon/Icon';

export default ({
	message,
	type,
	hasActionLink = false,
	actionLinkText,
	onActionLinkClick,
}) => (
	<div className="notify">
		<div className="notify__type-indication">
			{type === toast.TYPE.SUCCESS && <Icon className="icon-checkmark-circle-2-outline icon--green" />}
			{type === toast.TYPE.WARNING && <Icon className="icon-alert-triangle-outline icon--orange" />}
			{type === toast.TYPE.ERROR && <Icon className="icon-alert-circle-outline icon--red" />}
		</div>
		<div className="notify__content">
			<p className="notify-message">{message}</p>
			{hasActionLink && (
				<a
					className="notify__action-link"
					onClick={onActionLinkClick}
					onKeyPress={onActionLinkClick}
				>
					{actionLinkText}
				</a>
			)}
		</div>
	</div>
);
