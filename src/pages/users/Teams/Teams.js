import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes, useNavigate, useParams } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';
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
import { deleteTeamsStart, loadTeamsStart } from '../../../redux/ducks/teams';
import Icon from '../../../components/icon/Icon';
import useSortableData from '../../../hooks/useSortableData';
import PaginationButtons, {
	dataPagination,
	PER_COUNT,
} from '../../../components/PaginationButtons';
import AddEditTeam from './AddEditTeam';
import TeamsPage from './TeamDetail';
import Spinner from '../../../components/bootstrap/Spinner';
import Toasts from '../../../components/bootstrap/Toasts';
import DeleteModel from '../../DeleteModel';
import { Visibility } from '../../../components/icon/material-icons';

const Teams = () => {
	return (
		<div className='w-100 h-100'>
			<Routes>
				<Route exact path='' element={<UsersTeams />} />
				<Route exact path='create' element={<AddEditTeam />} />
				<Route exact path='edit/:id1' element={<AddEditTeam />} />
				<Route exact path=':teamId/*' element={<TeamsPage />} />
			</Routes>
		</div>
	);
};

const UsersTeams = () => {
	const id = useParams();

	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { teams, loading, error } = useSelector((state) => state.teams);

	const [currentTeam, setCurrentTeam] = useState(null);
	const [deleteModalOpen, setDeleteModalOpen] = useState(false);

	const { items, requestSort, getClassNamesFor } = useSortableData(teams);
	const [currentPage, setCurrentPage] = useState(1);
	const [perPage, setPerPage] = useState(PER_COUNT['5']);
	const { addToast } = useToasts();

	// useEffect(() => {
	// 	if (!teams.length && loading !== true) {
	// 		dispatch(loadTeamsStart(id.id));
	// 	}
	// }, [dispatch, id.id, loading, teams.length]);

	const handleDeleteTeam = () => {
		dispatch(deleteTeamsStart(currentTeam.id));
		setDeleteModalOpen(false);
	};
	// useEffect(() => {
	// 	console.log('loading..............................................', loading);
	// });
	useEffect(() => {
		console.log('loading???????????', error);
		if (error !== '') {
			addToast(
				<Toasts
					title='Error in Teams'
					icon='warning'
					iconColor='danger'
					color='red'
					time='Now'
					isDismiss>
					{`${error}`}
				</Toasts>,
				{
					autoDismiss: true,
				},
			);
		}
	}, [addToast, error]);

	return (
		<>
			<div
				className={
					loading
						? 'd-flex align-items-center justify-content-center w-100 h-100'
						: 'visually-hidden'
				}
				style={{ position: 'absolute', top: 50, left: 50 }}>
				<Spinner isGrow={false} />
			</div>

			<div style={{ opacity: loading ? 0.5 : 1 }}>
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
															className={getClassNamesFor(
																'Team_name',
															)}
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
															className={getClassNamesFor(
																'No_agentns',
															)}
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
															<td>{item.Team_name}</td>
															<td>{item.No_agentns}</td>
															<td>{item.LOB.Lob_name}</td>
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
																<Icon
																	size='lg'
																	icon='Eye'
																	color='info'
																	style={{
																		cursor: 'pointer',
																		marginLeft: '10px',
																	}}
																	onClick={() => {
																		navigate(
																			`/users/${id.id}/teams/${item.id}/`,
																		);
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
			</div>

			<DeleteModel
				deleteModalOpen={deleteModalOpen}
				setDeleteModalOpen={setDeleteModalOpen}
				handleDeleteOpration={handleDeleteTeam}
				name={currentTeam?.Team_name}
				alertLable='Delete Team'
			/>
		</>
	);
};

export default Teams;
