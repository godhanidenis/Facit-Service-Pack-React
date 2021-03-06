import * as React from 'react';

function SvgHurricane(props) {
	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			width='1em'
			height='1em'
			fill='currentColor'
			className='svg-icon'
			viewBox='0 0 16 16'
			{...props}>
			<path d='M6.999 2.6A5.5 5.5 0 0115 7.5a.5.5 0 001 0 6.5 6.5 0 10-13 0 5 5 0 006.001 4.9A5.5 5.5 0 011 7.5a.5.5 0 00-1 0 6.5 6.5 0 1013 0 5 5 0 00-6.001-4.9zM10 7.5a2 2 0 11-4 0 2 2 0 014 0z' />
		</svg>
	);
}

export default SvgHurricane;
