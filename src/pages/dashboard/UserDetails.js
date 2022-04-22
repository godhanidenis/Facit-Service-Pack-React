import React from 'react';
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Link,
	useParams,
	useMatch,
	useLocation,
	Outlet,
} from 'react-router-dom';

// import React, { useEffect, useState } from 'react';
// import Button from '../../components/bootstrap/Button';
// import Avatar from '../../components/Avatar';
// import Page from '../../layout/Page/Page';
// import PageWrapper from '../../layout/PageWrapper/PageWrapper';
// import Card, {
// 	CardActions,
// 	CardBody,
// 	CardHeader,
// 	CardLabel,
// 	CardSubTitle,
// 	CardTitle,
// } from '../../components/bootstrap/Card';
// import { Link, NavLink, useNavigate, useParams } from 'react-router-dom';
// import axios from 'axios';
// import Nav, { NavItem } from '../../components/bootstrap/Nav';
// import Teams from './Teams';

// const UserInfo = () => {
// 	const navigate = useNavigate();
// 	const { id } = useParams();
// 	const [selectedImage, setSelectedImage] = useState();
// 	const [userInfoData, setUserInfoData] = useState();

// 	useEffect(async () => {
// 		if (id) {
// 			const singleUser = await axios.get(`http://3.215.147.147/admin_panel/users/${id}`);

// 			await console.log('singleUser', singleUser);
// 			await setUserInfoData(singleUser.data.data);

// 			setSelectedImage(`http://3.215.147.147${singleUser.data.data.profile_picture}`);
// 		}
// 	}, [id]);
// 	const LIST_TAB = {
// 		EMPLOYEES: 'UserInfo',
// 		SERVICE: 'Teams',
// 		PACKAGE: 'Sops',
// 	};
// 	const [activeListTab, setActiveListTab] = useState(LIST_TAB.EMPLOYEES);
// 	const handleActiveListTab = (tabName) => {
// 		setActiveListTab(tabName);
// 	};
// 	const getStatusActiveListTabColor = (tabName) => {
// 		if (activeListTab === tabName) return 'success';
// 		return 'light';
// 	};
// 	return (
// 		<>
// 			<PageWrapper>
// 				<Page className='p-0'>
// 					{/* <div className='row h-100 align-items-center justify-content-center'>
// 						<div className='col-xl-4 col-lg-6 col-md-8 shadow-3d-container'>
// 							<Card className='shadow-3d-dark'>
// 								<CardHeader>
// 									<CardLabel icon='People' iconColor='info'>
// 										<CardTitle tag='h4' className='h5'>
// 											User Details
// 										</CardTitle>
// 									</CardLabel>
// 									<CardActions>
// 										<Button icon='Back' color='info' isLight tag='a' to='/'>
// 											Back to Users
// 										</Button>
// 									</CardActions>
// 								</CardHeader>
// 								<CardBody>
// 									<div className='col-12'>
// 										<div className='col-lg d-flex align-items-center justify-content-center'>
// 											<Avatar src={selectedImage || ''} />
// 										</div>
// 									</div>
// 									<div className='col-12'>
// 										<div
// 											className='row'
// 											style={{
// 												margin: 'auto',
// 												padding: '15px',
// 												alignContent: 'center',
// 											}}>
// 											<p className='col-lg-6 fw-bold'>ID:</p>
// 											<p className='col-lg-6'>{userInfoData?.id}</p>

// 											<p className='col-lg-6 fw-bold'>UserName:</p>
// 											<p className='col-lg-6'>{userInfoData?.username}</p>

// 											<p className='col-lg-6 fw-bold'>Email:</p>
// 											<p className='col-lg-6'>{userInfoData?.email}</p>

// 											<p className='col-lg-6 fw-bold'>Phone Number:</p>
// 											<p className='col-lg-6'>{userInfoData?.phone_number}</p>

// 											<p className='col-lg-6 fw-bold'>First Name:</p>
// 											<p className='col-lg-6'>{userInfoData?.first_name}</p>

// 											<p className='col-lg-6 fw-bold'>Last Name:</p>
// 											<p className='col-lg-6'>{userInfoData?.last_name}</p>

// 											<p className='col-lg-6 fw-bold'>Date Joined:</p>
// 											<p className='col-lg-6'>{userInfoData?.date_joined}</p>

// 											<p className='col-lg-6 fw-bold'>Is Active:</p>
// 											<p className='col-lg-6'>{userInfoData?.is_active}</p>

// 											<p className='col-lg-6 fw-bold'>Is Staff:</p>
// 											<p className='col-lg-6'>{userInfoData?.is_staff}</p>

// 											<p className='col-lg-6 fw-bold'>Is SuperUser:</p>
// 											<p className='col-lg-6'>{userInfoData?.is_superuser}</p>

// 											<p className='col-lg-6 fw-bold'>Last Login:</p>
// 											<p className='col-lg-6'>{userInfoData?.last_login}</p>
// 										</div>
// 									</div>
// 								</CardBody>
// 							</Card>
// 						</div>
// 					</div> */}

// 					{/* <Card>
// 						<CardHeader>
// 							<CardActions>
// 								<div className='bg-light p-2 rounded-3'>
// 									{Object.keys(LIST_TAB).map((key) => (
// 										<Button
// 											key={key}
// 											color={getStatusActiveListTabColor(LIST_TAB[key])}
// 											onClick={() => handleActiveListTab(LIST_TAB[key])}>
// 											{LIST_TAB[key]}
// 										</Button>
// 									))}
// 								</div>
// 							</CardActions>
// 						</CardHeader>
// 						<CardBody className='table-responsive'>
// 							{activeListTab === LIST_TAB.EMPLOYEES && <h1>info</h1>}
// 							{activeListTab === LIST_TAB.SERVICE && <Teams />}
// 							{activeListTab === LIST_TAB.PACKAGE && <h1>sop</h1>}
// 						</CardBody>
// 					</Card> */}
// 				</Page>
// 			</PageWrapper>
// 		</>
// 	);
// };

// export default UserInfo;

export default function UserDetails() {
	// const { path, url } = useMatch();
	// const location = useLocation();
	// console.log(':::::', location.pathname);
	// const path = location.pathname;
	const match = useMatch({ path: '/user/:id' });
	console.log('match', match);
	// console.log('url', match.pathname);
	// console.log('path', match.pattern['path']);
	// const path = '/user/:id';
	// const url = '/user/113';

	const path = match.pattern['path'];
	const url = match.pathname;
	console.log('Path , url :::', path, url);

	return (
		// <Router>
		<div>
			<ul>
				<li>
					<Link to={url}>Details</Link>
				</li>
				<li>
					<Link to={`${url}/teams`}>Teams</Link>
				</li>
				<li>
					<Link to={`${url}/sops`}>Sops</Link>
				</li>
			</ul>
			<hr />
			......................................................
			<Routes>
				<Route path={path} element={<UserDetail />} />
				<Route path={`${path}/teams`} element={<UserTeams />} />
				<Route path={`${path}/sops`} element={<UserSops />} />
			</Routes>
		</div>
		// </Router>
	);
}

const UserDetail = () => {
	console.log('first');
	return (
		<>
			<h2>User Details</h2>
		</>
	);
};

function UserSops() {
	return (
		<div>
			<h2>User Sops</h2>
		</div>
	);
}
const UserTeams = () => {
	console.log('first');

	return (
		<>
			<h1>Hello Teams</h1>
		</>
	);
};

// function UserTeams() {
// 	// The `path` lets us build <Route> paths that are
// 	// relative to the parent route, while the `url` lets
// 	// us build relative links.
// 	const { path, url } = useMatch();

// 	return (
// 		<div>
// 			<Routes>
// 				<Route exact path={path}>
// 					<Teams />
// 				</Route>
// 				<Route path={`${path}/:teamId`}>
// 					<TeamsDetails />
// 				</Route>
// 			</Routes>
// 		</div>
// 	);
// }

// function Teams() {
// 	let { path, url } = useMatch();
// 	return (
// 		<div>
// 			<h3>Team's Table</h3>
// 			<Link to={`${url}/1`}> Team Id 1 </Link>
// 		</div>
// 	);
// }

// function TeamsDetails() {
// 	let { path, url } = useMatch();
// 	return (
// 		<div>
// 			<ul>
// 				<li>
// 					<Link to={`${url}`}>Details</Link>
// 				</li>
// 				<li>
// 					<Link to={`${url}/agents`}>agents</Link>
// 				</li>
// 				<li>
// 					<Link to={`${url}/lobs`}>lobs</Link>
// 				</li>
// 			</ul>

// 			<Routes>
// 				<Route exact path={path}>
// 					<TeamDetail />
// 				</Route>
// 				<Route path={`${path}/agents`}>
// 					<Agents />
// 				</Route>
// 				<Route path={`${path}/lobs`}>
// 					<Lobs />
// 				</Route>
// 			</Routes>
// 		</div>
// 	);
// }

// function TeamDetail() {
// 	return (
// 		<div>
// 			<h2>Team's Detail</h2>
// 		</div>
// 	);
// }

// function Agents() {
// 	return (
// 		<div>
// 			<h2>Team's Agents</h2>
// 		</div>
// 	);
// }

// function Lobs() {
// 	return (
// 		<div>
// 			<h2>Team's Lobs</h2>
// 		</div>
// 	);
// }
