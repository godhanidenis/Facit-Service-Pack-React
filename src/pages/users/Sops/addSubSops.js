import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import Page from '../../../layout/Page/Page';
import Card, {
	CardHeader,
	CardBody,
	CardLabel,
	CardTitle,
} from '../../../components/bootstrap/Card';
import Button from '../../../components/bootstrap/Button';

import FormGroup from '../../../components/bootstrap/forms/FormGroup';
import Input from '../../../components/bootstrap/forms/Input';
import Label from '../../../components/bootstrap/forms/Label';
import Select from '../../../components/bootstrap/forms/Select';
import Option from '../../../components/bootstrap/Option';
import { loadTeamsStart } from '../../../redux/ducks/teams';

const AddSubSops = () => {
	const dispatch = useDispatch();

	const { teams } = useSelector((state) => state.teams);
	const {
		register,
		handleSubmit,
		formState: { errors },
		setValue,
		reset,
	} = useForm();
	const onSubmit = (data) => {
		console.log('AddEdit FormData', data);
	};
	const onError = (errors) => console.log('Errors Occurred !! :', errors);

	useEffect(() => {
		dispatch(loadTeamsStart(158));
	}, [dispatch]);
	return (
		<PageWrapper>
			<Page className='p-0'>
				<div className='row h-100 align-items-center justify-content-center'>
					<div className='col-xl-4 col-lg-6 col-md-8 shadow-3d-container'>
						<Card className='shadow-3d-dark'>
							<CardHeader>
								<CardLabel icon='People' iconColor='info'>
									<CardTitle tag='h4' className='h5'>
										Add Sub Sops
									</CardTitle>
								</CardLabel>
							</CardHeader>
							<CardBody>
								<form
									className='row g-4'
									onSubmit={handleSubmit(onSubmit, onError)}
									onReset={reset}>
									<div className='col-12'>
										<FormGroup id='text' isFloating label='Your Text'>
											<Input
												autoComplete='off'
												{...register('text', {
													required: 'Text is required',
												})}
											/>
										</FormGroup>
										{errors.text?.message}
									</div>
									<div className='col-12'>
										<FormGroup id='score' isFloating label='Your Score'>
											<Input
												autoComplete='off'
												type='number'
												{...register('score', {
													required: 'Score is required',
												})}
											/>
										</FormGroup>
										{errors.score?.message}
									</div>

									<div className='col-12'>
										<Label>Select teamList</Label>
										<FormGroup>
											<Select
												size='sm'
												ariaLabel='Select Category'
												{...register('teamList', {
													required: 'teamList is required',
												})}>
												<Option value=''>Select teamList</Option>
												{teams?.map((team) => {
													return (
														<Option key={team?.id} value={team?.id}>
															{team?.Team_name}
														</Option>
													);
												})}
											</Select>
											{errors.teamList?.message}
										</FormGroup>
									</div>
									<div className='col-12'>
										<FormGroup id='keywords' isFloating label='Your keywords'>
											<Input
												autoComplete='off'
												{...register('keywords', {
													required: 'keywords is required',
												})}
											/>
										</FormGroup>
										{errors.keywords?.message}
									</div>
									<div className='col-12'>
										<FormGroup id='tag_type' isFloating label='Your tag_type'>
											<Input
												autoComplete='off'
												{...register('tag_type', {
													required: 'tag_type is required',
												})}
											/>
										</FormGroup>
										{errors.tag_type?.message}
									</div>

									<div className='col-12'>
										<Button color='info' className='w-100 py-3' type='submit'>
											Create
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

export default AddSubSops;
