import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useToasts } from 'react-toast-notifications';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import Page from '../../../layout/Page/Page';
import { demoPages } from '../../../menu';
import Card, {
	CardActions,
	CardBody,
	CardHeader,
	CardLabel,
	CardTitle,
} from '../../../components/bootstrap/Card';
import Button from '../../../components/bootstrap/Button';
import Icon from '../../../components/icon/Icon';
import useSortableData from '../../../hooks/useSortableData';
import { deleteLobsStart, loadLobsStart } from '../../../redux/ducks/lobs';
import PaginationButtons, {
	dataPagination,
	PER_COUNT,
} from '../../../components/PaginationButtons';
import AddUpdateLob from './AddUpdateLob';
import DeleteModeal from '../../DeleteModeal';
import Spinner from '../../../components/bootstrap/Spinner';
import Toasts from '../../../components/bootstrap/Toasts';

const Lobs = () => {
	return (
		<div className='w-100 h-100'>
			<Routes>
				<Route exact path='' element={<Lobstbl />} />
				<Route exact path='create' element={<AddUpdateLob />} />
				<Route exact path='edit/:lobid' element={<AddUpdateLob />} />
			</Routes>
		</div>
	);
};

const Lobstbl = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const Id = useParams();

	const [currentPage, setCurrentPage] = useState(1);
	const [perPage, setPerPage] = useState(PER_COUNT['5']);
	const [currentLob, setcurrentLob] = useState(null);
	const [deleteModalOpen, setDeleteModalOpen] = useState(false);

	const { lobs,loading ,error } = useSelector((state) => state.lobs);
	const { addToast } = useToasts();	

	useEffect(() => {
		console.log('first');
		dispatch(loadLobsStart(Id.id));
	}, [dispatch, Id.id]);
	
	useEffect(() => {
		console.log("loading???????????", error);		
		if(error!==''){
		addToast(
			<Toasts
				title='Error in Lobs'
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
		)
		}
	}, [error]);
	const { items, requestSort, getClassNamesFor } = useSortableData(lobs);

	const handleDeleteLob = () => {
		dispatch(deleteLobsStart(currentLob.id));
		setDeleteModalOpen(false);
	};

	return (
		<>
		{loading ?
<div className='d-flex align-items-center justify-content-center w-100 h-100'>
	<Spinner isGrow={false} color={'red'} />
</div>:
			<PageWrapper title={demoPages.sales.subMenu.dashboard.text}>
				<Page container='fluid'>
					<div className='row'>
						<div className='col-xxl-12'>
							<Card>
								<CardHeader>
									<CardLabel icon='People' iconColor='info'>
										<CardTitle tag='h4' className='h5'>
											All Lobs
										</CardTitle>
									</CardLabel>
									<CardActions>
										<Button
											icon='PersonAdd'
											color='info'
											isLight
											tag='a'
											to={`/users/${Id.id}/lobs/create`}>
											New Lob
										</Button>
									</CardActions>
								</CardHeader>
								<CardBody className='table-responsive'>
									<table className='table table-modern table-hover'>
										<thead>
											<tr>
												<th
													scope='col'
													onClick={() => requestSort('Lob_Name')}
													className='cursor-pointer text-decoration-underline'>
													Lob Name
													<Icon
														size='lg'
														className={getClassNamesFor('Lob_Name')}
														icon='FilterList'
													/>
												</th>

												<th
													scope='col'
													onClick={() => requestSort('No_of_teams')}
													className='cursor-pointer text-decoration-underline'>
													No_of_teams
													<Icon
														size='lg'
														className={getClassNamesFor('No_of_teams')}
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
														<td>{item.Lob_name}</td>
														<td>{item.No_of_teams}</td>
														<td>
															<Icon
																size='lg'
																icon='Edit'
																color='info'
																style={{ cursor: 'pointer' }}
																onClick={() => {
																	navigate(
																		`/users/${Id.id}/lobs/edit/${item.id}`,
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
																	setcurrentLob(item);
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
									label='No. Of Lobs'
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
			<DeleteModeal setdeleteModalOpen={deleteModalOpen} issetDeleteModalOpen={setDeleteModalOpen} sethandleDeleteOpration={handleDeleteLob} agentName={currentLob?.Lob_name} alertLable='LOB will delete'/>
			{/* <Modal isOpen={deleteModalOpen} setIsOpen={setDeleteModalOpen} size='lg' isScrollable isCentered={true}>
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
						<span style={{color:'OrangeRed' , fontSize:25 , marginLeft:"10px"}}><b>Lob delete</b></span>
					</div>
					</ModalTitle>
				</ModalHeader>

				<ModalBody>
					<h4 style={{marginLeft:"20px"}}>Do you really want to delete {currentLob?.Lob_name}?</h4>
				</ModalBody>

				<ModalFooter>
				<Button color='dark' onClick={() => setDeleteModalOpen(false)}>
						cancle
					</Button>
					<Button color='danger' onClick={() => handleDeleteLob()}>
						ok
					</Button>
				</ModalFooter>
			</Modal> */}
		</>
	);
};

export default Lobs;
