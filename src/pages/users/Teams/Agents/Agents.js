import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '../../../../components/bootstrap/Button';
import Card, {
	CardActions,
	CardBody,
	CardHeader,
	CardLabel,
	CardTitle,
} from '../../../../components/bootstrap/Card';
import Icon from '../../../../components/icon/Icon';
import PaginationButtons, {
	dataPagination,
	PER_COUNT,
} from '../../../../components/PaginationButtons';
import useSortableData from '../../../../hooks/useSortableData';
import Page from '../../../../layout/Page/Page';
import PageWrapper from '../../../../layout/PageWrapper/PageWrapper';
import { loadAgentsStart } from '../../../../redux/ducks/agents';

const Agents = () => {
	const id = useParams();
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { teams } = useSelector((state) => state.teams);
	const { items, requestSort, getClassNamesFor } = useSortableData(teams);
	const [currentPage, setCurrentPage] = useState(1);
	const [currentTeam, setCurrentTeam] = useState(null);
	const [deleteModalOpen, setDeleteModalOpen] = useState(false);
	const [perPage, setPerPage] = useState(PER_COUNT['5']);

	useEffect(() => {
		dispatch(loadAgentsStart(id.id));
	}, [dispatch, id.id]);
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
											All Agents
										</CardTitle>
									</CardLabel>
									<CardActions>
										<Button
											icon='PersonAdd'
											color='info'
											isLight
											tag='a'
											to={`/users/${id.id}/agents/create`}>
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
													onClick={() => requestSort('Team_name')}
													className='cursor-pointer text-decoration-underline'>
													Teams
													<Icon
														size='lg'
														// className={getClassNamesFor('Team_name')}
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
														// className={getClassNamesFor('No_agentns')}
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
														// className={getClassNamesFor('Lob_name')}
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
														<th>{item.Team_name}</th>
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
			{/* <Modal isOpen={deleteModalOpen} setIsOpen={setDeleteModalOpen} size='lg' isScrollable>
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
			</Modal> */}
		</>
	);
};

export default Agents;
