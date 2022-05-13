import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Button from '../../components/bootstrap/Button';
import FormGroup from '../../components/bootstrap/forms/FormGroup';
import Input from '../../components/bootstrap/forms/Input';
import { createUsersStart, updateUsersStart } from '../../redux/ducks/users';
import UserImage from '../../assets/img/wanna/wanna2.png';
import Avatar from '../../components/Avatar';
import Card, {
	CardActions,
	CardBody,
	CardHeader,
	CardLabel,
	CardTitle,
} from '../../components/bootstrap/Card';
import Icon from '../../components/icon/Icon';

const AddUpdateUser = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
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

	const { users } = useSelector((state) => state.users);

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
				setSelectedImage(`${singleUser?.profile_picture}`);

				srcToFile(`${singleUser?.profile_picture}`, 'profile.png', 'image/png').then(
					function (file) {
						setUpdateProfilePictureFile(file);
					},
				);
			}
		} else {
			setEditMode(false);
		}
	}, [id, users, setValue]);

	function srcToFile(src, fileName, mimeType) {
		return fetch(src)
			.then(function (res) {
				return res.arrayBuffer();
			})
			.then(function (buf) {
				return new File([buf], fileName, { type: mimeType });
			});
	}
	const onSubmit = (data) => {
		console.log('AddEdit FormData', data);

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
			dispatch(updateUsersStart({ id, toBeUpdatedUser: formData }));
			navigate('/users');
		} else {
			dispatch(createUsersStart(formData));
			navigate('/users');
		}
	};

	const onError = (errors) => console.log('Errors Occurred !! :', errors);

	const imageChange = (e) => {
		if (e.target.files && e.target.files.length > 0) {
			setUpdateProfilePictureFile(e.target.files[0]);
			setSelectedImage(URL.createObjectURL(e.target.files[0]));
		}
	};

	const Open = () => {
		document.getElementById('profile').click();
	};

	return (
		<>
			<div className='row align-items-center justify-content-center p-5'>
				<form
					className='row g-4'
					onSubmit={handleSubmit(onSubmit, onError)}
					onReset={reset}>
					<div className='row'>
						<div className='col-12'>
							<Card>
								<CardHeader>
									<CardLabel icon='People' iconColor='info'>
										<CardTitle tag='h4' className='h5'>
											{!editMode ? 'Add User Details' : `Update User Details`}
										</CardTitle>
									</CardLabel>
									<CardActions>
										<div className='row align-items-right'>
											<div className='col'>
												<Button
													color='success'
													// className='w-100 py-3'
													isLight
													type='submit'>
													{!editMode ? 'Create' : 'Update'}
												</Button>
											</div>
											<div className='col'>
												<Button color='info' isLight tag='a' to='/users'>
													cancle
												</Button>
												{/* <Button
													color='info'
													to='/users'
													className='w-100 py-3'>
													cancle
												</Button> */}
											</div>
										</div>
									</CardActions>
								</CardHeader>
							</Card>
						</div>
					</div>
					<div className='row pt-5 '>
						<div className='col-4 d-flex align-items-center justify-content-center'>
							<div className='row g-4 d-flex align-items-right justify-content-right p-0'>
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
								{/* <div className='col-lg'>
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
									{errors.profile_picture?.message}
								</div> */}
							</div>
							<div className='row g-4 d-flex align-items-right justify-content-right p-0'>
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
									{errors.profile_picture?.message}
								</div>
							</div>
						</div>
						<div className='col'>
							<div className='row d-flex'>
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
										<div className='col-md-3'>
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
										<div className='col-md-3'>
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
									</div>
								</div>
							</div>
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
								<div className='col-md-6'>
									<div className='col-12'>
										<FormGroup id='username' isFloating label='Your Username'>
											<Input
												autoComplete='off'
												{...register('username', {
													required: 'Username is required',
												})}
											/>
										</FormGroup>
										{errors.username?.message}
									</div>
									{/* <p className='mt-3'>Email</p>
							<div className='row border rounded'>
								<div className='col-auto mt-2'>
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
								<div className='col-3 mt-2 mb-2'>
									<span>''</span>
								</div>
							</div> */}
								</div>
							</div>
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
								<div className='col-md-6'>
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
									{/* <p className='mt-3'>Email</p>
							<div className='row border rounded'>
								<div className='col-auto mt-2'>
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
								<div className='col-3 mt-2 mb-2'>
									<span>''</span>
								</div>
							</div> */}
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
								<div className='col-md-6'>
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
														message: 'Phone Number must be 10 numbers',
													},
													maxLength: {
														value: 10,
														message: 'Phone Number must be 10 numbers',
													},
												})}
											/>
										</FormGroup>
										{errors.phone_number?.message}
									</div>
									{/* <p className='mt-3'>Mobile</p>
							<div className='row border rounded'>
								<div className='col-auto mt-2'>
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
								<div className='col-3 mt-2 mb-2'>
									<span>''</span>
								</div>
							</div> */}
								</div>
							</div>
						</div>
					</div>
				</form>
			</div>
			{/* <PageWrapper>
				<Page className='p-0'>
					<div className='row h-100 align-items-center justify-content-center'>
						<div className='col-xl-4 col-lg-6 col-md-8 shadow-3d-container'>
							<Card className='shadow-3d-dark'>
								<CardHeader>
									<CardLabel icon='People' iconColor='info'>
										<CardTitle tag='h4' className='h5'>
											{!editMode ? 'Add User Details' : 'Update User Details'}
										</CardTitle>
									</CardLabel>
									<CardActions>
										<Button
											icon='Backspace'
											color='info'
											isLight
											tag='a'
											to='/users'>
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
																	value: 15,
																	message:
																		'Password cannot exceed more than 15 characters',
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
			</PageWrapper> */}
		</>
	);
};

export default AddUpdateUser;
