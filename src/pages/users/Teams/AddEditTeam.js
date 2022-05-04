import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import Page from '../../../layout/Page/Page';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import Card, {
	CardActions,
	CardBody,
	CardHeader,
	CardLabel,
	CardTitle,
} from '../../../components/bootstrap/Card';
import Button from '../../../components/bootstrap/Button';
import FormGroup from '../../../components/bootstrap/forms/FormGroup';
import Input from '../../../components/bootstrap/forms/Input';

import useDarkMode from '../../../hooks/useDarkMode';
import Modal, {
	ModalBody,
	ModalFooter,
	ModalHeader,
	ModalTitle,
} from '../../../components/bootstrap/Modal';
import Select from '../../../components/bootstrap/forms/Select';
import Option from '../../../components/bootstrap/Option';
import Label from '../../../components/bootstrap/forms/Label';
import { createTeamsStart, updateTeamsStart } from '../../../redux/ducks/teams';
import {
	createLocationsStart,
	deleteLocationsStart,
	updateLocationStart,
} from '../../../redux/ducks/locations';
import { createTeamLeadsStart, deleteTeamLeadsStart } from '../../../redux/ducks/teamLeads';
import { createLobsStart, deleteLobsStart, updateLobsStart } from '../../../redux/ducks/lobs';

const AddEditTeam = () => {
	const id = useParams();

	// eslint-disable-next-line react-hooks/exhaustive-deps
	const initialLocation = {
		Location_name: '',
		User: Number(id.id),
	};

	const initialTeamLead = {
		TeamLead_name: '',
		User: Number(id.id),
	};
	const initialLob = {
		Lob_name: '',
		User: Number(id.id),
	};

	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [editMode, setEditMode] = useState(false);

	const { darkModeStatus } = useDarkMode();

	const [addLocationModalOpen, setAddLocationModalOpen] = useState(false);
	const [formLocationValue, setFormLocationValue] = useState(initialLocation);
	const [locationId, setLocationId] = useState();
	const [locationEditMode, setLocationEditMode] = useState(false);

	const [teamLeadModalOpen, setTeamLeadModalOpen] = useState(false);
	const [formTeamLeadValue, setFormTeamLeadValue] = useState(initialTeamLead);

	const [lobModalOpen, setLobModalOpen] = useState(false);
	const [formLobValue, setFormLobValue] = useState(initialLob);
	const [lobEditMode, setLobEditMode] = useState(false);
	const [lobId, setLobId] = useState();

	const { Location_name } = formLocationValue;
	const { TeamLead_name } = formTeamLeadValue;
	const { Lob_name } = formLobValue;
	const {
		register,
		handleSubmit,
		formState: { errors },
		setValue,
		reset,
		getValues,
	} = useForm();

	const { teams } = useSelector((state) => state.teams);

	const { locations } = useSelector((state) => state.locations);

	const { teamLeads } = useSelector((state) => state.teamLeads);

	const { lobs } = useSelector((state) => state.lobs);

	const onChangeLocationValue = (e) => {
		const { name, value } = e.target;
		setFormLocationValue({ ...formLocationValue, [name]: value });
	};
	useEffect(() => {
		if (locationId) {
			setLocationEditMode(true);
			const singleLocation = locations.find((location) => location.id === Number(locationId));
			setFormLocationValue({ ...singleLocation });
			console.log('first', singleLocation);
		} else {
			setLocationEditMode(false);
			setFormLocationValue({ ...initialLocation });
		}

		if (lobId) {
			setLobEditMode(true);
			const singleLob = lobs.find((lob) => lob.id === Number(lobId));
			setFormLobValue({ ...singleLob });
			console.log('first', singleLob);
		} else {
			setLobEditMode(false);
			setFormLobValue({ ...initialLob });
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [locationId, locations, lobId, lobs]);

	const handleAddLocation = () => {
		if (Location_name) {
			if (locationEditMode) {
				dispatch(
					updateLocationStart({ id: locationId, toBeUpdatedLocation: formLocationValue }),
				);
				setAddLocationModalOpen(false);
				setLocationId();
			} else {
				dispatch(createLocationsStart(formLocationValue));
				setAddLocationModalOpen(false);
			}
		}
	};

	const handleLocationDelete = () => {
		const locationId = getValues('Location');

		dispatch(deleteLocationsStart(Number(locationId)));
	};

	const onChangeTeamLeadValue = (e) => {
		const { name, value } = e.target;
		setFormTeamLeadValue({ ...formTeamLeadValue, [name]: value });
	};

	const handleAddTeamLead = () => {
		if (TeamLead_name) {
			dispatch(createTeamLeadsStart(formTeamLeadValue));
			setTeamLeadModalOpen(false);
		}
	};
	const handleTeamLeadDelete = () => {
		const teamLeadId = getValues('Team_lead');

		dispatch(deleteTeamLeadsStart(Number(teamLeadId)));
	};

	const onChangeLobValue = (e) => {
		const { name, value } = e.target;
		setFormLobValue({ ...formLobValue, [name]: value });
	};

	const handleAddLob = () => {
		if (Lob_name) {
			if (lobEditMode) {
				dispatch(updateLobsStart({ id: lobId, toBeUpdatedLob: formLobValue }));
				setLobModalOpen(false);
				setLobId();
			} else {
				dispatch(createLobsStart(formLobValue));
				setLobModalOpen(false);
			}
		}
	};

	const handleLobDelete = () => {
		const lobId = getValues('LOB');

		dispatch(deleteLobsStart(Number(lobId)));
	};

	useEffect(() => {
		if (id.id1) {
			setEditMode(true);

			if (teams.length) {
				const singleTeam = teams.find((team) => team.id === Number(id.id1));

				setValue('Team_name', singleTeam.Team_name);

				setValue('Location', singleTeam.Location.id);
				setValue('Team_lead', singleTeam.Team_lead.id);
				setValue('LOB', singleTeam.LOB.id);
			}
		} else {
			setEditMode(false);
		}
	}, [id, teams, setValue]);

	const onSubmit = (data) => {
		console.log('AddEdit FormData', data);

		const formData = {
			Team_name: data.Team_name,
			Location: Number(data.Location),
			Team_lead: Number(data.Team_lead),
			LOB: Number(data.LOB),
			User: Number(id.id),
		};

		if (editMode) {
			dispatch(updateTeamsStart({ id: id.id1, toBeUpdatedTeam: formData }));
			navigate(`/users/${id.id}/teams`);
		} else {
			dispatch(createTeamsStart(formData));
			navigate(`/users/${id.id}/teams`);
		}
	};
	const onError = (errors) => console.log('Errors Occurred !! :', errors);
	return (
		<>
			<PageWrapper className='mt-3'>
				<Page className='p-0'>
					<div className='row h-100 align-items-center justify-content-center'>
						<div className='col-xl-4 col-lg-6 col-md-8 shadow-3d-container'>
							<Card className='shadow-3d-dark'>
								<CardHeader>
									<CardLabel icon='People' iconColor='info'>
										<CardTitle tag='h4' className='h5'>
											{!editMode ? 'Add Team Details' : 'Update Team Details'}
										</CardTitle>
									</CardLabel>
									<CardActions>
										<Button
											icon='Backspace'
											color='info'
											isLight
											tag='a'
											to={`/users/${id.id}/teams`}>
											Back to Teams
										</Button>
									</CardActions>
								</CardHeader>
								<CardBody>
									<form
										className='row g-4'
										onSubmit={handleSubmit(onSubmit, onError)}
										onReset={reset}>
										<div className='col-12'>
											<FormGroup
												id='Team_name'
												isFloating
												label='Your Team Name'>
												<Input
													autoComplete='off'
													{...register('Team_name', {
														required: 'Team Name is required',
													})}
												/>
											</FormGroup>
											{errors.Team_name?.message}
										</div>

										<div className='col-12'>
											<div className='row'>
												<Label>Select Location</Label>
												<div className='col-4'>
													<FormGroup>
														<Select
															size='sm'
															ariaLabel='Select Location'
															{...register('Location', {
																required: 'Location is required',
															})}>
															<Option value=''>
																Select Location
															</Option>
															{locations?.map((loc) => {
																return (
																	<Option
																		key={loc?.id}
																		value={loc?.id}>
																		{loc?.Location_name}
																	</Option>
																);
															})}
														</Select>
														{errors.Location?.message}
													</FormGroup>
												</div>
												<div className='col-4'>
													<Button
														icon='edit'
														color={darkModeStatus ? 'dark' : 'info'}
														onClick={() => {
															setAddLocationModalOpen(true);
															setLocationId(getValues('Location'));
														}}
													/>
													<Button
														icon='delete'
														color={darkModeStatus ? 'dark' : 'danger'}
														onClick={handleLocationDelete}
													/>
												</div>
												<div className='col-4'>
													<Button
														icon='add'
														isLight
														color={darkModeStatus ? 'dark' : 'info'}
														onClick={() => {
															setAddLocationModalOpen(true);
															setLocationId();
														}}>
														Add Location
													</Button>
												</div>
											</div>
										</div>

										<div className='col-12'>
											<div className='row'>
												<Label>Select Team Lead</Label>
												<div className='col-4'>
													<FormGroup>
														<Select
															size='sm'
															ariaLabel='Select Team Lead'
															{...register('Team_lead', {
																required: 'Team Lead is required',
															})}>
															<Option value=''>
																Select Team Lead
															</Option>
															{teamLeads?.map((lead) => {
																return (
																	<Option
																		key={lead?.id}
																		value={lead?.id}>
																		{lead?.TeamLead_name}
																	</Option>
																);
															})}
														</Select>
														{errors.Team_lead?.message}
													</FormGroup>
												</div>
												<div className='col-4'>
													<Button
														icon='edit'
														color={darkModeStatus ? 'dark' : 'info'}
													/>
													<Button
														icon='delete'
														color={darkModeStatus ? 'dark' : 'danger'}
														onClick={handleTeamLeadDelete}
													/>
												</div>
												<div className='col-4'>
													<Button
														icon='add'
														isLight
														color={darkModeStatus ? 'dark' : 'info'}
														onClick={() => {
															setTeamLeadModalOpen(true);
														}}>
														Add Team Lead
													</Button>
												</div>
											</div>
										</div>

										<div className='col-12'>
											<div className='row'>
												<Label>Select LOB</Label>
												<div className='col-4'>
													<FormGroup>
														<Select
															size='sm'
															ariaLabel='Select LOB'
															{...register('LOB', {
																required: 'LOB is required',
															})}>
															<Option value=''>Select LOB</Option>
															{lobs?.map((lob) => {
																return (
																	<Option
																		key={lob?.id}
																		value={lob?.id}>
																		{lob?.Lob_name}
																	</Option>
																);
															})}
														</Select>
														{errors.LOB?.message}
													</FormGroup>
												</div>
												<div className='col-4'>
													<Button
														icon='edit'
														color={darkModeStatus ? 'dark' : 'info'}
														onClick={() => {
															setLobModalOpen(true);
															setLobId(getValues('LOB'));
														}}
													/>
													<Button
														icon='delete'
														color={darkModeStatus ? 'dark' : 'danger'}
														onClick={handleLobDelete}
													/>
												</div>
												<div className='col-4'>
													<Button
														icon='add'
														isLight
														color={darkModeStatus ? 'dark' : 'info'}
														onClick={() => {
															setLobModalOpen(true);
															setLobId();
														}}>
														Add Lob
													</Button>
												</div>
											</div>
										</div>

										<div className='col-12'>
											<Button
												color={editMode ? 'success' : 'info'}
												className='w-100 py-3'
												type='submit'>
												{!editMode ? 'Create' : 'Update'}
											</Button>
										</div>
									</form>
								</CardBody>
							</Card>
						</div>
					</div>
				</Page>
			</PageWrapper>

			<Modal
				isOpen={addLocationModalOpen}
				setIsOpen={setAddLocationModalOpen}
				size='lg'
				isScrollable>
				<ModalHeader>
					<ModalTitle>
						{!locationEditMode ? 'Add Location Modal' : 'Edit Location Modal'}
					</ModalTitle>
				</ModalHeader>

				<ModalBody>
					<form className='row g-4'>
						<div className='col-12'>
							<FormGroup id='Location_name' isFloating label='Your Location'>
								<Input
									autoComplete='off'
									value={Location_name || ''}
									onChange={onChangeLocationValue}
								/>
							</FormGroup>
						</div>
					</form>
				</ModalBody>

				<ModalFooter>
					<Button
						color={locationEditMode ? 'success' : 'info'}
						onClick={() => handleAddLocation()}>
						{!locationEditMode ? 'Create' : 'Update'}
					</Button>
				</ModalFooter>
			</Modal>

			<Modal
				isOpen={teamLeadModalOpen}
				setIsOpen={setTeamLeadModalOpen}
				size='lg'
				isScrollable>
				<ModalHeader>
					<ModalTitle>Add Team Lead Modal</ModalTitle>
				</ModalHeader>

				<ModalBody>
					<form className='row g-4'>
						<div className='col-12'>
							<FormGroup id='TeamLead_name' isFloating label='Your Team Lead'>
								<Input
									autoComplete='off'
									value={TeamLead_name}
									onChange={onChangeTeamLeadValue}
								/>
							</FormGroup>
						</div>
					</form>
				</ModalBody>

				<ModalFooter>
					<Button color='info' onClick={() => handleAddTeamLead()}>
						Submit
					</Button>
				</ModalFooter>
			</Modal>

			<Modal isOpen={lobModalOpen} setIsOpen={setLobModalOpen} size='lg' isScrollable>
				<ModalHeader>
					<ModalTitle>{!lobEditMode ? 'Add Lob Modal' : 'Edit Lob Modal'}</ModalTitle>
				</ModalHeader>

				<ModalBody>
					<form className='row g-4'>
						<div className='col-12'>
							<FormGroup id='Lob_name' isFloating label='Your Lob name'>
								<Input
									autoComplete='off'
									value={Lob_name}
									onChange={onChangeLobValue}
								/>
							</FormGroup>
						</div>
					</form>
				</ModalBody>

				<ModalFooter>
					<Button color={lobEditMode ? 'success' : 'info'} onClick={() => handleAddLob()}>
						{!lobEditMode ? 'Create' : 'Update'}
					</Button>
				</ModalFooter>
			</Modal>
		</>
	);
};

export default AddEditTeam;
