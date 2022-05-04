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
import Modal, {
	ModalBody,
	ModalFooter,
	ModalHeader,
	ModalTitle,
} from '../../../../components/bootstrap/Modal';
import Icon from '../../../../components/icon/Icon';
import PaginationButtons, {
	dataPagination,
	PER_COUNT,
} from '../../../../components/PaginationButtons';
import useSortableData from '../../../../hooks/useSortableData';
import Page from '../../../../layout/Page/Page';
import PageWrapper from '../../../../layout/PageWrapper/PageWrapper';
import { deleteAgentsStart, loadAgentsStart } from '../../../../redux/ducks/agents';

const Agents = () => {
	const id = useParams();
	console.log(id);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const { agents } = useSelector((state) => state.agents);
	console.log('agents::::', agents);

	const { items, requestSort, getClassNamesFor } = useSortableData(agents);
	const [currentPage, setCurrentPage] = useState(1);
	// const [currentTeam, setCurrentTeam] = useState(null);
	// const [deleteModalOpen, setDeleteModalOpen] = useState(false);
	const [perPage, setPerPage] = useState(PER_COUNT['5']);
	const [currentAgent, setCurrentAgent] = useState(null);
	const [deleteModalOpen, setDeleteModalOpen] = useState(false);
	useEffect(() => {
		dispatch(loadAgentsStart(Number(id.id)));
	}, [dispatch, id.id]);

	const handleDeleteTeam = () => {
		dispatch(deleteAgentsStart(currentAgent.id));
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
											All Agents
										</CardTitle>
									</CardLabel>
									<CardActions>
										<Button
											icon='PersonAdd'
											color='info'
											isLight
											tag='a'
											to={`/users/${id.id}/teams/agents/create`}>
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
														className={getClassNamesFor('Agent_name')}
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
																		`/users/${id.id}/teams/agents/edit/${item.id}`,
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
			<Modal isOpen={deleteModalOpen} setIsOpen={setDeleteModalOpen} size='lg' isScrollable>
				<ModalHeader>
					<ModalTitle>Confirmation Modal</ModalTitle>
				</ModalHeader>

				<ModalBody>
					<h1>Do you really want to delete {currentAgent?.Agent_name}</h1>
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

export default Agents;
