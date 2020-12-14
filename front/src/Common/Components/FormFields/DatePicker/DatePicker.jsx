import React from 'react';
import DatePicker from 'react-datepicker';
import classNames from 'classnames';

import {faCalendarAlt} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

import { Field } from 'redux-form';
import FormField from '../FormField';


import '../FormFields.scss';
import './datepicker.scss';

export default ({
	className,
	icon,
	...props
}) => (
	<div className="form-datepicker">
		<Field
			component={FormField}
			as={DatePicker}
			labelIcon={<FontAwesomeIcon icon={faCalendarAlt}/>}
			showYearDropdown
			useShortMonthInDropdown
			{...props}
			dateFormat="dd/MM/yyyy"
			className={classNames({
				'form-field__datepicker': true,
				[className]: className,
			})}
		/>
	</div>
);