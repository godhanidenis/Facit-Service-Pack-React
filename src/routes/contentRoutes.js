import React, { lazy } from 'react';

const LANDING = {
	USERS: lazy(() => import('../pages/users/users')),
	SOPS: lazy(() => import('../pages/users/Sops/addSubSops')),
	TAGGING: lazy(() => import('../pages/users/Sops/AddSubSopsTagging')),
	MINMAX: lazy(() => import('../pages/users/Sops/MinMax')),
};

const presentation = [
	{
		path: 'users/*',
		element: <LANDING.USERS />,
		exact: true,
	},
	{
		// path: 'addSop',
		// element: <LANDING.SOPS />,
		// path: 'tag',
		// element: <LANDING.TAGGING />,
		path: 'minmax',
		element: <LANDING.MINMAX />,
		exact: true,
	},
];
const contents = [...presentation];

export default contents;
