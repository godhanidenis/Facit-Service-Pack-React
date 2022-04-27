<<<<<<< HEAD
import React, { useEffect, useState } from 'react';
=======
import React, { useState } from 'react';
>>>>>>> 094e58a51e736b37d547f579df49db7267591eaa
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Route, Routes, useNavigate, useParams } from 'react-router-dom';
import Button from '../../../components/bootstrap/Button';
import Card, {
	CardActions,
	CardBody,
	CardHeader,
	CardLabel,
	CardTitle,
} from '../../../components/bootstrap/Card';
import Page from '../../../layout/Page/Page';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
<<<<<<< HEAD
import { loadTeamsStart, deleteTeamsStart } from '../../../redux/ducks/teams';
=======
import { deleteTeamsStart } from '../../../redux/ducks/teams';
>>>>>>> 094e58a51e736b37d547f579df49db7267591eaa
import Agents from './Agents/Agents';
import Lobs from './Lobs/Lobs';
import Nav, { NavItem } from '../../../components/bootstrap/Nav';
import Icon from '../../../components/icon/Icon';
import useSortableData from '../../../hooks/useSortableData';
import PaginationButtons, {
	dataPagination,
	PER_COUNT,
} from '../../../components/PaginationButtons';

import Modal, {
	ModalBody,
	ModalFooter,
	ModalHeader,
	ModalTitle,
} from '../../../components/bootstrap/Modal';
import AddEditTeam from './AddEditTeam';

const Teams = () => {
	return (
		<div>
<<<<<<< HEAD
			<Nav design='tabs' className='w-50' style={{ margin: 'auto' }}>
=======
			<Nav design='tabs' isJustified className='w-50' style={{ margin: 'auto' }}>
>>>>>>> 094e58a51e736b37d547f579df49db7267591eaa
				<NavItem>
					<NavLink to=''>Teams Details</NavLink>
				</NavItem>
				<NavItem>
					<NavLink to='agents'>Agents</NavLink>
				</NavItem>
				<NavItem>
					<NavLink to='lobs'>Lobs</NavLink>
				</NavItem>
			</Nav>
			<Routes>
				<Route path='' element={<UsersTeams />} />
				<Route path='create' element={<AddEditTeam />} />
				<Route path='edit/:id1' element={<AddEditTeam />} />
				<Route path='agents' element={<Agents />} />
				<Route path='lobs' element={<Lobs />} />
			</Routes>
		</div>
	);
};

const UsersTeams = () => {
	const id = useParams();

	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { teams } = useSelector((state) => state.teams);
	console.log('teams::::', teams);
	const [currentTeam, setCurrentTeam] = useState(null);
	const [deleteModalOpen, setDeleteModalOpen] = useState(false);

	const { items, requestSort, getClassNamesFor } = useSortableData(teams);
	const [currentPage, setCurrentPage] = useState(1);
	const [perPage, setPerPage] = useState(PER_COUNT['5']);

	useEffect(() => {
		dispatch(loadTeamsStart(id.id));
	}, [dispatch, id.id]);

	const handleDeleteTeam = () => {
		dispatch(deleteTeamsStart(currentTeam.id));
		setDeleteModalOpen(false);
	};

	return (
		<>
			<PageWrapper>
				<Page className='p-0'>
					<div className='row'>
						<div className='col-xxl-12'>
							<Card>
								<CardHeader>
									<CardLabel icon='People' iconColor='info'>
										<CardTitle tag='h4' className='h5'>
											All Teams
										</CardTitle>
									</CardLabel>
									<CardActions>
										<Button
											icon='PersonAdd'
											color='info'
											isLight
											tag='a'
											to={`/users/${id.id}/teams/create`}>
											New Team
										</Button>
									</CardActions>
								</CardHeader>
								<CardBody className='table-responsive'>
									<table className='table table-modern table-hover'>
										<thead>
											<tr>
												<th
													scope='col'
													onClick={() => requestSort('Team_name')}
													className='cursor-pointer text-decoration-underline'>
													Teams
													<Icon
														size='lg'
														className={getClassNamesFor('Team_name')}
														icon='FilterList'
													/>
												</th>

												<th
													scope='col'
													onClick={() => requestSort('No_agentns')}
													className='cursor-pointer text-decoration-underline'>
													No of Agents
													<Icon
														size='lg'
														className={getClassNamesFor('No_agentns')}
														icon='FilterList'
													/>
												</th>

												<th
													scope='col'
													onClick={() => requestSort('Lob_name')}
													className='cursor-pointer text-decoration-underline'>
													LOB
													<Icon
														size='lg'
														className={getClassNamesFor('Lob_name')}
														icon='FilterList'
													/>
												</th>

												<th
													scope='col'
													onClick={() => requestSort('TeamLead_name')}
													className='cursor-pointer text-decoration-underline'>
													Team Lead
													<Icon
														size='lg'
														className={getClassNamesFor(
															'TeamLead_name',
														)}
														icon='FilterList'
													/>
												</th>
												<th
													scope='col'
													onClick={() => requestSort('Location_name')}
													className='cursor-pointer text-decoration-underline'>
													Location Name
													<Icon
														size='lg'
														className={getClassNamesFor(
															'Location_name',
														)}
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
<<<<<<< HEAD
														<th>{item.Team_name}</th>
=======
														<td>{item.Team_name}</td>
>>>>>>> 094e58a51e736b37d547f579df49db7267591eaa
														<td>{item.No_agentns}</td>
														<td>{item.LOB[0]?.Lob_name}</td>
														<td>{item.Team_lead.TeamLead_name}</td>
														<td>{item.Location.Location_name}</td>
														<td>
															<Icon
																size='lg'
																icon='Edit'
																color='info'
																style={{ cursor: 'pointer' }}
																onClick={() => {
																	navigate(
																		`/users/${id.id}/teams/edit/${item.id}`,
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
																	setCurrentTeam(item);
																	setDeleteModalOpen(true);
																}}
															/>
														</td>
													</tr>
												),
											)}
										</tbody>
									</table>
								</CardBody>
								<PaginationButtons
									data={items}
									label='No. Of Teams'
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
					<h1>Do you really want to delete {currentTeam?.Team_name}</h1>
				</ModalBody>

				<ModalFooter>
					<Button color='info' onClick={() => handleDeleteTeam()}>
						ok
					</Button>
				</ModalFooter>
			</Modal>
		</>
	);
};

export default Teams;
