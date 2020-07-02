import React from 'react';
import './backdrop.css';

const Backdrop = (props) => {
	return (
		<div className={'Backdrop'} onClick={props.close}>
			{props.children}
		</div>
		);
};

export default Backdrop;
