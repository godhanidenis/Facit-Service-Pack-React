import React, { useEffect, useState } from 'react';
import { Routes, Route, NavLink, useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Page from '../../layout/Page/Page';
import PageWrapper from '../../layout/PageWrapper/PageWrapper';
import Sops from './Sops/Sops';
import User1Img from '../../assets/img/wanna/wanna2.png';
import Nav, { NavItem } from '../../components/bootstrap/Nav';
import Card, {
	CardActions,
	CardBody,
	CardHeader,
	CardLabel,
	CardTitle,
} from '../../components/bootstrap/Card';
import Button from '../../components/bootstrap/Button';
import Avatar from '../../components/Avatar';
import { loadLocationsStart } from '../../redux/ducks/locations';
import { loadTeamLeadsStart } from '../../redux/ducks/teamLeads';
import { loadLobsStart } from '../../redux/ducks/lobs';
import Lobs from './Lobs/Lobs';
import UsersTeams from './Teams/Teams';
import { Input } from '../../components/icon/material-icons';
import Icon from '../../components/icon/Icon';
import { loadTeamsStart } from '../../redux/ducks/teams';
import { loadSopsStart } from '../../redux/ducks/sops';
import { loadAgentsStart } from '../../redux/ducks/agents';

const UserDetails = () => {
	const { id } = useParams();
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(loadLocationsStart(id));
		dispatch(loadTeamLeadsStart(id));
		dispatch(loadLobsStart(id));
		dispatch(loadTeamsStart(id));
		dispatch(loadSopsStart(id));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	// const LIST_TAB = {
	// 	EMPLOYEES: 'Employees',
	// 	SERVICE: 'Services',
	// 	PACKAGE: 'Packages',
	// };
	const LIST_ACTIVATE_TAB = {
		USERS: ['Users Details', `../${id}/`],
		TEAMS: ['Teams', 'teams'],
		LOBS: ['Lobs', 'lobs'],
		SOPS: ['Sops', 'sops'],
	};
	const [activeListTab, setActiveListTab] = useState(LIST_ACTIVATE_TAB.USERS[0]);
	const handleActiveListTab = (tabName) => {
		setActiveListTab(tabName);
	};
	const getStatusActiveListTabColor = (tabName) => {
		if (activeListTab === tabName) return 'success';
		return 'light';
	};

	return (
		<>
			{/* <Nav design='pills' tag='nav' isJustified style={{ marginBottom: '20px' }}> */}
			<div className='p-10 d-flex align-items-center justify-content-center mb-2'>
				<div className='row d-flex align-items-center justify-content-center'>
					<div className='bg-light p-2 rounded-3 d-flex align-items-center justify-content-center'>
						<Nav design='pills' tag='nav'>
							<NavItem>
								<NavLink to={`../${id}/`}>Details</NavLink>
							</NavItem>
							<NavItem>
								<NavLink to='teams'>Teams</NavLink>
							</NavItem>
							<NavItem>
								<NavLink to='lobs'>Lobs</NavLink>
							</NavItem>
							<NavItem>
								<NavLink to='sops'>Sops</NavLink>
							</NavItem>
						</Nav>
						{/* {Object.keys(LIST_ACTIVATE_TAB).map((key) => (
							<Button
								key={key}
								color={getStatusActiveListTabColor(LIST_ACTIVATE_TAB[key][0])}
								onClick={() => handleActiveListTab(LIST_ACTIVATE_TAB[key][0])}>
								<NavLink
									to={LIST_ACTIVATE_TAB[key][1]}
									style={{ textDecoration: 'none' }}>
									{LIST_ACTIVATE_TAB[key][0]}
								</NavLink>
							</Button>
						))} */}
					</div>
				</div>
			</div>
			{/* </Nav> */}

			<Routes>
				<Route exact path='/' element={<UserDetail />} />
				<Route exact path='teams/*' element={<UsersTeams />} />
				<Route exact path='lobs/*' element={<Lobs />} />
				<Route exact path='sops/*' element={<Sops />} />
			</Routes>
			{/* <CardBody className='table-responsive'> */}
			{/* {activeListTab === LIST_ACTIVATE_TAB.USERS[0] && <UserDetail />}
			{activeListTab === LIST_ACTIVATE_TAB.TEAMS[0] && <UsersTeams />}
			{activeListTab === LIST_ACTIVATE_TAB.LOBS[0] && <Lobs />}
			{activeListTab === LIST_ACTIVATE_TAB.SOPS[0] && <Sops />} */}
			{/* </CardBody> */}
		</>
	);
};

const UserDetail = () => {
	const dispatch = useDispatch();
	const { id } = useParams();
	const [selectedImage, setSelectedImage] = useState();
	const [userInfoData, setUserInfoData] = useState();
	const { users } = useSelector((state) => state.users);

	useEffect(() => {
		if (id) {
			// const singleUser = await axios.get(`http://3.215.147.147/admin_panel/users/${id}`);
			// console.log('teqams/?????????', state.teams);
			if (users) {
				const singleUser = users.find((user) => user.id === Number(id));

				setUserInfoData(singleUser);

				setSelectedImage(`${singleUser?.profile_picture}`);
			}
			// else {
			// 	dispatch(loadTeamsStart(id));
			// 	dispatch(loadLobsStart(id));
			// 	dispatch(loadSopsStart(id));
			// 	dispatch(loadAgentsStart(Number(id)));
			// }
		}
	}, [id, users, dispatch]);
	return (
		<>
			<div className='col align-items-center justify-content-center p-3'>
				<div className='row'>
					<div className='col-10'>
						<div className='row g-4 align-items-center'>
							<div className='col-md-auto'>
								<Avatar src={User1Img} />
								{/* <Avatar src={selectedImage || ''} /> */}
								<div
									className='bg-success rounded-circle'
									style={{
										position: 'relative',
										left: 100,
										bottom: 30,
										height: 20,
										width: 20,
										color: '#5cb85c',
									}}
								/>
								{/* <Icon
							size='lg'
							icon='Circle'
							color='danger'
							style={{
								position: 'relative',
								right: 30,
								top: 50,
							}}
						/> */}
							</div>
							<div className='col-md-auto'>
								<h1>
									{userInfoData?.first_name} {userInfoData?.last_name}
								</h1>
								<h6>{userInfoData?.username}</h6>
								<h6>
									Joined at <b>{userInfoData?.date_joined}</b>
								</h6>
							</div>
						</div>
					</div>
					<div className='col'>
						<CardActions>
							<Button icon='Backspace' color='info' isLight tag='a' to='/users'>
								Back to Users
							</Button>
						</CardActions>
					</div>
				</div>
				<div className='row d-flex align-items-center justify-content-center'>
					<div className='col-md-3'>
						<p className='mb-1'>
							<b>First Name</b>
						</p>
						<div className=' border rounded p-2'>{userInfoData?.first_name}</div>
					</div>
					<div className='col-md-3'>
						<p className='mb-1'>
							<b>Last Name</b>
						</p>
						<div className=' border rounded p-2'>{userInfoData?.last_name}</div>
					</div>
				</div>
				<div className='row d-flex align-items-center justify-content-center'>
					<div className='col-md-3'>
						<p className='mb-1 mt-4'>
							<b>Email</b>
						</p>
						<div className='row border rounded m-2'>
							<div className='col-auto mt-2'>
								<Icon
									size='lg'
									icon='Email'
									color='success'
									style={{
										cursor: 'pointer',
										marginLeft: '10px',
									}}
								/>
							</div>
							<div className='col-3 mt-2 mb-2'>
								<span>{userInfoData?.email}</span>
							</div>
						</div>
					</div>
					<div className='col-md-3'>
						<p className='mb-1 mt-3'>
							<b>Mobile</b>
						</p>
						<div className='row border rounded'>
							<div className='col-auto mt-2'>
								<Icon
									size='lg'
									icon='LocalPhone'
									color='success'
									style={{
										cursor: 'pointer',
										marginLeft: '10px',
									}}
								/>
							</div>
							<div className='col-3 mt-2 mb-2'>
								<span>{userInfoData?.phone_number}</span>
							</div>
						</div>
					</div>
				</div>
				{/* <div className='row-12 d-flex align-items-center justify-content-center'>
					<div className='col-md-3'>
						<p className='mb-1 mt-4'>Email</p>
						<div className='row border rounded'>
							<div className='col-auto mt-2'>
								<Icon
									size='lg'
									icon='Email'
									color='success'
									style={{
										cursor: 'pointer',
										marginLeft: '10px',
									}}
								/>
							</div>
							<div className='col-3 mt-2 mb-2'>
								<span>{userInfoData?.email}</span>
							</div>
						</div>
					</div>
				</div> */}
				{/* <div className='row-12 d-flex align-items-center justify-content-center'>
					<div className='col-md-3'>
						<p className='mb-1 mt-3'>Mobile</p>
						<div className='row border rounded'>
							<div className='col-auto mt-2'>
								<Icon
									size='lg'
									icon='LocalPhone'
									color='success'
									style={{
										cursor: 'pointer',
										marginLeft: '10px',
									}}
								/>
							</div>
							<div className='col-3 mt-2 mb-2'>
								<span>{userInfoData?.phone_number}</span>
							</div>
						</div>
					</div>
				</div> */}
			</div>
			{/* <PageWrapper>
				<Page className='p-0'>
					<div className='row h-100 align-items-center justify-content-center'>
						<div className='col-xl-4 col-lg-6 col-md-8 shadow-3d-container'>
							<Card className='shadow-3d-dark'>
								<CardHeader>
									<CardLabel icon='People' iconColor='info'>
										<CardTitle tag='h4' className='h5'>
											User Details
										</CardTitle>
									</CardLabel>

									<CardActions>
										<Button
											icon='Backspace'
											color='info'
											isLight
											tag='a'
											to='/users'>
											Back to Users
										</Button>
									</CardActions>
								</CardHeader>
								<CardBody>
									<div className='col-12'>
										<div className='col-lg d-flex align-items-center justify-content-center'>
											<Avatar src={selectedImage || ''} />
										</div>
									</div>
									<div className='col-12'>
										<div
											className='row'
											style={{
												margin: 'auto',
												padding: '15px',
												alignContent: 'center',
											}}>
											<p className='col-lg-6 fw-bold'>ID:</p>
											<p className='col-lg-6'>{userInfoData?.id}</p>

											<p className='col-lg-6 fw-bold'>UserName:</p>
											<p className='col-lg-6'>{userInfoData?.username}</p>

											<p className='col-lg-6 fw-bold'>Email:</p>
											<p className='col-lg-6'>{userInfoData?.email}</p>

											<p className='col-lg-6 fw-bold'>Phone Number:</p>
											<p className='col-lg-6'>{userInfoData?.phone_number}</p>

											<p className='col-lg-6 fw-bold'>First Name:</p>
											<p className='col-lg-6'>{userInfoData?.first_name}</p>

											<p className='col-lg-6 fw-bold'>Last Name:</p>
											<p className='col-lg-6'>{userInfoData?.last_name}</p>

											<p className='col-lg-6 fw-bold'>Date Joined:</p>
											<p className='col-lg-6'>{userInfoData?.date_joined}</p>

											<p className='col-lg-6 fw-bold'>Is Active:</p>
											<p className='col-lg-6'>{userInfoData?.is_active}</p>

											<p className='col-lg-6 fw-bold'>Is Staff:</p>
											<p className='col-lg-6'>{userInfoData?.is_staff}</p>

											<p className='col-lg-6 fw-bold'>Is SuperUser:</p>
											<p className='col-lg-6'>{userInfoData?.is_superuser}</p>

											<p className='col-lg-6 fw-bold'>Last Login:</p>
											<p className='col-lg-6'>{userInfoData?.last_login}</p>
										</div>
									</div>
								</CardBody>
							</Card>
						</div>
					</div>
				</Page>
			</PageWrapper> */}
		</>
	);
};

export default UserDetails;
