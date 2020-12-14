import React from 'react';

import './Checkbox.scss';

export default class CheckboxInput extends React.PureComponent {
	// handleChange = (e) => {
	// 	this.props.onChangeHandler(e, this.props.name);
	// };

	render() {
		const { error, label, name, isDisabled, isChecked, onChange, ...props } = this.props;

		return (
			<div>
				<input
					name={name}
					className="av-checkbox"
					id={name}
					type="checkbox"
					disabled={isDisabled}
					checked={isChecked || false}
					onChange={onChange}
					{...props}
				/>
				<label htmlFor={name}>{label}</label>
			</div>
		);
	}
}
