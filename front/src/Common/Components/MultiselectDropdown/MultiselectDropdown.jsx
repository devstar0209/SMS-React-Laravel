import React, { PureComponent } from 'react';
import Select from 'react-select';
import classNames from 'classnames';
import CheckboxOption from './Components/CheckboxOption';

import './MultiselectDropdown.scss';
import ValidationMessage from '../FormFields/ValidationMessage/ValidationMessage';

class MultiselectDropdown extends PureComponent {
	state = {
		allOption: {
			label: 'Select all',
			value: null,
		},
	};

	onSelectChange = (selectedValues, isAllSelected) => {
		if (isAllSelected) {
			this.setState({
				allOption: {
					label: 'Deselect all',
					value: null,
				},
			});
		} else {
			this.setState({
				allOption: {
					label: 'Select all',
					value: null,
				},
			});
		}
		const values = this.props.defaultValue ? [this.props.defaultValue] : [];
		selectedValues.forEach(value => values.push(value.value));
		this.props.input.onChange(values);
	};

	onChange = (selected, event) => {
		const isSelectAllClicked = selected.length - 1 === this.props.options.length && event.option.value === this.props.allOption.value;
		const isDeselectAllClicked = selected !== null && selected.length > 0 && selected[selected.length - 1].value === this.props.allOption.value;

		if (isSelectAllClicked) {
			const isAllSelected = false;
			return this.onSelectChange([], isAllSelected);
		} else if (isDeselectAllClicked) {
			const isAllSelected = true;
			return this.onSelectChange(this.props.options, isAllSelected);
		}

		return this.onSelectChange(selected);
	};

	setInitialValue = (initialValues, options) => (
		options.filter(option => (
			initialValues.includes(option.value)
		))
	);

	multiValueContainer = ({ data }) => (
		`${data.label}, `
	);

	customStyles = {
		valueContainer: provided => ({
			...provided,
			textOverflow: 'ellipsis',
			maxWidth: '90%',
			whiteSpace: 'nowrap',
			overflow: 'hidden',
			display: 'initial',
		}),
		control: provided => ({
			...provided,
			boxShadow: '1px solid #0097E9',
			borderRadius: '2px',
		}),
	};

	render() {
		const { options, placeholder, labelText, required, defaultValue, input, meta: { touched, error, warning } } = this.props;

		const doShowError = touched && error;

		const { allOption } = this.state;
		return (
			<div
				className={classNames({
					'form-field': true,
					'form-field--error': doShowError,
				})}
			>
				{labelText && <label className="form-field__label">{labelText}</label>}
				{required && <span className="form-field__red_span"> *</span>}
				<Select
					isMulti
					closeMenuOnSelect={false}
					backspaceRemovesValue={false}
					components={{
						Option: CheckboxOption,
						MultiValueContainer: this.multiValueContainer,
						IndicatorSeparator: null,
					}}
					classNamePrefix="react-select"
					hideSelectedOptions={false}
					isClearable={false}
					onChange={this.onChange}
					options={[allOption, ...options]}
					placeholder={placeholder}
					styles={this.customStyles}
					tabSelectsValue={false}
					value={defaultValue ? this.setInitialValue([this.props.defaultValue, ...this.props.input.value], options) :
						this.setInitialValue(this.props.input.value, options)}
				/>
				{touched
				&& ((error && <ValidationMessage>{error}</ValidationMessage>)
					|| (warning && <ValidationMessage>{warning}</ValidationMessage>))}
			</div>
		);
	}
}

MultiselectDropdown.defaultProps = {
	allOption: {
		label: 'Select all',
		value: null,
	},
};
export default MultiselectDropdown;
