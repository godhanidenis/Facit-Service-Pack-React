import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '../../../components/bootstrap/Button';
import FormGroup from '../../../components/bootstrap/forms/FormGroup';
import Input from '../../../components/bootstrap/forms/Input';

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

	useEffect(() => {
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
				style={{ position: 'absolute', top: 50, left: 50, opacity: 1, zIndex: 1 }}>
				<Spinner isGrow={false} />
			</div>
			<div
				className='row d-flex align-items-center justify-content-center'
				style={{ marginTop: 30, opacity: loading ? 0.5 : 1 }}>
				<div className='col-md-4'>
					<div className='col-12'>
						<h3>
							<b>{!editMode ? 'Add Lob Details' : 'Update Lob Details'}</b>
						</h3>
					</div>
					<form
						className='row g-4'
						onSubmit={handleSubmit(onSubmit, onError)}
						onReset={reset}>
						<div className='col-12 mt-5'>
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

						<div className='col-12'>
							<div className='row d-flex'>
								<div className='col'>
									<Button
										isLight
										className='float-end'
										color='success'
										type='submit'>
										{!editMode ? 'Create' : 'Update'}
									</Button>

									<Button
										color='info'
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
		</>
	);
};

export default AddUpdateLob;
