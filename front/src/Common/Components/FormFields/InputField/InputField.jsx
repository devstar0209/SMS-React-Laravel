import React from 'react';
import classNames from 'classnames';
import { Field } from 'redux-form';
import { Input } from 'semantic-ui-react';

import FormField from '../FormField';

import '../FormFields.scss';

export default ({
	className,
	icon,
	...props
}) => (
		<Field
			component={FormField}
			as={Input}
			{...props}
			icon ={icon}
			className={classNames({
				'form-field__text-input': true,
				[className]: className,
			})}
		/>
);
