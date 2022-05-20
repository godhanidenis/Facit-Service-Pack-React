import React, { useEffect, useState } from 'react';
import { Routes, Route, NavLink, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Sops from './Sops/Sops';
import User1Img from '../../assets/img/wanna/wanna2.png';
import Nav, { NavItem } from '../../components/bootstrap/Nav';
import Card, { CardActions } from '../../components/bootstrap/Card';
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
import Spinner from '../../components/bootstrap/Spinner';
import { loadTagListStart } from '../../redux/ducks/tagList';
import { loadSkillSetListStart } from '../../redux/ducks/skillSetList';

const UserDetails = () => {
	const { id } = useParams();
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(loadLocationsStart(id));
		dispatch(loadTeamLeadsStart(id));
		dispatch(loadLobsStart(id));
		dispatch(loadTeamsStart(id));
		dispatch(loadSopsStart(id));
		const formDataTag = {
			doctype: 'tagging_found',
		};
		dispatch(loadTagListStart({ id, slug: formDataTag }));

		const formDataSkill = {
			doctype: 'skill_set_found',
		};
		dispatch(loadSkillSetListStart({ id, slug: formDataSkill }));
	}, [dispatch, id]);

	return (
		<>
			<div className='d-flex align-items-center justify-content-center'>
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
	const { users, loading } = useSelector((state) => state.users);

	const [joinedDate, setjoinedDate] = useState();
	useEffect(() => {
		if (id) {
			if (users) {
				const singleUser = users.find((user) => user.id === Number(id));

				setUserInfoData(singleUser);

				setSelectedImage(`${singleUser?.pre_signed_url}`);
				const current = new Date(singleUser?.date_joined);
				setjoinedDate(current.toDateString());
			}
		}
	}, [id, users, dispatch, userInfoData?.date_joined]);
	return (
		// eslint-disable-next-line react/jsx-no-useless-fragment
		<>
			<div
				className={
					loading
						? 'd-flex align-items-center justify-content-center w-100 h-100'
						: 'visually-hidden'
				}
				style={{ position: 'absolute', top: 50, left: 50, opacity: 1, zIndex: 1 }}>
				<Spinner isGrow={false} />
			</div>
			{users.length > 0 && (
				<div
					className='row align-items-center justify-content-center'
					style={{ opacity: loading ? 0.5 : 1 }}>
					<div className='col-md-6'>
						<hr style={{ opacity: '0.05' }} />
						<div className='row align-items-center'>
							<CardActions className='d-flex justify-content-end'>
								<Button icon='Backspace' color='info' isLight tag='a' to='/users'>
									Back to users
								</Button>
							</CardActions>
						</div>
						<div className='row'>
							<div className='col-12'>
								<div className='row align-items-center'>
									<div className='col-auto'>
										{/* <Avatar src={User1Img} /> */}
										<Avatar
											src={selectedImage || User1Img}
											style={{ boxShadow: '0px 0px 14px -4px #888888' }}
										/>
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
											Joined at <b>{joinedDate}</b>
										</h6>
									</div>
								</div>
							</div>
							<div className='col-12'>
								<div className='row'>
									<div className='col'>
										<p className='mb-1 mt-4'>
											<b>First Name</b>
										</p>
										<div className='row border rounded m-2'>
											<div className='col-auto mt-2'>
												<Icon
													size='lg'
													icon='Person'
													color='success'
													style={{
														cursor: 'pointer',
														marginLeft: '10px',
													}}
												/>
											</div>
											<div className='col-3 mt-2 mb-2'>
												{userInfoData?.first_name}
											</div>
										</div>
									</div>
									<div className='col'>
										<p className='mb-1 mt-4'>
											<b>Last Name</b>
										</p>
										<div className='row border rounded m-2'>
											<div className='col-auto mt-2'>
												<Icon
													size='lg'
													icon='Person'
													color='success'
													style={{
														cursor: 'pointer',
														marginLeft: '10px',
													}}
												/>
											</div>
											<div className='col-3 mt-2 mb-2'>
												{userInfoData?.last_name}
											</div>
										</div>
									</div>
								</div>
							</div>
							<div className='col-12'>
								<div className='row'>
									<div className='col'>
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
												{userInfoData?.email}
											</div>
										</div>
									</div>
									<div className='col'>
										<p className='mb-1 mt-4'>
											<b>Mobile</b>
										</p>
										<div className='row border rounded m-2'>
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
												{userInfoData?.phone_number}
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default UserDetails;
