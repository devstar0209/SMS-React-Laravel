import React from 'react';
import { Button } from 'semantic-ui-react';
import classNames from 'classnames';

// import './Button.scss';

export default ({ type = 'button', className, onClick, isFull, isGhost, noBorder, buttonSmall, staticContext, label, ...props }) => (
	<Button
		className={classNames('button', className, {
			'button--full': isFull,
			'button--ghost': isGhost,
			'button--no-border': noBorder,
			'button--small': buttonSmall,
		})}
		onClick={onClick}
		disabled={props.disabled}
		type={type}
		{...props}
	>
		{label}
	</Button>
);
