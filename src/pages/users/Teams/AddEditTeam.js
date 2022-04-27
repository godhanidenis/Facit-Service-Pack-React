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
<<<<<<< HEAD

const AddEditTeam = () => {
	const id = useParams();
	console.log('id', id);

	const initialLocation = {
		Location_name: '',
		User: id.id,
=======
import { createLocationsStart, deleteLocationsStart } from '../../../redux/ducks/locations';
import { createTeamLeadsStart, deleteTeamLeadsStart } from '../../../redux/ducks/teamLeads';
import { createLobsStart, deleteLobsStart } from '../../../redux/ducks/lobs';

const AddEditTeam = () => {
	const id = useParams();

	const initialLocation = {
		Location_name: '',
		User: Number(id.id),
>>>>>>> 094e58a51e736b37d547f579df49db7267591eaa
	};

	const initialTeamLead = {
		TeamLead_name: '',
<<<<<<< HEAD
		User: id.id,
=======
		User: Number(id.id),
>>>>>>> 094e58a51e736b37d547f579df49db7267591eaa
	};
	const initialLob = {
		Lob_name: '',
		No_of_teams: '',
<<<<<<< HEAD
		User: id.id,
	};
=======
		User: Number(id.id),
	};

>>>>>>> 094e58a51e736b37d547f579df49db7267591eaa
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [editMode, setEditMode] = useState(false);

	const { darkModeStatus } = useDarkMode();
<<<<<<< HEAD
	const [locationList, setLocationList] = useState();
	const [addLocationModalOpen, setAddLocationModalOpen] = useState(false);
	const [selectedLocation, setSelectedLocation] = useState();
	const [formLocationValue, setFormLocationValue] = useState(initialLocation);

	const [teamLeadList, setTeamLeadList] = useState();
	const [teamLeadModalOpen, setTeamLeadModalOpen] = useState(false);
	const [selectedTeamLead, setSelectedTeamLead] = useState();
	const [formTeamLeadValue, setFormTeamLeadValue] = useState(initialTeamLead);

	const [lobList, setLobList] = useState();
	const [selectedLob, setSelectedLob] = useState([]);
	const [lobModalOpen, setLobModalOpen] = useState(false);
	const [formLobValue, setFormLobValue] = useState(initialLob);

	const { Location_name, User } = formLocationValue;
	const { TeamLead_name, User: userId } = formTeamLeadValue;
	const { Lob_name, No_of_teams, User: userID } = formLobValue;

=======

	const [addLocationModalOpen, setAddLocationModalOpen] = useState(false);
	const [formLocationValue, setFormLocationValue] = useState(initialLocation);

	const [teamLeadModalOpen, setTeamLeadModalOpen] = useState(false);
	const [formTeamLeadValue, setFormTeamLeadValue] = useState(initialTeamLead);

	const [lobModalOpen, setLobModalOpen] = useState(false);
	const [formLobValue, setFormLobValue] = useState(initialLob);

	const { Location_name } = formLocationValue;
	const { TeamLead_name } = formTeamLeadValue;
	const { Lob_name, No_of_teams } = formLobValue;
>>>>>>> 094e58a51e736b37d547f579df49db7267591eaa
	const {
		register,
		handleSubmit,
		formState: { errors },
		setValue,
		reset,
<<<<<<< HEAD
	} = useForm();
	const { teams } = useSelector((state) => state.teams);
	console.log('teams', teams);
	const GetLocation = async () => {
		const location = await axios.get(
			`http://3.215.147.147/admin_panel/managelocation/?user_id=${id.id}`,
		);

		await setLocationList(location.data.data);
	};
	const handleAddLocation = async () => {
		const addLocation = await axios.post(
			'http://3.215.147.147/admin_panel/managelocation/',
			formLocationValue,
		);

		setAddLocationModalOpen(false);
		await GetLocation();
	};
=======
		getValues,
	} = useForm();

	const { teams } = useSelector((state) => state.teams);

	const { locations } = useSelector((state) => state.locations);

	const { teamLeads } = useSelector((state) => state.teamLeads);

	const { lobs } = useSelector((state) => state.lobs);

>>>>>>> 094e58a51e736b37d547f579df49db7267591eaa
	const onChangeLocationValue = (e) => {
		const { name, value } = e.target;
		setFormLocationValue({ ...formLocationValue, [name]: value });
	};
<<<<<<< HEAD

	const handleLocationDelete = async () => {
		const deleteLocation = await axios.delete(
			`http://3.215.147.147/admin_panel/managelocation/${selectedLocation}/`,
		);
		await GetLocation();
	};
	const GetTeamLead = async () => {
		const teamLead = await axios.get(
			`http://3.215.147.147/admin_panel/manageteamlead/?user_id=${id.id}`,
		);

		await setTeamLeadList(teamLead.data.data);
=======
	const handleAddLocation = () => {
		dispatch(createLocationsStart(formLocationValue));
		setAddLocationModalOpen(false);
	};

	const handleLocationDelete = () => {
		const locationId = getValues('Location');

		dispatch(deleteLocationsStart(Number(locationId)));
>>>>>>> 094e58a51e736b37d547f579df49db7267591eaa
	};

	const onChangeTeamLeadValue = (e) => {
		const { name, value } = e.target;
		setFormTeamLeadValue({ ...formTeamLeadValue, [name]: value });
	};
<<<<<<< HEAD
	const handleAddTeamLead = async () => {
		const addTeamLead = await axios.post(
			'http://3.215.147.147/admin_panel/manageteamlead/',
			formTeamLeadValue,
		);

		setTeamLeadModalOpen(false);
		await GetTeamLead();
	};
	const handleTeamLeadDelete = async () => {
		const deleteLocation = await axios.delete(
			`http://3.215.147.147/admin_panel/manageteamlead/${selectedTeamLead}/`,
		);
		await GetTeamLead();
	};

	const GetLob = async () => {
		const allLob = await axios.get(
			`http://3.215.147.147/admin_panel/managelob/?user_id=${id.id}`,
		);
		await setLobList(allLob.data.data);
	};
=======
	const handleAddTeamLead = () => {
		dispatch(createTeamLeadsStart(formTeamLeadValue));
		setTeamLeadModalOpen(false);
	};
	const handleTeamLeadDelete = () => {
		const teamLeadId = getValues('Team_lead');

		dispatch(deleteTeamLeadsStart(Number(teamLeadId)));
	};

>>>>>>> 094e58a51e736b37d547f579df49db7267591eaa
	const onChangeLobValue = (e) => {
		const { name, value } = e.target;
		setFormLobValue({ ...formLobValue, [name]: value });
	};

<<<<<<< HEAD
	const handleAddLob = async () => {
		const addLob = await axios.post(
			'http://3.215.147.147/admin_panel/managelob/',
			formLobValue,
		);

		setLobModalOpen(false);
		await GetLob();
	};

	const handleLobDelete = async () => {
		const deleteLob = await axios.delete(
			`http://3.215.147.147/admin_panel/managelob/${selectedLob}/`,
		);
		await GetLob();
	};

	useEffect(() => {
		GetLocation();
		GetTeamLead();
		GetLob();
	}, []);
=======
	const handleAddLob = () => {
		dispatch(createLobsStart(formLobValue));
		setLobModalOpen(false);
	};

	const handleLobDelete = () => {
		const lobId = getValues('LOB');

		dispatch(deleteLobsStart(Number(lobId)));
	};
>>>>>>> 094e58a51e736b37d547f579df49db7267591eaa

	useEffect(() => {
		if (id.id1) {
			setEditMode(true);

			if (teams.length) {
				const singleTeam = teams.find((team) => team.id === Number(id.id1));

<<<<<<< HEAD
				console.log('singleTeam', singleTeam.LOB[0].id);
				// const fields = ['Team_name', 'No_agentns', 'Location', 'Team_lead', 'LOB'];

				// fields.forEach((field) => setValue(field, singleTeam[field]));

				setSelectedLocation(singleTeam.Location.id);
				setSelectedTeamLead(singleTeam.Team_lead.id);
				setSelectedLob(singleTeam?.LOB[0]?.id);

=======
>>>>>>> 094e58a51e736b37d547f579df49db7267591eaa
				setValue('Team_name', singleTeam.Team_name);
				setValue('No_agentns', singleTeam.No_agentns);
				setValue('Location', singleTeam.Location.id);
				setValue('Team_lead', singleTeam.Team_lead.id);
				setValue('LOB', singleTeam?.LOB[0]?.id);
			}
		} else {
			setEditMode(false);
		}
	}, [id, teams, setValue]);

	const onSubmit = (data) => {
<<<<<<< HEAD
		const Lob = [];
		console.log('AddEdit FormData', data);
		console.log('Team_name', data.Team_name);
		console.log('Location', Number(data.Location));
		console.log('No_agentns', Number(data.No_agentns));
		console.log('Team_lead', Number(data.Team_lead));
		console.log('LOB', Number(data.LOB));

		// const formData = new FormData();
		// formData.append('Team_name', data.Team_name);
		// formData.append('No_agentns', data.No_agentns);
		// formData.append('Location', data.Location);
		// formData.append('Team_lead', data.Team_lead);
		// formData.append('LOB', data.LOB);
		// formData.append('User', id.id);
		// formData.append('Team_name', 'bhargesh');
		// formData.append('No_agentns', 10);
		// formData.append('Location', 16);
		// formData.append('Team_lead', 10);
		// formData.append('LOB', [17]);
		// formData.append('User', 113);

		// console.log('formData', formData);
		// if (editMode) {
		// 	dispatch(updateTeamsStart({ id: id.id1, toBeUpdatedTeam: formData }));
		// 	navigate(`/users/${id.id}/teams`);
		// } else {
		// 	dispatch(
		// 		createTeamsStart({
		// 			Location: 16,
		// 			User: 113,
		// 			Team_lead: 10,
		// 			Team_name: 'team1003',
		// 			No_agentns: 5,
		// 			LOB: [17],
		// 		}),
		// 	);
		// 	navigate(`/users/${id.id}/teams`);
		// }
=======
		console.log('AddEdit FormData', data);

		const formData = {
			Team_name: data.Team_name,
			Location: Number(data.Location),
			No_agentns: Number(data.No_agentns),
			Team_lead: Number(data.Team_lead),
			LOB: [Number(data.LOB)],
			User: id.id,
		};

		if (editMode) {
			dispatch(updateTeamsStart({ id: id.id1, toBeUpdatedTeam: formData }));
			navigate(`/users/${id.id}/teams`);
		} else {
			dispatch(createTeamsStart(formData));
			navigate(`/users/${id.id}/teams`);
		}
>>>>>>> 094e58a51e736b37d547f579df49db7267591eaa
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
											<FormGroup
												id='No_agentns'
												isFloating
												label='Number od agents'>
												<Input
													autoComplete='off'
													type='number'
													{...register('No_agentns', {
														required: 'Number of agents is required',
													})}
												/>
											</FormGroup>
											{errors.No_agentns?.message}
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
<<<<<<< HEAD
															})}
															value={selectedLocation}
															onChange={(e) => {
																console.log(
																	'first',
																	e.target.value,
																);
																setSelectedLocation(e.target.value);
															}}>
															<Option value=''>
																Select Location
															</Option>
															{locationList &&
																locationList?.map((loc) => {
																	return (
																		<Option
																			key={loc?.id}
																			value={loc?.id}>
																			{loc?.Location_name}
																		</Option>
																	);
																})}
=======
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
>>>>>>> 094e58a51e736b37d547f579df49db7267591eaa
														</Select>
														{errors.Location?.message}
													</FormGroup>
												</div>
												<div className='col-4'>
													<Button
<<<<<<< HEAD
														icon='edit'
														color={darkModeStatus && 'dark'}
													/>
													<Button
														icon='delete'
														color={darkModeStatus && 'dark'}
=======
														icon='delete'
														color={darkModeStatus ? 'dark' : 'danger'}
>>>>>>> 094e58a51e736b37d547f579df49db7267591eaa
														onClick={handleLocationDelete}
													/>
												</div>
												<div className='col-4'>
													<Button
														icon='add'
<<<<<<< HEAD
														color={darkModeStatus && 'dark'}
=======
														isLight
														color={darkModeStatus ? 'dark' : 'info'}
>>>>>>> 094e58a51e736b37d547f579df49db7267591eaa
														onClick={() => {
															setAddLocationModalOpen(true);
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
<<<<<<< HEAD
															})}
															value={selectedTeamLead}
															onChange={(e) => {
																console.log(
																	'first',
																	e.target.value,
																);
																setSelectedTeamLead(e.target.value);
															}}>
															<Option value=''>
																Select Team Lead
															</Option>
															{teamLeadList &&
																teamLeadList?.map((lead) => {
																	return (
																		<Option
																			key={lead?.id}
																			value={lead?.id}>
																			{lead?.TeamLead_name}
																		</Option>
																	);
																})}
=======
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
>>>>>>> 094e58a51e736b37d547f579df49db7267591eaa
														</Select>
														{errors.Team_lead?.message}
													</FormGroup>
												</div>
												<div className='col-4'>
													<Button
<<<<<<< HEAD
														icon='edit'
														color={darkModeStatus && 'dark'}
													/>
													<Button
														icon='delete'
														color={darkModeStatus && 'dark'}
=======
														icon='delete'
														color={darkModeStatus ? 'dark' : 'danger'}
>>>>>>> 094e58a51e736b37d547f579df49db7267591eaa
														onClick={handleTeamLeadDelete}
													/>
												</div>
												<div className='col-4'>
													<Button
														icon='add'
<<<<<<< HEAD
														color={darkModeStatus && 'dark'}
=======
														isLight
														color={darkModeStatus ? 'dark' : 'info'}
>>>>>>> 094e58a51e736b37d547f579df49db7267591eaa
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
<<<<<<< HEAD
															})}
															value={selectedLob}
															onChange={(e) => {
																console.log('first', [
																	e.target.value,
																]);
																setSelectedLob([e.target.value]);
															}}>
															<Option value=''>Select LOB</Option>
															{lobList &&
																lobList?.map((lob) => {
																	return (
																		<Option
																			key={lob?.id}
																			value={lob?.id}>
																			{lob?.Lob_name}
																		</Option>
																	);
																})}
=======
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
>>>>>>> 094e58a51e736b37d547f579df49db7267591eaa
														</Select>
														{errors.LOB?.message}
													</FormGroup>
												</div>
												<div className='col-4'>
													<Button
<<<<<<< HEAD
														icon='edit'
														color={darkModeStatus && 'dark'}
													/>
													<Button
														icon='delete'
														color={darkModeStatus && 'dark'}
=======
														icon='delete'
														color={darkModeStatus ? 'dark' : 'danger'}
>>>>>>> 094e58a51e736b37d547f579df49db7267591eaa
														onClick={handleLobDelete}
													/>
												</div>
												<div className='col-4'>
													<Button
														icon='add'
<<<<<<< HEAD
														color={darkModeStatus && 'dark'}
=======
														isLight
														color={darkModeStatus ? 'dark' : 'info'}
>>>>>>> 094e58a51e736b37d547f579df49db7267591eaa
														onClick={() => {
															setLobModalOpen(true);
														}}>
														Add Team Lead
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
					<ModalTitle>Add Location Modal</ModalTitle>
				</ModalHeader>

				<ModalBody>
					<form className='row g-4'>
						<div className='col-12'>
							<FormGroup id='Location_name' isFloating label='Your Location'>
								<Input
									autoComplete='off'
									value={Location_name}
									onChange={onChangeLocationValue}
								/>
							</FormGroup>
						</div>
					</form>
				</ModalBody>

				<ModalFooter>
					<Button color='info' onClick={() => handleAddLocation()}>
						Submit
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
					<ModalTitle>Add LOB Modal</ModalTitle>
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
						<div className='col-12'>
							<FormGroup id='No_of_teams' isFloating label='Number of teams'>
								<Input
									autoComplete='off'
									type='number'
									value={No_of_teams}
									onChange={onChangeLobValue}
								/>
							</FormGroup>
						</div>
					</form>
				</ModalBody>

				<ModalFooter>
					<Button color='info' onClick={() => handleAddLob()}>
						Submit
					</Button>
				</ModalFooter>
			</Modal>
		</>
	);
};

export default AddEditTeam;
