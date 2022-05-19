import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';

import { useToasts } from 'react-toast-notifications';
import Button from '../../../../components/bootstrap/Button';
import FormGroup from '../../../../components/bootstrap/forms/FormGroup';
import Input from '../../../../components/bootstrap/forms/Input';
import Label from '../../../../components/bootstrap/forms/Label';
import Select from '../../../../components/bootstrap/forms/Select';
import Option from '../../../../components/bootstrap/Option';
import { createAgentsStart, updateAgentsStart } from '../../../../redux/ducks/agents';
import Spinner from '../../../../components/bootstrap/Spinner';
import Toasts from '../../../../components/bootstrap/Toasts';
import Card, { CardActions } from '../../../../components/bootstrap/Card';

const AddEditAgent = () => {
	const id = useParams();
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [editMode, setEditMode] = useState(false);
	const [dataSubmited, setDataSubmited] = useState(false);
	const { addToast } = useToasts();

	const {
		register,
		handleSubmit,
		formState: { errors },
		setValue,
		reset,
	} = useForm();
	const { teams } = useSelector((state) => state.teams);
	const { agents, loading, error } = useSelector((state) => state.agents);
	useEffect(() => {
		if (id.agentId) {
			setEditMode(true);

			if (agents.length) {
				const singleAgent = agents.find((agent) => agent.id === Number(id.agentId));
				setValue('Agent_id', singleAgent.Agent_id);
				setValue('Agent_name', singleAgent.Agent_name);
				setValue('phone_no', singleAgent.phone_no);
				setValue('Team', singleAgent.Team.id);
			}
		} else {
			setEditMode(false);
		}
	}, [id, agents, setValue]);

	useEffect(() => {
		if (!loading && dataSubmited && !error) {
			addToast(
				<Toasts
					title={!editMode ? 'Successfully Agent Created' : 'Successfully Agent Updated'}
					icon='warning'
					iconColor='success'
					time='Now'
					isDismiss>
					{`${error}`}
				</Toasts>,
				{
					autoDismiss: true,
				},
			);
			navigate(`/users/${id.id}/teams/${id.teamId}/agents`);
		}
	}, [dataSubmited, navigate, id.id, id.teamId, loading, addToast, editMode, error]);

	const onSubmit = (data) => {
		const formData = {
			Agent_id: Number(data.Agent_id),
			Agent_name: data.Agent_name,
			phone_no: Number(data.phone_no),
			Team: Number(data.Team),
			User: Number(id.id),
		};
		if (editMode) {
			dispatch(updateAgentsStart({ id: id.agentId, toBeUpdatedAgent: formData }));
			setDataSubmited(true);
		} else {
			dispatch(createAgentsStart(formData));
			setDataSubmited(true);
		}
	};
	const onError = (errors) => console.log('Errors Occurred !! :', errors);

	return (
		<>
			<div
				className={
					loading
						? 'd-flex align-items-center justify-content-center w-100 h-100'
						: 'visually-hidden'
				}
				style={{ position: 'absolute', top: 50, left: 50, opacity: 1, zIndex: 1 }}>
				<Spinner isGrow={false} />
			</div>
			<div
				className='row align-items-center justify-content-center m-4'
				style={{ opacity: loading ? 0.5 : 1 }}>
				<div className='col-md-6'>
					<hr style={{ opacity: '0.05' }} />
					<div className='col-12 d-flex align-items-center justify-content-between mb-4'>
						<div>
							<h3>
								<b>{!editMode ? 'Add Agent Details' : 'Update Agent Details'}</b>
							</h3>
						</div>

						<div>
							<CardActions className='d-flex justify-content-end'>
								<Button
									icon='Backspace'
									color='info'
									isLight
									tag='a'
									to={`/users/${id.id}/teams/${id.teamId}/agents`}>
									Back to Agents
								</Button>
							</CardActions>
						</div>
					</div>
					<form
						className='row g-4'
						onSubmit={handleSubmit(onSubmit, onError)}
						onReset={reset}>
						<div className='col-12'>
							<FormGroup id='Agent_id' isFloating label='Agent Id'>
								<Input
									autoComplete='off'
									type='number'
									{...register('Agent_id', {
										required: 'Agent Id is required',
									})}
								/>
							</FormGroup>
							<span style={{ color: 'red' }}>{errors.Agent_id?.message}</span>
						</div>
						<div className='col-12'>
							<FormGroup id='Agent_name' isFloating label='Agent Name'>
								<Input
									autoComplete='off'
									{...register('Agent_name', {
										required: 'Agent Name is required',
									})}
								/>
							</FormGroup>
							<span style={{ color: 'red' }}>{errors.Agent_name?.message}</span>
						</div>

						<div className='col-12'>
							<FormGroup id='phone_no' isFloating label='Agent Phone Number'>
								<Input
									type='number'
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
							<span style={{ color: 'red' }}>{errors.phone_no?.message}</span>
						</div>
						<div className='col-12'>
							<div className='row'>
								<Label>Select Team</Label>
								<div className='col-md-4'>
									<FormGroup>
										<Select
											size='sm'
											ariaLabel='Select Team'
											style={{ padding: 10 }}
											{...register('Team', {
												required: 'Team is required',
											})}>
											<Option value=''>Select Team</Option>
											{teams?.map((team) => {
												return (
													<Option key={team?.id} value={team?.id}>
														{team?.Team_name}
													</Option>
												);
											})}
										</Select>
										<span style={{ color: 'red' }}>{errors.Team?.message}</span>
									</FormGroup>
								</div>
							</div>

							<div className='col-12' style={{ marginTop: 30 }}>
								<div className='row d-flex'>
									<div className='col'>
										<Button
											isLight
											color='success'
											className='float-end mx-2'
											type='submit'>
											{!editMode ? 'Create' : 'Update'}
										</Button>

										<Button
											color='info'
											isLight
											className='float-end'
											tag='a'
											to={`/users/${id.id}/teams/${id.teamId}/agents`}>
											cancle
										</Button>
									</div>
								</div>
							</div>
						</div>
					</form>
				</div>
			</div>
		</>
	);
};

export default AddEditAgent;
