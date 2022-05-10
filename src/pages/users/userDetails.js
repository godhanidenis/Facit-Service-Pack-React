import React, { useEffect, useState } from 'react';
import { Routes, Route, NavLink, useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Page from '../../layout/Page/Page';
import PageWrapper from '../../layout/PageWrapper/PageWrapper';
import Sops from './Sops/Sops';
import User1Img from '../../assets/img/wanna/wanna2.png';
import User1Webp from '../../assets/img/wanna/wanna2.webp';

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

const UserDetails = () => {
	const { id } = useParams();
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(loadLocationsStart(id));
		dispatch(loadTeamLeadsStart(id));
		dispatch(loadLobsStart(id));
		// dispatch(loadTeamsStart(id));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<>
			<Nav design='pills' tag='nav' isJustified style={{ marginBottom: '20px' }}>
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

			<Routes>
				<Route exact path='/' element={<UserDetail />} />
				<Route exact path='teams/*' element={<UsersTeams />} />
				<Route exact path='lobs/*' element={<Lobs />} />
				<Route exact path='sops/*' element={<Sops />} />
			</Routes>
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

			if (users) {
				const singleUser = users.find((user) => user.id === Number(id));

				console.log('singleUser', singleUser?.profile_picture);
				setUserInfoData(singleUser);

				setSelectedImage(`${singleUser?.profile_picture}`);
			}
		}
	}, [id, users, dispatch]);
	return (
		// <Card>
		// 		<CardBody>
		// 			<div className='row g-4 align-items-center'>
		// 				<div className='col-md-auto' style={{ borderRadius: "20%" }} >
		// 					<Avatar src={User1Img} rounded={3} />
		// 				</div>
		// 				<div className='col-md'>
		// 					<div className='row g-4'>
		// 						<div className='col-auto'>
		// 							<h3><b>UserName :</b> {userInfoData?.username}</h3>
		// 						</div>

		// 						<div className='col-12'>
		// 							<p>{userInfoData?.first_name}  {userInfoData?.last_name}</p>

		// 						</div>
		// 						<div className='col-12'>
		// 							<p>Joined at <b>{userInfoData?.date_joined}</b></p>
		// 						</div>
		// 					</div>
		// 				</div>
		// 			</div>
		// 		</CardBody>
		// 	</Card>

		// 	<div className='row d-flex align-items-center justify-content-center'>
		// 		<div className='col-md-6'>

		// 			<Card>
		// 				<CardBody>
		// 					<div className='row g-4 align-items-center'>

		// 						<div className='row'>
		// 							<div className='col-3'>

		// 								<Icon
		// 									size='3x'
		// 									icon='Email'
		// 									color='success'
		// 									style={{
		// 										cursor: 'pointer',
		// 										marginLeft: '10px',
		// 									}}
		// 								/>

		// 							</div>
		// 							<div className='col-auto'>
		// 								<p className='mt-3'>{userInfoData?.email}</p>

		// 							</div>
		// 						</div>

		// 						<div className='col-md-6'>
		// 							<div className='row'>
		// 								<div className='col-3'>
		// 									<Icon
		// 										size='3x'
		// 										icon='Phone'
		// 										color='success'
		// 										style={{
		// 											cursor: 'pointer',
		// 											marginLeft: '10px',
		// 										}}
		// 									/>

		// 								</div>
		// 								<div className='col-auto'>
		// 									<p className='mt-3'>{userInfoData?.phone_number}</p>
		// 								</div>
		// 							</div>
		// 						</div>
		// 					</div>
		// 				</CardBody>
		// 			</Card>
		// 		</div>
		// 	</div>

		// 	<div className='row d-flex align-items-center justify-content-center'>
		// 		<div className='col-md-6'>

		// 			<Card>
		// 				<CardBody>
		// 					<div className='row g-4 align-items-center'>
		// 						<div className='col-md-6'>
		// 							<div className='row'>
		// 								<div className='col-3'>

		// 									<Icon
		// 										size='3x'
		// 										icon='Email'
		// 										color='success'
		// 										style={{
		// 											cursor: 'pointer',
		// 											marginLeft: '10px',
		// 										}}
		// 									/>

		// 								</div>
		// 								<div className='col-auto'>
		// 									<p className='mt-3'>{userInfoData?.email}</p>

		// 								</div>
		// 							</div>
		// 						</div>

		// 						<div className='col-md-6'>
		// 							<div className='row'>
		// 								<div className='col-3'>
		// 									<Icon
		// 										size='3x'
		// 										icon='Phone'
		// 										color='success'
		// 										style={{
		// 											cursor: 'pointer',
		// 											marginLeft: '10px',
		// 										}}
		// 									/>

		// 								</div>
		// 								<div className='col-auto'>
		// 									<p className='mt-3'>{userInfoData?.phone_number}</p>
		// 								</div>
		// 							</div>
		// 						</div>
		// 					</div>
		// 				</CardBody>
		// 			</Card>
		// 		</div>
		// 	</div>
		<PageWrapper>
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
		</PageWrapper>
	);
};

export default UserDetails;
