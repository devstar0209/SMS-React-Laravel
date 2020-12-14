import React from 'react';
import classNames from 'classnames';
import { Field } from 'redux-form';
import {Radio} from 'semantic-ui-react'
// import RadioButton from '../../RadioButton/RadioButton';
import FormField from '../FormField';

import '../FormFields.scss';

export default ({
	className,
	...props
}) => (
	<Field
		component={FormField}
		as={Radio}
		type="radio"
		{...props}
		className={classNames({
			[className]: className,
		})}
	/>
);
