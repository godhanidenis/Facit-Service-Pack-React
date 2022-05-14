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
		<div className='row align-items-center justify-content-center p-5'>
			<form className='row g-4' onSubmit={handleSubmit(onSubmit, onError)} onReset={reset}>
				<div className='row pt-5 '>
					<div className='col-4 d-flex align-items-center justify-content-center'>
						<div className='row g-4 d-flex align-items-right justify-content-right p-0'>
							<div className='row-md-auto d-flex p-0'>
								<Avatar src={selectedImage || UserImage} onClick={() => Open()} />
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
						<div className='row g-4 d-flex align-items-right justify-content-right p-0'>
							<div className='col-lg'>
								<Input
									type='file'
									autoComplete='off'
									{...register('profile_picture', {
										required: editMode ? false : 'Profile Picture is required',
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
										<FormGroup id='last_name' isFloating label='Your LastName'>
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
							</div>
						</div>
					</div>
				</div>
				<div className='row'>
					<div className='col-12' style={{ marginTop: 50 }}>
						<div className='row d-flex'>
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
	);
};

export default AddUpdateUser;
