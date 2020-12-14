import React from 'react';

import './ValidationMessage.scss';

export default ({ children }) => (
	<div className="validation-message" title={children}>
		<span className="validation-message__span">{children}</span>
	</div>
);
