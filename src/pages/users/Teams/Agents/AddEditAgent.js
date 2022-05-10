import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import PageWrapper from '../../../../layout/PageWrapper/PageWrapper';
import Page from '../../../../layout/Page/Page';
import Card, {
	CardActions,
	CardBody,
	CardHeader,
	CardLabel,
	CardTitle,
} from '../../../../components/bootstrap/Card';
import Button from '../../../../components/bootstrap/Button';
import FormGroup from '../../../../components/bootstrap/forms/FormGroup';
import Input from '../../../../components/bootstrap/forms/Input';
import Label from '../../../../components/bootstrap/forms/Label';
import Select from '../../../../components/bootstrap/forms/Select';
import Option from '../../../../components/bootstrap/Option';
import { createAgentsStart, updateAgentsStart } from '../../../../redux/ducks/agents';

const AddEditAgent = () => {
	const id = useParams();
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [editMode, setEditMode] = useState(false);

	const {
		register,
		handleSubmit,
		formState: { errors },
		setValue,
		reset,
	} = useForm();
	const { teams } = useSelector((state) => state.teams);
	const { agents } = useSelector((state) => state.agents);
	useEffect(() => {
		if (id.id1) {
			setEditMode(true);

			if (agents.length) {
				const singleAgent = agents.find((agent) => agent.id === Number(id.id1));
				console.log('singleAgent', singleAgent.Team.id);
				setValue('Agent_id', singleAgent.Agent_id);
				setValue('Agent_name', singleAgent.Agent_name);
				setValue('phone_no', singleAgent.phone_no);
				setValue('Team', singleAgent.Team.id);
			}
		} else {
			setEditMode(false);
		}
	}, [id, agents, setValue]);

	const onSubmit = (data) => {
		console.log('data', data);
		const formData = {
			Agent_id: Number(data.Agent_id),
			Agent_name: data.Agent_name,
			phone_no: Number(data.phone_no),
			Team: Number(data.Team),
			User: Number(id.id),
		};
		if (editMode) {
			dispatch(updateAgentsStart({ id: id.id1, toBeUpdatedAgent: formData }));
			navigate(`/users/${id.id}/teams/${id.teamId}/agents`);
		} else {
			dispatch(createAgentsStart(formData));
			navigate(`/users/${id.id}/teams/${id.teamId}/agents`);
		}
	};
	const onError = (errors) => console.log('Errors Occurred !! :', errors);

	return (
		<PageWrapper className='mt-3'>
			<Page className='p-0'>
				<div className='row h-100 align-items-center justify-content-center'>
					<div className='col-xl-4 col-lg-6 col-md-8 shadow-3d-container'>
						<Card className='shadow-3d-dark'>
							<CardHeader>
								<CardLabel icon='People' iconColor='info'>
									<CardTitle tag='h4' className='h5'>
										{!editMode ? 'Add Agent Details' : 'Update Agent Details'}
									</CardTitle>
								</CardLabel>
								<CardActions>
									<Button
										icon='Backspace'
										color='info'
										isLight
										tag='a'
										// to={`/users/${id.id}/teams/${id.agentId}/agents`}>
										to='../../agents'>
										Back to Agents
									</Button>
								</CardActions>
							</CardHeader>
							<CardBody>
								<form
									className='row g-4'
									onSubmit={handleSubmit(onSubmit, onError)}
									onReset={reset}>
									<div className='col-12'>
										<FormGroup id='Agent_id' isFloating label='Your Agent Id'>
											<Input
												autoComplete='off'
												type='number'
												{...register('Agent_id', {
													required: 'Agent Id is required',
												})}
											/>
										</FormGroup>
										{errors.Agent_id?.message}
									</div>
									<div className='col-12'>
										<FormGroup
											id='Agent_name'
											isFloating
											label='Your Agent Name'>
											<Input
												autoComplete='off'
												{...register('Agent_name', {
													required: 'Agent Name is required',
												})}
											/>
										</FormGroup>
										{errors.Agent_name?.message}
									</div>

									<div className='col-12'>
										<FormGroup
											id='phone_no'
											isFloating
											label='Your Phone Number'>
											<Input
												autoComplete='off'
												{...register('phone_no', {
													required: 'Phone Number is required',
													minLength: {
														value: 10,
														message: 'Phone Number must be 10 numbers',
													},
													maxLength: {
														value: 10,
														message: 'Phone Number must be 10 numbers',
													},
												})}
											/>
										</FormGroup>
										{errors.phone_no?.message}
									</div>
									<div className='col-12'>
										<div className='row'>
											<Label>Select Team</Label>
											<div className='col-4'>
												<FormGroup>
													<Select
														size='sm'
														ariaLabel='Select Team'
														{...register('Team', {
															required: 'Team is required',
														})}>
														<Option value=''>Select Team</Option>
														{teams?.map((team) => {
															return (
																<Option
																	key={team?.id}
																	value={team?.id}>
																	{team?.Team_name}
																</Option>
															);
														})}
													</Select>
													{errors.Team?.message}
												</FormGroup>
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
	);
};

export default AddEditAgent;
