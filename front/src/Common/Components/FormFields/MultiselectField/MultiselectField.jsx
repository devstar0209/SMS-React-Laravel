import React from 'react';
import classNames from 'classnames';
import { Field } from 'redux-form';
import MultiselectDropdown from '../../MultiselectDropdown/MultiselectDropdown';

import '../FormFields.scss';

export default ({
	className,
	...props
}) => (
	<Field
		component={MultiselectDropdown}
		{...props}
		className={classNames({
			'form-field__select': true,
			[className]: className,
		})}
	/>
);
