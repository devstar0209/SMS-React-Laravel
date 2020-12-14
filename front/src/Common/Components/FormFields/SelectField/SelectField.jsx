import React from 'react';
import classNames from 'classnames';
import { Field } from 'redux-form';
// import { Select } from 'semantic-ui-react';
import Select from 'react-select';
import FormField from '../FormField';


import '../FormFields.scss';

export default ({
	className,
	...props
}) => (
	<Field
		component={FormField}
		as={Select}
		search
		clearable
		{...props}
		className={classNames({
			'form-field__select': true,
			[className]: className,
		})}
	/>
);
