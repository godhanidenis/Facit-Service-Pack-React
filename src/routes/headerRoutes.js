import React from 'react';
// import Header from '../layout/Header/Header';
import DefaultHeader from '../pages/common/Headers/DefaultHeader';

const headers = [
	{
		path: `*`,
		element: <DefaultHeader />,
		// element: <Header />,
	},
];

export default headers;
