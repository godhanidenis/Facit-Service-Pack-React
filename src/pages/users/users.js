import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useToasts } from 'react-toast-notifications';
import { deleteUsersStart, loadUsersStart } from '../../redux/ducks/users';
import PageWrapper from '../../layout/PageWrapper/PageWrapper';
import Page from '../../layout/Page/Page';
import Card, {
	CardActions,
	CardBody,
	CardHeader,
	CardLabel,
	CardTitle,
} from '../../components/bootstrap/Card';

import Icon from '../../components/icon/Icon';

import PaginationButtons, { dataPagination, PER_COUNT } from '../../components/PaginationButtons';
import useSortableData from '../../hooks/useSortableData';
import Button from '../../components/bootstrap/Button';
import UserDetails from './userDetails';
import AddUpdateUser from './addUpdateUser';
import Spinner from '../../components/bootstrap/Spinner';
import Toasts from '../../components/bootstrap/Toasts';
import DeleteModel from '../../common/ConfirmationModal';

const UsersPage = () => {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(loadUsersStart());
	}, [dispatch]);

	return (
		<div className='w-100'>
			<Routes>
				<Route path='' element={<Userstbl />} />
				<Route path=':id/*' element={<UserDetails />} />
				<Route path='create' element={<AddUpdateUser />} />
				<Route path='edit/:id' element={<AddUpdateUser />} />
			</Routes>
		</div>
	);
};

const Userstbl = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const [currentPage, setCurrentPage] = useState(1);
	const [perPage, setPerPage] = useState(PER_COUNT['5']);
	const [deleteModalOpen, setDeleteModalOpen] = useState(false);
	const [currentUser, setCurrentUser] = useState(null);
	const { addToast } = useToasts();

	const { users, loading, error } = useSelector((state) => state.users);

	const { items, requestSort, getClassNamesFor } = useSortableData(users);

	useEffect(() => {
		if (error !== '') {
			addToast(
				<Toasts
					title='Error in Users'
					icon='warning'
					iconColor='danger'
					color='danger'
					isDismiss>
					{`${error}`}
				</Toasts>,
				{
					autoDismiss: true,
				},
			);
		}
	}, [addToast, error]);

	const handleDeleteUser = () => {
		dispatch(deleteUsersStart(currentUser.id));
		setDeleteModalOpen(false);
	};

	return (
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

			<div style={{ opacity: loading ? 0.5 : 1 }}>
				<PageWrapper>
					<Page container='fluid'>
						<div className='row'>
							<div className='col-xxl-12'>
								<Card>
									<CardHeader>
										<CardLabel icon='People' iconColor='info'>
											<CardTitle tag='h4' className='h5'>
												All Users
											</CardTitle>
										</CardLabel>
										<CardActions>
											<Button
												icon='PersonAdd'
												color='info'
												isLight
												tag='a'
												to='/users/create'>
												New User
											</Button>
										</CardActions>
									</CardHeader>
									<CardBody className='table-responsive'>
										<table className='table table-modern table-hover'>
											<thead>
												<tr>
													<th
														scope='col'
														onClick={() => requestSort('id')}
														className='cursor-pointer text-decoration-underline'>
														ID
														<Icon
															size='lg'
															className={getClassNamesFor('id')}
															icon='FilterList'
														/>
													</th>

													<th
														scope='col'
														onClick={() => requestSort('username')}
														className='cursor-pointer text-decoration-underline'>
														UserName
														<Icon
															size='lg'
															className={getClassNamesFor('username')}
															icon='FilterList'
														/>
													</th>

													<th
														scope='col'
														onClick={() => requestSort('phone_number')}
														className='cursor-pointer text-decoration-underline'>
														Email
														<Icon
															size='lg'
															className={getClassNamesFor(
																'phone_number',
															)}
															icon='FilterList'
														/>
													</th>
													<th
														scope='col'
														onClick={() => requestSort('email')}
														className='cursor-pointer text-decoration-underline'>
														Phone Number
														<Icon
															size='lg'
															className={getClassNamesFor('email')}
															icon='FilterList'
														/>
													</th>
													<th
														scope='col'
														onClick={() => requestSort('actions')}
														className='cursor-pointer text-decoration-underline'>
														Actions
														<Icon
															size='lg'
															className={getClassNamesFor('actions')}
															icon='FilterList'
														/>
													</th>
												</tr>
											</thead>
											<tbody>
												{dataPagination(items, currentPage, perPage).map(
													(item) => (
														<tr key={item.id}>
															<th>{item.id}</th>
															<td>{item.username}</td>
															<td>{item.email}</td>
															<td>{item.phone_number}</td>
															<td>
																<Icon
																	size='lg'
																	icon='Edit'
																	color='info'
																	style={{ cursor: 'pointer' }}
																	onClick={() => {
																		navigate(
																			`/users/edit/${item.id}`,
																		);
																	}}
																/>
																<Icon
																	size='lg'
																	icon='Delete'
																	color='danger'
																	style={{
																		marginLeft: '10px',
																		cursor: 'pointer',
																	}}
																	onClick={() => {
																		setCurrentUser(item);
																		setDeleteModalOpen(true);
																	}}
																/>
																<Link to={`/users/${item.id}/`}>
																	<Icon
																		size='lg'
																		icon='Eye'
																		color='success'
																		style={{
																			cursor: 'pointer',
																			marginLeft: '10px',
																		}}
																	/>
																</Link>
															</td>
														</tr>
													),
												)}
											</tbody>
										</table>
									</CardBody>
									<PaginationButtons
										data={items}
										label='No. Of Users'
										setCurrentPage={setCurrentPage}
										currentPage={currentPage}
										perPage={perPage}
										setPerPage={setPerPage}
									/>
								</Card>
							</div>
						</div>
					</Page>
				</PageWrapper>
			</div>

			<DeleteModel
				deleteModalOpen={deleteModalOpen}
				setDeleteModalOpen={setDeleteModalOpen}
				handleDeleteOpration={handleDeleteUser}
				name={currentUser?.username}
				alertLable='Delete User'
			/>
		</>
	);
};

export default UsersPage;
