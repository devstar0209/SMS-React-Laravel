import React from 'react';
import classNames from 'classnames';
import { FadeLoader } from 'react-spinners';

import './Loader.scss';

export default ({ className, color, size, ...props }) => (
	<div className={ classNames('loader', className)}>
		<FadeLoader color={color} size={size} {...props} />
	</div>
);
