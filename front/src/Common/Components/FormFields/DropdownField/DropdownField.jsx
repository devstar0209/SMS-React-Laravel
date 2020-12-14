import React from 'react';
import classNames from 'classnames';
import { Field } from 'redux-form';
import { Dropdown } from 'semantic-ui-react';
// import { Dropdown } from 'reactstrap';
import { Fields } from '../../index';
import FormField from '../FormField';

import '../FormFields.scss';

export default ({
	className,
	...props
}) => (
	<Field
		component={FormField}
		as={Dropdown}
		fluid
		// multiple
		search
		selection
		{...props}
		className={classNames({
			'form-field__multiple-dropdown': true,
			[className]: className,
		})}
	/>
);
