import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
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

import Modal, {
	ModalBody,
	ModalFooter,
	ModalHeader,
	ModalTitle,
} from '../../components/bootstrap/Modal';
import Icon from '../../components/icon/Icon';

import { demoPages } from '../../menu';
import PaginationButtons, { dataPagination, PER_COUNT } from '../../components/PaginationButtons';
import useSortableData from '../../hooks/useSortableData';
import Button from '../../components/bootstrap/Button';
import UserDetails from './userDetails';

const UsersPage = () => {
	return (
		<div>
			<Routes>
				<Route path='' element={<Userstbl />} />
				<Route path=':id/*' element={<UserDetails />} />
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

	const { users } = useSelector((state) => state.data);
	const { items, requestSort, getClassNamesFor } = useSortableData(users);

	useEffect(() => {
		dispatch(loadUsersStart());
	}, [dispatch]);

	const handleDeleteUser = () => {
		dispatch(deleteUsersStart(currentUser.id));
		setDeleteModalOpen(false);
	};

	return (
		<>
			<PageWrapper title={demoPages.sales.subMenu.dashboard.text}>
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
											to='/user/create'>
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
														className={getClassNamesFor('phone_number')}
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
																		`/user/edit/${item.id}`,
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
															<Link to={`/users/${item.id}`}>
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
			<Modal isOpen={deleteModalOpen} setIsOpen={setDeleteModalOpen} size='lg' isScrollable>
				<ModalHeader>
					<ModalTitle>Confirmation Modal</ModalTitle>
				</ModalHeader>

				<ModalBody>
					<h1>Do you really want to delete {currentUser?.username}</h1>
				</ModalBody>

				<ModalFooter>
					<Button color='info' onClick={() => handleDeleteUser()}>
						ok
					</Button>
				</ModalFooter>
			</Modal>
		</>
	);
};

export default UsersPage;
