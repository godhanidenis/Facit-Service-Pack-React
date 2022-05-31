import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';
import Button from '../../components/bootstrap/Button';
import FormGroup from '../../components/bootstrap/forms/FormGroup';
import Input from '../../components/bootstrap/forms/Input';
import { createUsersStart, updateUsersStart } from '../../redux/ducks/users';
import UserImage from '../../assets/img/wanna/wanna2.png';
import Avatar from '../../components/Avatar';
import Icon from '../../components/icon/Icon';
import Spinner from '../../components/bootstrap/Spinner';
import Toasts from '../../components/bootstrap/Toasts';
import { CardActions } from '../../components/bootstrap/Card';

const AddUpdateUser = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { id } = useParams();

	const [editMode, setEditMode] = useState(false);

	const [selectedImage, setSelectedImage] = useState();
	const [updateProfilePictureFile, setUpdateProfilePictureFile] = useState();
	const [dataSubmited, setDataSubmited] = useState(false);
	const { addToast } = useToasts();
	const {
		register,
		handleSubmit,
		formState: { errors },
		setValue,
		reset,
	} = useForm();

	const { users, loading, error } = useSelector((state) => state.users);

	useEffect(() => {
		if (id) {
			setEditMode(true);

			if (users.length) {
				const singleUser = users.find((user) => user.id === Number(id));

				const fields = [
					'username',
					'email',
					'first_name',
					'last_name',
					'phone_number',
					'profile_picture',
				];

				fields.forEach((field) => setValue(field, singleUser[field]));
				setSelectedImage(`${singleUser?.pre_signed_url}`);

				srcToFile(`${singleUser?.pre_signed_url}`, 'profile.png', 'image/png').then(
					function (file) {
						setUpdateProfilePictureFile(file);
					},
				);
			}
		} else {
			setEditMode(false);
		}
	}, [id, users, setValue]);

	async function srcToFile(src, fileName, mimeType) {
		const res = await fetch(src);
		const buf = await res.arrayBuffer();
		return new File([buf], fileName, { type: mimeType });
	}

	useEffect(() => {
		if (!loading && dataSubmited && !error) {
			// if (error === '' && loading === false) {
			addToast(
				<Toasts
					title={!editMode ? 'Successfully User Created' : 'Successfully User Updated'}
					icon='warning'
					iconColor='success'
					isDismiss>
					{`${error}`}
				</Toasts>,
				{
					autoDismiss: true,
				},
			);
			// }
			navigate('/users');
		}
	}, [loading, dataSubmited, navigate, error, addToast, editMode]);

	const onSubmit = (data) => {
		const formData = new FormData();
		formData.append('username', data.username);
		if (!editMode) {
			formData.append('password', data.password);
		}
		formData.append('email', data.email);
		formData.append('first_name', data.first_name);
		formData.append('last_name', data.last_name);
		formData.append('phone_number', data.phone_number);

		formData.append('profile_picture', updateProfilePictureFile);

		if (editMode) {
			const abc = dispatch(updateUsersStart({ id, toBeUpdatedUser: formData }));
			setDataSubmited(true);
		} else {
			dispatch(createUsersStart(formData));
			setDataSubmited(true);
		}
	};

	const onError = (errors) => console.log('Errors Occurred !! :', errors);

	const imageChange = (e) => {
		if (e.target.files && e.target.files.length > 0) {
			setUpdateProfilePictureFile(e.target.files[0]);
			setSelectedImage(URL.createObjectURL(e.target.files[0]));

			errors.profile_picture = '';
		}
	};

	const Open = () => {
		document.getElementById('profile').click();
	};

	useEffect(() => {
		if (error !== '') {
			addToast(
				<Toasts
					title='Error in Team'
					icon='warning'
					iconColor='danger'
					color='red'
					isDismiss>
					{`${error}`}
				</Toasts>,
				{
					autoDismiss: true,
				},
			);
		}
	}, [addToast, editMode, error, loading]);
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

			<div style={{ opacity: loading ? 0.5 : 1 }}>
				<div className='row align-items-center justify-content-center'>
					<div className='col-md-6'>
						<form onSubmit={handleSubmit(onSubmit, onError)} onReset={reset}>
							<div className='row' style={{ marginTop: 20 }}>
								<div className='d-flex align-items-center justify-content-between'>
									<div>
										<h1>
											{!editMode ? 'Create New User' : 'Update User Details'}
										</h1>
									</div>
									<div>
										<CardActions>
											<Button
												icon='Backspace'
												color='info'
												isLight
												tag='a'
												to='/users'>
												Back to teams
											</Button>
										</CardActions>
									</div>
								</div>
							</div>
							<div className='row mt-4'>
								<div className='col-4 d-flex align-items-center justify-content-center flex-column'>
									<div className='row align-items-right justify-content-right p-0'>
										<div className='row-md-auto d-flex p-0'>
											<Avatar
												src={selectedImage || UserImage}
												onClick={() => Open()}
											/>
											<div
												className='bg-success rounded-circle'
												style={{
													position: 'relative',
													right: 20,
													top: 90,
													height: 20,
													width: 20,
													color: '#5cb85c',
												}}
											/>
										</div>
									</div>
									<div className='row align-items-right justify-content-right p-0 mt-4'>
										<div className='col-lg'>
											<Input
												type='file'
												autoComplete='off'
												{...register('profile_picture', {
													required: editMode
														? false
														: 'Profile Picture is required',
												})}
												onChange={imageChange}
												style={{ display: 'none' }}
												id='profile'
											/>
											<span style={{ color: 'red' }}>
												{errors.profile_picture?.message}
											</span>
										</div>
									</div>
								</div>
								<div className='col-8'>
									<div className='row'>
										<div className='col-auto mt-3'>
											<Icon
												size='lg'
												icon='Person'
												color='success'
												style={{
													cursor: 'pointer',
													marginLeft: '10px',
												}}
											/>
										</div>
										<div className='col'>
											<div className='row'>
												<div className='col'>
													<FormGroup
														id='first_name'
														isFloating
														label='Your FirstName'>
														<Input
															type='text'
															autoComplete='off'
															{...register('first_name', {
																required: 'First Name is required',
															})}
														/>
													</FormGroup>

													<span style={{ color: 'red' }}>
														{errors.first_name?.message}
													</span>
												</div>
												<div className='col'>
													<FormGroup
														id='last_name'
														isFloating
														label='Your LastName'>
														<Input
															autoComplete='off'
															{...register('last_name', {
																required: 'Last Name is required',
															})}
														/>
													</FormGroup>
													<span style={{ color: 'red' }}>
														{errors.last_name?.message}
													</span>
												</div>
											</div>
										</div>
									</div>
									<div className='row d-flex mt-4'>
										<div className='col-auto mt-3'>
											<Icon
												size='lg'
												icon='person'
												color='success'
												style={{
													cursor: 'pointer',
													marginLeft: '10px',
												}}
											/>
										</div>
										<div className='col'>
											<div className='col-12'>
												<FormGroup
													id='username'
													isFloating
													label='Your Username'>
													<Input
														autoComplete='off'
														{...register('username', {
															required: 'Username is required',
														})}
													/>
												</FormGroup>
												<span style={{ color: 'red' }}>
													{errors.username?.message}
												</span>
											</div>
										</div>
									</div>
									{!editMode && (
										<>
											<div className='row d-flex mt-4'>
												<div className='col-auto mt-3'>
													<Icon
														size='lg'
														icon='VpnKey'
														color='success'
														style={{
															cursor: 'pointer',
															marginLeft: '10px',
														}}
													/>
												</div>
												<div className='col'>
													<FormGroup
														id='password'
														isFloating
														label='Your Password'>
														<Input
															autoComplete='off'
															type='password'
															{...register('password', {
																required: editMode
																	? false
																	: 'Password is required',
																minLength: {
																	value: 4,
																	message:
																		'Password must be more than 4 characters',
																},
																maxLength: {
																	value: 15,
																	message:
																		'Password cannot exceed more than 15 characters',
																},
															})}
														/>
													</FormGroup>
												</div>
											</div>
											{errors.password?.message}
										</>
									)}
									<div className='row d-flex mt-4'>
										<div className='col-auto mt-3'>
											<Icon
												size='lg'
												icon='Email'
												color='success'
												style={{
													cursor: 'pointer',
													marginLeft: '10px',
												}}
											/>
										</div>
										<div className='col'>
											<div className='col-12'>
												<FormGroup id='email' isFloating label='Your email'>
													<Input
														type='email'
														autoComplete='off'
														{...register('email', {
															required: 'Email is required',
															pattern: {
																value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
																message:
																	'Please enter a valid email',
															},
														})}
													/>
												</FormGroup>
												<span style={{ color: 'red' }}>
													{errors.email?.message}
												</span>
											</div>
										</div>
									</div>
									<div className='row d-flex mt-4'>
										<div className='col-auto mt-3'>
											<Icon
												size='lg'
												icon='LocalPhone'
												color='success'
												style={{
													cursor: 'pointer',
													marginLeft: '10px',
												}}
											/>
										</div>
										<div className='col'>
											<div className='col-12'>
												<FormGroup
													id='phone_number'
													isFloating
													label='Your PhoneNumber'>
													<Input
														autoComplete='off'
														type='number'
														{...register('phone_number', {
															required: 'Phone Number is required',
															minLength: {
																value: 10,
																message:
																	'Phone Number must be 10 numbers',
															},
															maxLength: {
																value: 10,
																message:
																	'Phone Number must be 10 numbers',
															},
														})}
													/>
												</FormGroup>
												<span style={{ color: 'red' }}>
													{errors.phone_number?.message}
												</span>
											</div>
										</div>
									</div>

									<div className='row d-flex' style={{ marginTop: 30 }}>
										<div className='col'>
											<Button
												isLight
												color='success'
												// className='w-100 py-3 float-right'
												className='float-end mx-2'
												type='submit'>
												{!editMode ? 'Create' : 'Update'}
											</Button>
											<Button
												color='info'
												isLight
												className='float-end'
												tag='a'
												to='/users'>
												cancle
											</Button>
										</div>
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

export default AddUpdateUser;
