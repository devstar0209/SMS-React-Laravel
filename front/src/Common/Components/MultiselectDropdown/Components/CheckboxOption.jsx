import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Checkbox } from '../..';

class CheckboxOption extends PureComponent {
	render() {
		const {
			children,
			isSelected,
			innerProps,
			value,
		} = this.props;
		return (
			<div
				{...innerProps}
				className={value ? 'multiselect__option' : 'multiselect__select-all-option'}
			>
				<Checkbox readOnly type="checkbox" checked={value ? isSelected : children === 'Deselect all'} />
				{children}
			</div>
		);
	}
}

CheckboxOption.propTypes = {
	children: PropTypes.node,
};

export default CheckboxOption;
