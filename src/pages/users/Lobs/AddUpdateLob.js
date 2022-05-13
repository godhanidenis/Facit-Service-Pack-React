import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '../../../components/bootstrap/Button';
import FormGroup from '../../../components/bootstrap/forms/FormGroup';
import Input from '../../../components/bootstrap/forms/Input';
import Page from '../../../layout/Page/Page';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import Card, {
	CardActions,
	CardBody,
	CardHeader,
	CardLabel,
	CardTitle,
} from '../../../components/bootstrap/Card';
import { createLobsStart, updateLobsStart } from '../../../redux/ducks/lobs';

const AddUpdateLob = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const id = useParams();

	const [editMode, setEditMode] = useState(false);

	const {
		register,
		handleSubmit,
		formState: { errors },
		setValue,
		reset,
	} = useForm();

	const { lobs } = useSelector((state) => state.lobs);
	console.log('lobs::', lobs);

	useEffect(() => {
		if (id.lobid) {
			setEditMode(true);

			if (lobs.length) {
				const singleLob = lobs.find((lob) => lob.id === Number(id.lobid));

				const fields = ['Lob_name'];

				fields.forEach((field) => setValue(field, singleLob[field]));
			}
		} else {
			setEditMode(false);
		}
	}, [id, lobs, setValue]);

	const onSubmit = (data) => {
		console.log('AddEdit FormData', data);

		const formData = new FormData();
		formData.append('Lob_name', data.Lob_name);
		formData.append('User', Number(id.id));

		if (editMode) {
			dispatch(updateLobsStart({ id: id.lobid, toBeUpdatedLob: formData }));
			navigate(`/users/${id.id}/lobs`);
		} else {
			dispatch(createLobsStart(formData));
			navigate(`/users/${id.id}/lobs`);
		}
	};

	const onError = (errors) => console.log('Errors Occurred !! :', errors);

	return (
		<>
			<div
				className='row d-flex align-items-center justify-content-center'
				style={{ marginTop: 30 }}>
				<div className='col-md-4'>
					<form
						className='row g-4'
						onSubmit={handleSubmit(onSubmit, onError)}
						onReset={reset}>
						<div className='col-12'>
							<FormGroup id='Lob_name' isFloating label='Your Lob name'>
								<Input
									autoComplete='off'
									{...register('Lob_name', {
										required: 'Lob_name is required',
									})}
								/>
							</FormGroup>
							{errors.Lob_name?.message}
						</div>

						<div className='col-12'>
							<div className='row d-flex'>
								<div className='col'>
									<Button
										isLight
										// style={{ float: 'right' }}
										className='float-end'
										color='success'
										//  className='w-100 py-3'
										type='submit'>
										{!editMode ? 'Create' : 'Update'}
									</Button>

									<Button
										color='info'
										// style={{ float: 'right' }}
										className='float-end'
										isLight
										tag='a'
										to={`/users/${id.id}/lobs`}>
										cancle
									</Button>
								</div>
							</div>
						</div>
					</form>
				</div>
			</div>
			{/* <PageWrapper>
				<Page className='p-0'>
					<div className='row h-100 align-items-center justify-content-center'>
						<div className='col-xl-4 col-lg-6 col-md-8 shadow-3d-container'>
							<Card className='shadow-3d-dark'>
								<CardHeader>
									<CardLabel icon='People' iconColor='info'>
										<CardTitle tag='h4' className='h5'>
											{!editMode ? 'Add Lob Details' : 'Update Lob Details'}
										</CardTitle>
									</CardLabel>
									<CardActions>
										<Button
											icon='Backspace'
											color='info'
											isLight
											tag='a'
											to={`/users/${id.id}/lobs`}>
											Back to Lobs
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
												id='Lob_name'
												isFloating
												label='Your Lob name'>
												<Input
													autoComplete='off'
													{...register('Lob_name', {
														required: 'Lob_name is required',
													})}
												/>
											</FormGroup>
											{errors.Lob_name?.message}
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
			</PageWrapper> */}
		</>
	);
};

export default AddUpdateLob;
