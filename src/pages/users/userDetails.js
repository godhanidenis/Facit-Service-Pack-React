import React, { useEffect, useState } from 'react';
import { Routes, Route, NavLink, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Sops from './Sops/Sops';
import User1Img from '../../assets/img/wanna/wanna2.png';
import Nav, { NavItem } from '../../components/bootstrap/Nav';
import { CardActions } from '../../components/bootstrap/Card';
import Button from '../../components/bootstrap/Button';
import Avatar from '../../components/Avatar';
import { loadLocationsStart } from '../../redux/ducks/locations';
import { loadTeamLeadsStart } from '../../redux/ducks/teamLeads';
import { loadLobsStart } from '../../redux/ducks/lobs';
import Lobs from './Lobs/Lobs';
import UsersTeams from './Teams/Teams';
import Icon from '../../components/icon/Icon';
import { loadTeamsStart } from '../../redux/ducks/teams';
import { loadSopsStart } from '../../redux/ducks/sops';

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

	return (
		<>
			<div className='p-10 d-flex align-items-center justify-content-center mb-2'>
				<div className='row d-flex align-items-center justify-content-center'>
					<div className='bg-light p-2 rounded-3 d-flex align-items-center justify-content-center'>
						<Nav design='pills' tag='nav'>
							<NavItem>
								<NavLink to={`../${id}/`}>User Details</NavLink>
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
					</div>
				</div>
			</div>

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
			if (users) {
				const singleUser = users.find((user) => user.id === Number(id));

				setUserInfoData(singleUser);

				setSelectedImage(`${singleUser?.profile_picture}`);
			}
		}
	}, [id, users, dispatch]);
	return (
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
		</div>
	);
};

export default UserDetails;
