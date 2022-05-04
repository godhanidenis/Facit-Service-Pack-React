import React, { lazy } from 'react';

const LANDING = {
	USERS: lazy(() => import('../pages/users/users')),
};

const presentation = [
	{
		path: 'users/*',
		element: <LANDING.USERS />,
		exact: true,
	},
];
const contents = [...presentation];

export default contents;
