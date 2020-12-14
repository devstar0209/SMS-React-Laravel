import React from 'react';
import classNames from 'classnames';
import { Field } from 'redux-form';
import Checkbox from '../../Checkbox/Checkbox';
import FormField from '../FormField';

import '../FormFields.scss';

export default ({
	className,
	...props
}) => (
	<Field
		component={FormField}
		as={Checkbox}
		type="checkbox"
		{...props}
		className={classNames({
			'av-checkbox': true,
			[className]: className,
		})}
	/>
);
