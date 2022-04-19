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

	const { id } = useParams();
	console.log('id', id);

	const [editMode, setEditMode] = useState(false);
	const { users } = useSelector((state) => state.data);

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
				'arrow.png',
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
		if (id) {
			formData.append('profile_picture', updateProfilePictureFile);
		} else {
			formData.append('profile_picture', data.profile_picture[0]);
		}

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
			setUpdateProfilePictureFile(e.target.files[0]);
			setSelectedImage(URL.createObjectURL(e.target.files[0]));
		}
	};

	// const deleteFile = () => {
	// 	setSelectedImage();
	// };
	// const inputFile = useRef(null);

	// const onClick = (e) => {
	// 	inputFile.current.click();
	// };

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
											<FormGroup
												id='username'
												isFloating
												label='Your Username'>
												<Input
													autoComplete='off'
													{...register('username', { required: true })}
												/>
											</FormGroup>
											{errors.username && 'Username is required'}
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
																required: editMode ? false : true,
															})}
														/>
													</FormGroup>
												</div>
												{errors.password && 'Password is required'}
											</>
										)}
										<div className='col-12'>
											<FormGroup id='email' isFloating label='Your email'>
												<Input
													type='email'
													autoComplete='off'
													{...register('email', { required: true })}
												/>
											</FormGroup>
											{errors.email && 'Email is required'}
										</div>
										<div className='col-12'>
											<FormGroup
												id='first_name'
												isFloating
												label='Your FirstName'>
												<Input
													type='text'
													autoComplete='off'
													{...register('first_name', { required: true })}
												/>
											</FormGroup>
											{errors.first_name && 'First Name is required'}
										</div>

										<div className='col-12'>
											<FormGroup
												id='last_name'
												isFloating
												label='Your LastName'>
												<Input
													autoComplete='off'
													{...register('last_name', { required: true })}
												/>
											</FormGroup>
											{errors.last_name && 'Last Name is required'}
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
														required: true,
													})}
												/>
											</FormGroup>
											{errors.phone_number && 'Phone Number is required'}
										</div>
										<div className='col-12'>
											<div className='row g-4 align-items-center'>
												<div className='col-lg-auto'>
													<Avatar
														src={selectedImage || UserImage}
														// onClick={onClick}
													/>
												</div>
												<div className='col-lg'>
													<div className='row g-4'>
														<div className='col-auto'>
															<Input
																type='file'
																autoComplete='off'
																{...register('profile_picture', {
																	required: editMode
																		? false
																		: true,
																})}
																onChange={imageChange}
																// ref={inputFile}
															/>
														</div>
														{errors.profile_picture &&
															'Profile Picture is required'}
													</div>
												</div>
											</div>
										</div>

										<div className='col-12'>
											<Button
												color={editMode ? 'success' : 'info'}
												className='w-100 py-3'
												type='submit'>
												{!editMode ? 'Add' : 'Update'}
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
