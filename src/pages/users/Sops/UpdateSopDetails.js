import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '../../../components/bootstrap/Button';
import FormGroup from '../../../components/bootstrap/forms/FormGroup';
import Input from '../../../components/bootstrap/forms/Input';
import Label from '../../../components/bootstrap/forms/Label';
import Select from '../../../components/bootstrap/forms/Select';
import Option from '../../../components/bootstrap/Option';
import { loadCategoryStart } from '../../../redux/ducks/category';
import { updateSopsStart } from '../../../redux/ducks/sops';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import Page from '../../../layout/Page/Page';

const UpdateSopDetails = () => {
	const perams = useParams();
	const navigate = useNavigate();
	const [selectedSop, setSelectedSop] = useState();
	const dispatch = useDispatch();
	const { sops } = useSelector((state) => state.sops);
	const { category } = useSelector((state) => state.category);
	const [checked, setChecked] = useState(false);
	const toggleChecked = () => setChecked((value) => !value);
	useEffect(() => {
		dispatch(loadCategoryStart());
	}, [dispatch, perams.id]);
	const {
		register,
		handleSubmit,
		formState: { errors },
		setValue,
		reset,
	} = useForm();

	useEffect(() => {
		const singleSop = sops.find((sop) => sop.slug === perams.sop_slug);
		console.log('sinle sop', singleSop);
		setSelectedSop(singleSop);

		setValue('Sub_category', singleSop?.Sub_category);
		setValue('Category', singleSop?.Category?.id);
		setValue('enabled', JSON.stringify(singleSop?.enabled));
		setValue('filter', JSON.stringify(singleSop?.filter));
		setValue('sop', JSON.stringify(singleSop?.sop));
		setValue('type', singleSop?.type);
		setValue('user_type', singleSop?.user_type);
		setValue('weightage', singleSop?.weightage);
	}, [perams.sop_slug, setValue, sops]);
	console.log('selectedSop', selectedSop);
	const onError = (errors) => console.log('Errors Occurred !! :', errors);

	const onSubmit = (data) => {
		console.log('data', data);
		const formData = {
			Sub_category: data.Sub_category,
			Category: Number(data.Category),
			enabled: JSON.parse(data.enabled),
			filter: JSON.parse(data.filter),
			sop: JSON.parse(data.sop),
			type: data.type,
			user_type: data.user_type,
			weightage: data.weightage,
			User: Number(perams.id),
		};

		dispatch(updateSopsStart({ id: perams.sop_slug, toBeUpdatedSop: formData }));
		navigate(`/users/${perams.id}/sops/${perams.sop_slug}`);
	};
	return (
		<PageWrapper>
			<Page className='p-0'>
				<form
					className='row g-4 w-75'
					onSubmit={handleSubmit(onSubmit, onError)}
					onReset={reset}>
					<div className='col-12'>
						<FormGroup id='Lob_name' isFloating label='Your Lob name'>
							<Input
								autoComplete='off'
								{...register('Sub_category', {
									required: 'Sub_category is required',
								})}
							/>
						</FormGroup>
						<span style={{ color: 'red' }}>{errors.Sub_category?.message}</span>
					</div>
					<div className='col-12'>
						<Label>Select Category</Label>
						<FormGroup>
							<Select
								size='sm'
								ariaLabel='Select Category'
								{...register('Category', {
									required: 'Category is required',
								})}>
								<Option value=''>Select Category</Option>
								{category?.map((cat) => {
									return (
										<Option key={cat?.id} value={cat?.id}>
											{cat?.Category_name}
										</Option>
									);
								})}
							</Select>
							<span style={{ color: 'red' }}>{errors.Category?.message}</span>
						</FormGroup>
					</div>
					<div className='col-12'>
						<Label>Select Enabled</Label>

						<FormGroup>
							<Select
								size='sm'
								ariaLabel='Select enabled'
								{...register('enabled', {
									required: 'enabled is required',
								})}>
								<Option value=''>Select enabled</Option>
								<Option value='true'>True</Option>
								<Option value='false'>False</Option>
							</Select>
						</FormGroup>
						<span style={{ color: 'red' }}>{errors.enabled?.message}</span>
					</div>
					<div className='col-12'>
						<Label>Select Filter</Label>

						<FormGroup>
							<Select
								size='sm'
								ariaLabel='Select filter'
								{...register('filter', {
									required: 'filter is required',
								})}>
								<Option value=''>Select filter</Option>
								<Option value='true'>True</Option>
								<Option value='false'>False</Option>
							</Select>
						</FormGroup>
						<span style={{ color: 'red' }}>{errors.filter?.message}</span>
					</div>
					<div className='col-12'>
						<Label>Select SOP</Label>

						<FormGroup>
							<Select
								size='sm'
								ariaLabel='Select sop'
								{...register('sop', {
									required: 'sop is required',
								})}>
								<Option value=''>Select sop</Option>
								<Option value='true'>True</Option>
								<Option value='false'>False</Option>
							</Select>
						</FormGroup>
						<span style={{ color: 'red' }}>{errors.sop?.message}</span>
					</div>
					<div className='col-12'>
						<Label>Select Type</Label>
						<FormGroup>
							<Select size='sm' ariaLabel='Select Type' {...register('type')}>
								<Option value={0}>Select Type</Option>
								<Option value={1}>Critical</Option>
								<Option value={2}>non Critical</Option>
							</Select>
							<span style={{ color: 'red' }}>{errors.type?.message}</span>
						</FormGroup>
					</div>
					<div className='col-12'>
						<Label>Select User Type</Label>
						<FormGroup>
							<Select
								size='sm'
								ariaLabel='Select User Type'
								{...register('user_type', {
									required: 'User Type is required',
								})}>
								<Option value=''>Select User Type</Option>
								<Option value='Agent'>Agent</Option>
								<Option value='Customer'>Customer</Option>
							</Select>
							<span style={{ color: 'red' }}>{errors.user_type?.message}</span>
						</FormGroup>
					</div>
					<div className='col-12'>
						<FormGroup id='weightage' isFloating label='Sop Weighatge'>
							<Input
								autoComplete='off'
								type='number'
								{...register('weightage', {
									required: 'weightage is required',
									min: {
										value: 0,
										message: 'Weighate between 0 to 100',
									},
									max: {
										value: 100,
										message: 'Weighate between 0 to 100',
									},
								})}
							/>
						</FormGroup>
						<span style={{ color: 'red' }}>{errors.weightage?.message}</span>
					</div>
					<div className='col-12' style={{ marginTop: 50 }}>
						<div className='row d-flex'>
							<div className='col'>
								<Button
									isLight
									color='success'
									className='float-end mx-2'
									type='submit'>
									Update
								</Button>

								<Button
									color='info'
									isLight
									className='float-end'
									tag='a'
									to={`/users/${perams.id}/sops/${perams.agentId}`}>
									cancle
								</Button>
							</div>
						</div>
					</div>
				</form>
			</Page>
		</PageWrapper>
	);
};

export default UpdateSopDetails;
