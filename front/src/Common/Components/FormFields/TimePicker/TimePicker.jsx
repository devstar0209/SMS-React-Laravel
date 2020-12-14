import React from 'react';
import DatePicker from 'react-datepicker';
import classNames from 'classnames';

import {faClock} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

import { Field } from 'redux-form';
import FormField from '../FormField';


import '../FormFields.scss';
import './timepicker.scss';

export default ({
	className,
	...props
}) => (
	<div className="form-timepicker">
		<Field
			component={FormField}
			as={DatePicker}
			labelIcon={<FontAwesomeIcon icon={faClock}/>}
			showTimeSelect
			showTimeSelectOnly
			timeIntervals={15}
			timeCaption="Time"
			dateFormat="hh:mm aa"
			{...props}
			className={classNames({
				'form-field__timepicker': true,
				[className]: className,
			})}
		/>
	</div>
);