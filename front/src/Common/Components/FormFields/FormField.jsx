import React from 'react';
import classNames from 'classnames';
import { Input } from 'semantic-ui-react';
// import { Input } from 'reactstrap';

import ValidationMessage from './ValidationMessage/ValidationMessage';

import './FormFields.scss';

const updatePropsForRadioAndCheckbox = ({
	inputProps,
	input,
	currentValue,
	touched,
	error,
}) => {
	const retVal = { ...inputProps };

	if (input.checked !== undefined) {
		retVal.error = touched && error;
	}

	if (currentValue !== undefined) {
		retVal.value = currentValue;
	}

	return retVal;
};

export default ({ input, currentValue, labelText, labelIcon, isOptional, required, meta: { touched, warning, error }, as: As = Input, ...props}) => {
	const handleChange = (e) => {
		input.onChange(e);
	};

	// const handleChange = (e, data) => {
	// 	input.onChange(data ? data.value : !input.checked);
	// };

	const handleBlur = (e, data) => {
		if (data) {
			input.onBlur(data.value);
		}
	};

	let inputProps = {
		...input,
		...props,
		value: input.value,
		onChange: handleChange,
		onBlur: handleBlur,
	};

	inputProps = updatePropsForRadioAndCheckbox({
		inputProps,
		touched,
		error,
		input,
		currentValue,
	});

	const doShowError = touched && error;
	return (
		<div
			className={classNames({
				'form-field': true,
				'form-field--error': doShowError,
			})}
		>
			{labelIcon && <span className="mr-2">{labelIcon}</span>}{labelText && <label className="form-field__label">{labelText}</label>}
			{isOptional && <span className="form-field__span">(optional)</span>}
			{required && <span className="form-field__red_span"> *</span>}
			<As {...inputProps} />
			{touched
			&& ((error && <ValidationMessage>{error}</ValidationMessage>)
				|| (warning && <ValidationMessage>{warning}</ValidationMessage>))}
		</div>
	);
};
