import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deleteUsersStart, loadUsersStart } from '../../redux/ducks/users';
import PageWrapper from '../../layout/PageWrapper/PageWrapper';
import { ToastContainer, toast } from 'react-toastify';
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
import AddUpdateUser from './addUpdateUser';
import Spinner from '../../components/bootstrap/Spinner';
import Toasts, { Toast } from '../../components/bootstrap/Toasts';
import { useToasts } from 'react-toast-notifications';
// import { Options } from '../../components/bootstrap/Option';
import showNotification from '../../components/extras/showNotification';

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
	// const [currentLoadPage, setcurrentLoadPage] = useState(true);
	const { addToast } = useToasts();

	const { users, loading, error } = useSelector((state) => state.users);
	console.log('users::', users);

	const { items, requestSort, getClassNamesFor } = useSortableData(users);
	/* useEffect(() => {
		dispatch(loadUsersStart());
		}, [dispatch]);*/

	useEffect(() => {
		console.log("loading???????????", error);
		// if (error !== '') {
		// const timeout = setTimeout(() => {

		// showNotification(
		// 	"hello"
		// );
		// }, 3000);
		// return () => {
		// 	clearTimeout(timeout);
		// };
		// }
		if (error !== '') {
			addToast(
				<Toasts
					title='Error in Users'
					icon='warning'
					iconColor='danger'
					color='danger'
					time='Now'
					isDismiss
				>
					{`${error}`}
				</Toasts>,
				{
					autoDismiss: true,
				},
			)
		}
	}, [error]);
	const handleDeleteUser = () => {
		dispatch(deleteUsersStart(currentUser.id));
		setDeleteModalOpen(false);
	};

	return (
		<>
			{loading ?

				<div className='d-flex align-items-center justify-content-center w-100 h-100'>
					<Spinner isGrow={false} color={'red'} />
				</div> :
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
			}
			<Modal isOpen={deleteModalOpen} setIsOpen={setDeleteModalOpen} size='lg' isScrollable isCentered={true}>
				<ModalHeader>
					<ModalTitle>
						<div>
							<Icon
								size='3x'
								icon='WarningAmber'
								color='danger'
								style={{
									cursor: 'pointer',
									marginLeft: '10px',
								}}
							/>
							<span style={{ color: 'OrangeRed', fontSize: 25, marginLeft: "10px" }}><b>User delete</b></span>
						</div>
					</ModalTitle>
				</ModalHeader>

				<ModalBody>
					<h4 style={{ marginLeft: "20px" }}><b>Do you really want to delete {currentUser?.username} ?</b></h4>
				</ModalBody>

				<ModalFooter>
					<Button color='dark' onClick={() => setDeleteModalOpen(false)}>
						cancle
					</Button>
					<Button color='danger' onClick={() => handleDeleteUser()}>
						delete
					</Button>
				</ModalFooter>
			</Modal>
		</>
	);
};

export default UsersPage;
