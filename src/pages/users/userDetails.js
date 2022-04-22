import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';

const UserDetails = () => {
	return (
		<div>
			<ul>
				<li>
					{/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
					<Link to=''>Details</Link>
				</li>
				<li>
					<Link to='teams'>Teams</Link>
				</li>
				<li>
					<Link to='sops'>Sops</Link>
				</li>
			</ul>
			<Routes>
				<Route path='' element={<UserDetail />} />
				<Route path='teams' element={<UserTeams />} />
				<Route path='sops' element={<UserSops />} />
			</Routes>
		</div>
	);
};

const UserDetail = () => {
	return <h2>User Details</h2>;
};

const UserSops = () => {
	return <h2>User Sops</h2>;
};
const UserTeams = () => {
	return <h1>Hello Teams</h1>;
};

export default UserDetails;
