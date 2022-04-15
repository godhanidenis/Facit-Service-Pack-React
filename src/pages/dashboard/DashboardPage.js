/* eslint react/prop-types: 0 */
import React, { useEffect, useState } from 'react';

import { useTour } from '@reactour/tour';
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
import AddEditUser from './AddEditUser';

const DashboardPage = () => {
	/**
	 * Tour Start
	 */
	const { setIsOpen } = useTour();

	const [currentPage, setCurrentPage] = useState(1);
	const [perPage, setPerPage] = useState(PER_COUNT['3']);
	const dispatch = useDispatch();
	const { users } = useSelector((state) => state.data);
	console.log('user::::', users);
	const [confirmModalOpen, setConfirmModalOpen] = useState(false);
	const [modalOpen, setModalOpen] = useState(false);
	const [currentUser, setCurrentUser] = useState(null);
	const [isUpdateUser, setIsUpdateUser] = useState(false);

	const handleDeleteUser = async (id) => {
		await dispatch(deleteUsersStart(id));
		setConfirmModalOpen(false);
	};

	useEffect(() => {
		if (localStorage.getItem('tourModalStarted') !== 'shown') {
			setTimeout(() => {
				setIsOpen(true);
				localStorage.setItem('tourModalStarted', 'shown');
			}, 3000);
		}
		return () => {};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		dispatch(loadUsersStart());
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	// eslint-disable-next-line no-console
	console.log('data table', users);
	// eslint-disable-next-line no-console
	console.log('items', items);
	const { items, requestSort, getClassNamesFor } = useSortableData(users);

	return (
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
										// eslint-disable-next-line react/no-unstable-nested-components
										onClick={() => {
											setIsUpdateUser(false);
											setModalOpen(true);
										}}>
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
										{dataPagination(items, currentPage, perPage).map((item) => (
											<>
												<tr key={item.id}>
													<th scope='row'>{item.id}</th>
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
																setCurrentUser(item);
																setIsUpdateUser(true);
																setModalOpen(true);
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
																setConfirmModalOpen(true);
															}}
														/>
													</td>
												</tr>
												<Modal
													isOpen={confirmModalOpen}
													setIsOpen={setConfirmModalOpen}
													size='lg'
													isScrollable>
													<ModalHeader setIsOpen={setConfirmModalOpen}>
														<ModalTitle>Confirmation Modal</ModalTitle>
													</ModalHeader>

													<ModalBody>
														<h1>
															Do you really want to delete{' '}
															{item.username}
														</h1>
													</ModalBody>

													<ModalFooter>
														<Button
															color='info'
															onClick={() =>
																handleDeleteUser(item.id)
															}>
															ok
														</Button>
													</ModalFooter>
												</Modal>
											</>
										))}
									</tbody>
								</table>
							</CardBody>
							<PaginationButtons
								data={items}
								label='items'
								setCurrentPage={setCurrentPage}
								currentPage={currentPage}
								perPage={perPage}
								setPerPage={setPerPage}
							/>
						</Card>
					</div>
				</div>
				<AddEditUser
					modalOpen={modalOpen}
					setModalOpen={setModalOpen}
					currentUser={isUpdateUser ? currentUser : null}
				/>
			</Page>
		</PageWrapper>
	);
};

export default DashboardPage;
