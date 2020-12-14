import React from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'semantic-ui-react';
// import { Modal } from 'reactstrap';
import { Button, Icon } from '..';

import './Modal.scss';

export class ModalComponent extends React.PureComponent {
	render() {
		const {
			children,
			open,
			onConfirm,
			onCancel,
			confirmText,
			style,
			elementRef,
			hasActionButtons,
			dimmerEffect,
			className,
			title,
		} = this.props;
		return (
			<Modal
				open={open}
				style={style}
				// ref={elementRef}
				// dimmer={dimmerEffect}
				// closeOnDocumentClick
				// closeOnDimmerClick
				onClose={onCancel}
				className={className}
			>
				{title && (
					<Modal.Header className="justify-content--center">
						<div className="modal__header-wrapper">
							<span>{title}</span>
							<Icon className="icon-close-outline icon--dark-blue" onClick={onCancel} />
						</div>
					</Modal.Header>
				)}
				<Modal.Content className="justify-content--center">
					<div className="modal__content-wrapper">
						{children}
						{
							hasActionButtons && (
								<div className="modal__action-buttons">
									<Button
										isGhost
										noBorder
										buttonSmall
										onClick={onCancel}
										label="Cancel"
									/>
									<Button
										isFull
										buttonSmall
										onClick={onConfirm}
										label={confirmText}
									/>
								</div>
							)}
					</div>
				</Modal.Content>
			</Modal>
		);
	}
}

ModalComponent.defaultProps = {
	hasActionButtons: true,
	dimmerEffect: 'blurring',
};

ModalComponent.propTypes = {
	hasActionButtons: PropTypes.bool,
	dimmerEffect: PropTypes.string,
};

export default ModalComponent;
