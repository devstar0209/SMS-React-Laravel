import React from 'react';
import { toast } from 'react-toastify';
import { Notify } from '../Components';

class notificationService {
	static success(message, actionLinkText, onActionLinkClick) {
		this.notify(message, 'success', actionLinkText, onActionLinkClick);
	}

	static warning(message, actionLinkText, onActionLinkClick) {
		this.notify(message, 'warning', actionLinkText, onActionLinkClick);
	}

	static error(message, actionLinkText, onActionLinkClick) {
		this.notify(message, 'error', actionLinkText, onActionLinkClick);
	}

	static notify(message, type, actionLinkText, onActionLinkClick) {
		toast(
			// eslint-disable-next-line react/jsx-filename-extension
			<Notify
				message={message}
				type={type}
				hasActionLink={!!actionLinkText}
				actionLinkText={actionLinkText}
				onActionLinkClick={onActionLinkClick}
			/>,
			{
				className: `av-toast av-toast-${type}`,
				progressClassName: 'transparent-progress',
				type,
				autoClose: 3000,
			},
		);
	}
}

export default notificationService;
