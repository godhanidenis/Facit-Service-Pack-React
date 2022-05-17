import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes, useNavigate, useParams } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';
import Button from '../../../../components/bootstrap/Button';
import Card, {
	CardActions,
	CardBody,
	CardHeader,
	CardLabel,
	CardTitle,
} from '../../../../components/bootstrap/Card';

import Spinner from '../../../../components/bootstrap/Spinner';
import Toasts from '../../../../components/bootstrap/Toasts';
import Icon from '../../../../components/icon/Icon';
import PaginationButtons, {
	dataPagination,
	PER_COUNT,
} from '../../../../components/PaginationButtons';
import useSortableData from '../../../../hooks/useSortableData';
import Page from '../../../../layout/Page/Page';
import PageWrapper from '../../../../layout/PageWrapper/PageWrapper';
import { deleteAgentsStart, loadAgentsStart } from '../../../../redux/ducks/agents';
import DeleteModel from '../../../../common/ConfirmationModal';
import AddEditAgent from './AddEditAgent';

const AgentPage = () => {
	return (
		<div className='w-100 h-100'>
			<Routes>
				<Route exact path='' element={<Agents />} />
				<Route exact path='create' element={<AddEditAgent />} />
				<Route exact path='edit/:agentId' element={<AddEditAgent />} />
			</Routes>
		</div>
	);
};
const Agents = () => {
	const id = useParams();

	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { addToast } = useToasts();
	const { agents, loading, error } = useSelector((state) => state.agents);

	const { items, requestSort, getClassNamesFor } = useSortableData(agents);
	const [currentPage, setCurrentPage] = useState(1);

	const [perPage, setPerPage] = useState(PER_COUNT['5']);
	const [currentAgent, setCurrentAgent] = useState(null);
	const [deleteModalOpen, setDeleteModalOpen] = useState(false);

	useEffect(() => {
		if (!agents.length) {
			dispatch(loadAgentsStart(Number(id.id)));
		}
	}, [agents.length, dispatch, id.id]);

	useEffect(() => {
		console.log('loading???????????', error);
		if (error !== '') {
			addToast(
				<Toasts
					title='Error in Agents'
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

	const handleDeleteTeam = () => {
		dispatch(deleteAgentsStart(currentAgent.id));
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
				style={{ position: 'absolute', top: 50, left: 50 }}>
				<Spinner isGrow={false} />
			</div>
			<div style={{ opacity: loading ? 0.5 : 1 }}>
				<PageWrapper>
					<Page className='p-0'>
						<div className='row'>
							<div className='col-xxl-12'>
								<hr style={{ opacity: '0.05' }} />
								<Card>
									<CardHeader>
										<CardLabel icon='People' iconColor='info'>
											<CardTitle tag='h4' className='h5'>
												All Agents
											</CardTitle>
										</CardLabel>
										<CardActions>
											<Button
												icon='PersonAdd'
												color='info'
												isLight
												tag='a'
												to={`/users/${id.id}/teams/${id.teamId}/agents/create`}>
												New Agent
											</Button>
										</CardActions>
									</CardHeader>
									<CardBody className='table-responsive'>
										<table className='table table-modern table-hover'>
											<thead>
												<tr>
													<th
														scope='col'
														onClick={() => requestSort('Agent_id')}
														className='cursor-pointer text-decoration-underline'>
														Agent Id
														<Icon
															size='lg'
															className={getClassNamesFor('Agent_id')}
															icon='FilterList'
														/>
													</th>

													<th
														scope='col'
														onClick={() => requestSort('Agent_name')}
														className='cursor-pointer text-decoration-underline'>
														Agent Name
														<Icon
															size='lg'
															className={getClassNamesFor(
																'Agent_name',
															)}
															icon='FilterList'
														/>
													</th>

													<th
														scope='col'
														onClick={() => requestSort('phone_no')}
														className='cursor-pointer text-decoration-underline'>
														Phone Number
														<Icon
															size='lg'
															className={getClassNamesFor('phone_no')}
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
															<th>{item.Agent_id}</th>
															<td>{item.Agent_name}</td>
															<td>{item.phone_no}</td>

															<td>
																<Icon
																	size='lg'
																	icon='Edit'
																	color='info'
																	style={{ cursor: 'pointer' }}
																	onClick={() => {
																		navigate(
																			`/users/${id.id}/teams/${id.teamId}/agents/edit/${item.id}`,
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
																		setCurrentAgent(item);
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
										label='No. Of Agents'
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
				name={currentAgent?.Agent_name}
				alertLable='Delete Agent'
			/>
		</>
	);
};

export default AgentPage;
