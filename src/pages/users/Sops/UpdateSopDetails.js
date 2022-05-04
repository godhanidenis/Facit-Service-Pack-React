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
	const id = useParams();
	console.log('id', id);
	const navigate = useNavigate();
	const [selectedSop, setSelectedSop] = useState();
	const dispatch = useDispatch();
	const { sops } = useSelector((state) => state.sops);
	const { category } = useSelector((state) => state.category);

	useEffect(() => {
		dispatch(loadCategoryStart());
	}, [dispatch, id.id]);
	const {
		register,
		handleSubmit,
		formState: { errors },
		setValue,
		reset,
	} = useForm();

	useEffect(() => {
		const singleSop = sops.find((sop) => sop.slug === id.id1);
		console.log('sinle sop', singleSop);
		setSelectedSop(singleSop);

		setValue('Sub_category', singleSop?.Sub_category);
		setValue('Category', singleSop?.Category?.id);
		setValue('enabled', singleSop?.enabled);
		setValue('filter', singleSop?.filter);
		setValue('sop', singleSop?.sop);
		setValue('type', singleSop?.type);
		setValue('user_type', singleSop?.user_type);
		setValue('weightage', singleSop?.weightage);
	}, [id, setValue, sops]);
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
			User: Number(id.id),
		};

		dispatch(updateSopsStart({ id: id.id1, toBeUpdatedSop: formData }));
		navigate(`/users/${id.id}/sops/${id.id1}`);
	};
	return (
		<PageWrapper>
			<Page className='p-0'>
				<form
					className='row g-4'
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
						{errors.Sub_category?.message}
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
							{errors.Category?.message}
						</FormGroup>
					</div>
					<div className='col-12'>
						<Label>Select Enabled</Label>
						<div style={{ display: 'flex', alignItems: 'center' }}>
							<input
								type='radio'
								checked={JSON.stringify(selectedSop?.enabled) === 'true'}
								onClick={() => {
									setSelectedSop({
										...selectedSop,
										enabled: !selectedSop?.enabled,
									});
								}}
								{...register('enabled', {
									required: 'enabled is required',
								})}
								value='true'
							/>
							<span style={{ marginLeft: '5px' }}>True</span>
							<input
								type='radio'
								checked={JSON.stringify(selectedSop?.enabled) === 'false'}
								onClick={() => {
									setSelectedSop({
										...selectedSop,
										enabled: !selectedSop?.enabled,
									});
								}}
								{...register('enabled', {
									required: 'enabled is required',
								})}
								value='false'
								style={{ marginLeft: '20px' }}
							/>
							<span style={{ marginLeft: '5px' }}>False</span>
						</div>
						{errors.enabled?.message}
					</div>
					<div className='col-12'>
						<Label>Select Filter</Label>
						<div style={{ display: 'flex', alignItems: 'center' }}>
							<input
								type='radio'
								checked={JSON.stringify(selectedSop?.filter) === 'true'}
								onClick={() => {
									setSelectedSop({
										...selectedSop,
										filter: !selectedSop?.filter,
									});
								}}
								{...register('filter', {
									required: 'filter is required',
								})}
								value='true'
							/>
							<span style={{ marginLeft: '5px' }}>True</span>
							<input
								type='radio'
								checked={JSON.stringify(selectedSop?.filter) === 'false'}
								onClick={() => {
									setSelectedSop({
										...selectedSop,
										filter: !selectedSop?.filter,
									});
								}}
								{...register('filter', {
									required: 'filter is required',
								})}
								value='false'
								style={{ marginLeft: '20px' }}
							/>
							<span style={{ marginLeft: '5px' }}>False</span>
						</div>
						{errors.filter?.message}
					</div>
					<div className='col-12'>
						<Label>Select SOP</Label>

						<div style={{ display: 'flex', alignItems: 'center' }}>
							<input
								type='radio'
								checked={JSON.stringify(selectedSop?.sop) === 'true'}
								onClick={() => {
									setSelectedSop({
										...selectedSop,
										sop: !selectedSop?.sop,
									});
								}}
								{...register('sop', {
									required: 'sop is required',
								})}
								value='true'
							/>
							<span style={{ marginLeft: '5px' }}>True</span>
							<input
								type='radio'
								checked={JSON.stringify(selectedSop?.sop) === 'false'}
								onClick={() => {
									setSelectedSop({
										...selectedSop,
										sop: !selectedSop?.sop,
									});
								}}
								{...register('sop', {
									required: 'sop is required',
								})}
								value='false'
								style={{ marginLeft: '20px' }}
							/>
							<span style={{ marginLeft: '5px' }}>False</span>
						</div>
						{errors.sop?.message}
					</div>
					<div className='col-12'>
						<Label>Select Type</Label>
						<FormGroup>
							<Select size='sm' ariaLabel='Select Type' {...register('type')}>
								<Option value={0}>Select Type</Option>
								<Option value={1}>Critical</Option>
								<Option value={2}>non Critical</Option>
							</Select>
							{errors.type?.message}
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
							{errors.user_type?.message}
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
						{errors.weightage?.message}
					</div>
					<div className='col-12'>
						<Button color='success' className='w-100 py-3' type='submit'>
							Update
						</Button>
					</div>
				</form>
			</Page>
		</PageWrapper>
	);
};

export default UpdateSopDetails;
