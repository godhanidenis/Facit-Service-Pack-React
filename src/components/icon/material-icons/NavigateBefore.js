import * as React from 'react';

function SvgNavigateBefore(props) {
	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			height='1em'
			viewBox='0 0 24 24'
			width='1em'
			className='svg-icon'
			{...props}>
			<path d='M0 0h24v24H0V0z' fill='none' />
			<path d='M14.2 6l-6 6 6 6 1.41-1.41L11.03 12l4.58-4.59z' />
		</svg>
	);
}

export default SvgNavigateBefore;
