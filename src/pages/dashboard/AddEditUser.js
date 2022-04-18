// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable react/destructuring-assignment */
import React from 'react';
// {
// 	useEffect, useState;
// }
import { useForm } from 'react-hook-form';

import { useDispatch } from 'react-redux';
import Button from '../../components/bootstrap/Button';
import FormGroup from '../../components/bootstrap/forms/FormGroup';
import Input from '../../components/bootstrap/forms/Input';
// import Label from '../../components/bootstrap/forms/Label';
import Modal, { ModalBody, ModalHeader, ModalTitle } from '../../components/bootstrap/Modal';
import { createUsersStart, updateUsersStart } from '../../redux/ducks/users';

// const initialState = {
// 	email: '',
// 	password: '',
// 	username: '',
// 	first_name: '',
// 	last_name: '',
// 	phone_number: '',
// };
const AddEditUser = (props) => {
	const { modalOpen } = props;
	const { setModalOpen } = props;
	const { currentUser } = props;
	const {
		register,
		handleSubmit,
		formState: { errors },
		// setValue,
		reset,
	} = useForm();
	// const [formValue, setFormValue] = useState({});
	// const [id, setId] = useState();
	// eslint-disable-next-line camelcase
	// const { email, password, username, first_name, last_name, phone_number } = formValue;
	const dispatch = useDispatch();

	const onSubmit = (data) => {
		// eslint-disable-next-line no-console
		console.log('data', data);

		if (currentUser === null) {
			console.log('add');

			dispatch(createUsersStart(data));
			setModalOpen(false);
		} else {
			console.log('update');
			dispatch(updateUsersStart({ currentUser.id, data }));
			setModalOpen(false);
		}
	};
	// useEffect(() => {
	// 	if (currentUser) {
	// 		setId(currentUser.id);

	// 		const fields = ['username', 'email', 'first_name', 'last_name', 'phone_number'];
	// 		fields.forEach((field) => setValue(field, currentUser[field]));
	// 		// setFormValue(currentUser);

	// 		// setFormValue({
	// 		// 	username: currentUser.username,
	// 		// 	email: currentUser.email,
	// 		// 	first_name: currentUser.first_name,
	// 		// 	last_name: currentUser.last_name,
	// 		// 	phone_number: currentUser.phone_number,
	// 		// });
	// 	}
	// }, [currentUser, setValue]);
	// const onValueChange = (e) => {
	// 	setFormValue({ ...formValue, [e.target.name]: e.target.value });
	// };

	return (
		<div>
			<Modal isOpen={modalOpen} setIsOpen={setModalOpen} size='lg' isScrollable>
				<ModalHeader setIsOpen={setModalOpen}>
					<ModalTitle>{currentUser === null ? 'Create User' : 'Update User'}</ModalTitle>
				</ModalHeader>
				<ModalBody>
					<form className='row g-4' onSubmit={handleSubmit(onSubmit)} onReset={reset}>
						<div className='col-12'>
							<FormGroup id='username' isFloating label='Your Username'>
								<Input
									autoComplete='off'
									{...register('username', { required: true })}
								/>
							</FormGroup>
						</div>
						{/* <p>{errors.username?.message}</p> */}
						{errors.username && 'Username is required'}
						{currentUser === null && (
							<>
								<div className='col-12'>
									<FormGroup id='password' isFloating label='Your Password'>
										<Input
											autoComplete='off'
											type='password'
											{...register('password', { required: true })}
										/>
									</FormGroup>
								</div>
								{/* <p>{errors.password?.message}</p> */}
								{errors.password && 'Password is required'}
							</>
						)}
						{/* <div className='col-12'>
												<FormGroup
													id='password'
													isFloating
													label='Confirm Your Password'>
													<Input
														autoComplete='password'
														type='password'
													/>
												</FormGroup>
											</div> */}
						<div className='col-12'>
							<FormGroup id='email' isFloating label='Your email'>
								<Input
									type='email'
									autoComplete='off'
									{...register('email', { required: true })}
								/>
							</FormGroup>
						</div>
						{/* <p>{errors.email?.message}</p> */}
						{errors.email && 'Email is required'}
						<div className='col-12'>
							<FormGroup id='first_name' isFloating label='Your FirstName'>
								<Input
									type='text'
									autoComplete='off'
									{...register('first_name', { required: true })}
								/>
							</FormGroup>
						</div>
						{/* <p>{errors.first_name?.message}</p> */}
						{errors.first_name && 'First Name is required'}

						<div className='col-12'>
							<FormGroup id='last_name' isFloating label='Your LastName'>
								<Input
									autoComplete='off'
									{...register('last_name', { required: true })}
								/>
							</FormGroup>
						</div>
						{/* <p>{errors.last_name?.message}</p> */}
						{errors.last_name && 'Last Name is required'}

						<div className='col-12'>
							<FormGroup id='phone_number' isFloating label='Your PhoneNumber'>
								<Input
									autoComplete='off'
									type='number'
									{...register('phone_number', { required: true })}
								/>
							</FormGroup>
						</div>
						{/* <p>{errors.phone_number?.message}</p> */}
						{errors.phone_number && 'Phone Number is required'}

						{/* <div className='col-12'>
							<FormGroup>
								<Label>Profile Picture</Label>
								<Input
									type='file'
									autoComplete='off'
									{...register('profile_picture', { required: true })}

									// eslint-disable-next-line camelcase
									// value={profile_picture}
									// onChange={(e) => onValueChange(e)}
								/>
							</FormGroup>
						</div>
						{errors.profile_picture && 'Profile Picture is required'} */}

						{/* 	<div className='col-4'>
												<FormGroup>
													<Label>Is Active</Label>
													<ChecksGroup isInline>
														<Checks
															type='radio'
															label='True'
															value='true'
															checked='true'
															onChange={(e) =>
																console.log(
																	'first',
																	e.currentTarget.value,
																)
															}
															name='isActive'
														/>
														<Checks
															type='radio'
															label='False'
															value='false'
															checked='false'
															onChange={(e) =>
																console.log('first', e.target.value)
															}
															name='isActive'
														/>
													</ChecksGroup>
												</FormGroup>
											</div>

											<div className='col-4'>
												<FormGroup>
													<Label>Is SuperUser</Label>
													<ChecksGroup isInline>
														<Checks
															checked='true'
															type='radio'
															label='True'
															value='true'
															onChange={(e) =>
																console.log(
																	'first',
																	e.currentTarget.value,
																)
															}
															name='isSuperUser'
														/>
														<Checks
															checked='false'
															type='radio'
															label='False'
															value='false'
															onChange={(e) =>
																console.log('first', e.target.value)
															}
															name='isSuperUser'
														/>
													</ChecksGroup>
												</FormGroup>
											</div>

											<div className='col-4'>
												<FormGroup>
													<Label>Is Staff</Label>
													<ChecksGroup isInline>
														<Checks
															checked='true'
															type='radio'
															label='True'
															value='true'
															onChange={(e) =>
																console.log(
																	'first',
																	e.currentTarget.value,
																)
															}
															name='isStaff'
														/>
														<Checks
															checked='false'
															type='radio'
															label='False'
															value='false'
															onChange={(e) =>
																console.log('first', e.target.value)
															}
															name='isStaff'
														/>
													</ChecksGroup>
												</FormGroup>
											</div> */}
						<div className='col-12'>
							<Button
								color={currentUser === null ? 'info' : 'success'}
								className='w-100 py-3'
								type='submit'
								// onClick={() => handleSubmit()}
							>
								{currentUser === null ? 'Create' : 'Update'}
							</Button>
						</div>
					</form>
				</ModalBody>
				{/* <ModalFooter>
					<Button
						color={currentUser === null ? 'info' : 'success'}
						className='w-100 py-3'
						onClick={() => handleSubmit()}>
						{currentUser === null ? 'Create' : 'Update'}
					</Button>
				</ModalFooter> */}
			</Modal>
		</div>
	);
};

export default AddEditUser;
