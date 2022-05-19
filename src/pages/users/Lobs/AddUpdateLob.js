import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '../../../components/bootstrap/Button';
import FormGroup from '../../../components/bootstrap/forms/FormGroup';
import Input from '../../../components/bootstrap/forms/Input';
import { CardActions } from '../../../components/bootstrap/Card';
import { createLobsStart, updateLobsStart } from '../../../redux/ducks/lobs';
import Spinner from '../../../components/bootstrap/Spinner';

const AddUpdateLob = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const id = useParams();

	const [editMode, setEditMode] = useState(false);
	const [dataSubmited, setDataSubmited] = useState(false);

	const {
		register,
		handleSubmit,
		formState: { errors },
		setValue,
		reset,
	} = useForm();

	const { lobs, loading } = useSelector((state) => state.lobs);
	console.log('lobs::', lobs);

	useEffect(() => {
		console.log('useefect laodinh', loading);
		if (!loading && dataSubmited) navigate(`/users/${id.id}/lobs`);
	}, [loading, dataSubmited, navigate, id.id]);
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
			setDataSubmited(true);
		} else {
			dispatch(createLobsStart(formData));
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
				style={{ position: 'absolute', top: 50, left: 50 }}>
				<Spinner isGrow={false} />
			</div>
			<div
				className='row d-flex align-items-center justify-content-center'
				style={{ marginTop: 30, opacity: loading ? 0.5 : 1 }}>
				<div className='col-md-4'>
					<div className='row'>
						<hr style={{ opacity: '0.05' }} />
						<div className='col-12 d-flex justify-content-between'>
							<div>
								<h3>
									<b>{!editMode ? 'Add Lob Details' : 'Update Lob Details'}</b>
								</h3>
							</div>
							<div>
								<CardActions className='d-flex justify-content-end'>
									<Button
										icon='Backspace'
										color='info'
										isLight
										tag='a'
										to={`/users/${id.id}/lobs`}>
										Back to users
									</Button>
								</CardActions>
							</div>
						</div>
						<form
							className='row pe-0'
							onSubmit={handleSubmit(onSubmit, onError)}
							onReset={reset}>
							<div className='col-12 mt-4 pe-0'>
								<FormGroup id='Lob_name' isFloating label='Your Lob name'>
									<Input
										autoComplete='off'
										{...register('Lob_name', {
											required: 'Lob name is required',
										})}
									/>
								</FormGroup>
								<span style={{ color: 'red' }}>{errors.Lob_name?.message}</span>
							</div>

							<div className='col-12 pe-0' style={{ marginTop: 30 }}>
								<div className='row'>
									<div className='col d-flex justify-content-end'>
										<Button
											color='info'
											isLight
											className='me-2'
											tag='a'
											to={`/users/${id.id}/lobs`}>
											cancle
										</Button>

										<Button isLight color='success' type='submit'>
											{!editMode ? 'Create' : 'Update'}
										</Button>
									</div>
								</div>
							</div>
						</form>
					</div>
				</div>
			</div>
		</>
	);
};

export default AddUpdateLob;
