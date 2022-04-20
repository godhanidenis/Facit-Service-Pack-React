import React, { useEffect, useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../components/bootstrap/Button';
import FormGroup from '../../components/bootstrap/forms/FormGroup';
import Input from '../../components/bootstrap/forms/Input';
import { createUsersStart, updateUsersStart } from '../../redux/ducks/users';
import UserImage from '../../assets/img/wanna/wanna2.png';
import Avatar from '../../components/Avatar';
import Page from '../../layout/Page/Page';
import PageWrapper from '../../layout/PageWrapper/PageWrapper';
import Card, {
	CardActions,
	CardBody,
	CardHeader,
	CardLabel,
	CardTitle,
} from '../../components/bootstrap/Card';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const AddEditUser = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const profileFile = useRef(null);
	const { id } = useParams();

	const [editMode, setEditMode] = useState(false);

	const [selectedImage, setSelectedImage] = useState();
	const [updateProfilePictureFile, setUpdateProfilePictureFile] = useState();

	const {
		register,
		handleSubmit,
		formState: { errors },
		setValue,
		reset,
	} = useForm();
	useEffect(async () => {
		if (id) {
			setEditMode(true);

			const singleUser = await axios.get(`http://3.215.147.147/admin_panel/users/${id}`);

			await console.log('singleUser', singleUser);
			const fields = [
				'username',
				'email',
				'first_name',
				'last_name',
				'phone_number',
				'profile_picture',
			];
			await fields.forEach((field) => setValue(field, singleUser.data.data[field]));
			setSelectedImage(`http://3.215.147.147${singleUser.data.data.profile_picture}`);

			function srcToFile(src, fileName, mimeType) {
				return fetch(src)
					.then(function (res) {
						return res.arrayBuffer();
					})
					.then(function (buf) {
						return new File([buf], fileName, { type: mimeType });
					});
			}

			srcToFile(
				`http://3.215.147.147${singleUser.data.data.profile_picture}`,
				'profile.png',
				'image/png',
			).then(function (file) {
				console.log('file', file);

				setUpdateProfilePictureFile(file);
			});
		} else {
			setEditMode(false);
		}
	}, [id]);

	const onSubmit = (data, e) => {
		console.log('AddEdit FormData', data);

		const formData = new FormData();
		formData.append('username', data.username);
		formData.append('password', data.password);
		formData.append('email', data.email);
		formData.append('first_name', data.first_name);
		formData.append('last_name', data.last_name);
		formData.append('phone_number', data.phone_number);

		formData.append('profile_picture', updateProfilePictureFile);

		if (editMode) {
			dispatch(updateUsersStart({ id: id, toBeUpdatedUser: formData }));
			navigate('/');
		} else {
			dispatch(createUsersStart(formData));
			navigate('/');
		}
	};

	const onError = (errors, e) => console.log('Errors Occurred !! :', errors);

	const imageChange = (e) => {
		if (e.target.files && e.target.files.length > 0) {
			console.log('::::', e.target.files[0]);
			setUpdateProfilePictureFile(e.target.files[0]);
			setSelectedImage(URL.createObjectURL(e.target.files[0]));
		}
	};

	const Open = () => {
		document.getElementById('profile').click();
	};

	return (
		<>
			<PageWrapper>
				<Page className='p-0'>
					<div className='row h-100 align-items-center justify-content-center'>
						<div className='col-xl-4 col-lg-6 col-md-8 shadow-3d-container'>
							<Card className='shadow-3d-dark'>
								<CardHeader>
									<CardLabel icon='People' iconColor='info'>
										<CardTitle tag='h4' className='h5'>
											{!editMode ? 'Add User Detail' : 'Update User Detail'}
										</CardTitle>
									</CardLabel>
									<CardActions>
										<Button icon='Back' color='info' isLight tag='a' to='/'>
											Back to Users
										</Button>
									</CardActions>
								</CardHeader>
								<CardBody>
									<form
										className='row g-4'
										onSubmit={handleSubmit(onSubmit, onError)}
										onReset={reset}>
										<div className='col-12'>
											<div className='col-lg d-flex align-items-center justify-content-center'>
												<Avatar
													src={selectedImage || UserImage}
													onClick={() => Open()}
													// onClick={() => profileFile.current.click()}
												/>
											</div>

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
													// ref={profileFile}
												/>
												{errors.profile_picture?.message}
											</div>
										</div>
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
											{errors.username?.message}
										</div>
										{!editMode && (
											<>
												<div className='col-12'>
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
																	value: 10,
																	message:
																		'Password cannot exceed more than 10 characters',
																},
															})}
														/>
													</FormGroup>
												</div>
												{errors.password?.message}
											</>
										)}
										<div className='col-12'>
											<FormGroup id='email' isFloating label='Your email'>
												<Input
													type='email'
													autoComplete='off'
													{...register('email', {
														required: 'Email is required',
														pattern: {
															value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
															message: 'Please enter a valid email',
														},
													})}
												/>
											</FormGroup>
											{errors.email?.message}
										</div>
										<div className='col-12'>
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
											{errors.first_name?.message}
										</div>

										<div className='col-12'>
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
											{errors.last_name?.message}
										</div>

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
											{errors.phone_number?.message}
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
		</>
	);
};

export default AddEditUser;