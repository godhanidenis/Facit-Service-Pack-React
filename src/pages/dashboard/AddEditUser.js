// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable react/destructuring-assignment */
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Button from '../../components/bootstrap/Button';
import FormGroup from '../../components/bootstrap/forms/FormGroup';
import Input from '../../components/bootstrap/forms/Input';
// import Label from '../../components/bootstrap/forms/Label';
import Modal, {
	ModalBody,
	ModalFooter,
	ModalHeader,
	ModalTitle,
} from '../../components/bootstrap/Modal';
import { createUsersStart, updateUsersStart } from '../../redux/ducks/users';

const initialState = {
	email: '',
	password: '',
	username: '',
	first_name: '',
	last_name: '',
	phone_number: '',
};
const AddEditUser = (props) => {
	console.log('props', props);
	const { modalOpen } = props;
	const { setModalOpen } = props;
	const { currentUser } = props;
	const [formValue, setFormValue] = useState(initialState);
	const [id, setId] = useState('');
	// eslint-disable-next-line camelcase
	const { email, password, username, first_name, last_name, phone_number } = formValue;
	const dispatch = useDispatch();

	useEffect(() => {
		if (currentUser) {
			console.log('p id', currentUser.id);
			setId(currentUser.id);
			console.log('hy');

			setFormValue({
				username: currentUser.username,
				email: currentUser.email,
				first_name: currentUser.first_name,
				last_name: currentUser.last_name,
				phone_number: currentUser.phone_number,
			});
		} else {
			console.log('hello');
			setFormValue({ ...initialState });
		}
	}, [currentUser]);
	const handleSubmit = async () => {
		if (currentUser === null) {
			await dispatch(createUsersStart(formValue));
			setModalOpen(false);
		} else {
			console.log(':::::', id);
			await dispatch(updateUsersStart({ id, formValue }));
			setModalOpen(false);
		}
	};

	const onValueChange = (e) => {
		setFormValue({ ...formValue, [e.target.name]: e.target.value });
	};

	return (
		<div>
			<Modal isOpen={modalOpen} setIsOpen={setModalOpen} size='lg' isScrollable>
				<ModalHeader setIsOpen={setModalOpen}>
					<ModalTitle>{currentUser === null ? 'Create User' : 'Update User'}</ModalTitle>
				</ModalHeader>
				<ModalBody>
					<form className='row g-4'>
						<div className='col-12'>
							<FormGroup id='username' isFloating label='Your Username'>
								<Input
									autoComplete='username'
									onChange={(e) => onValueChange(e)}
									value={username || ''}
								/>
							</FormGroup>
						</div>
						{currentUser === null && (
							<div className='col-12'>
								<FormGroup id='password' isFloating label='Your Password'>
									<Input
										autoComplete='password'
										type='password'
										onChange={(e) => onValueChange(e)}
										value={password || ''}
									/>
								</FormGroup>
							</div>
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
									autoComplete='email'
									onChange={(e) => onValueChange(e)}
									value={email || ''}
								/>
							</FormGroup>
						</div>
						<div className='col-12'>
							<FormGroup id='first_name' isFloating label='Your FirstName'>
								<Input
									type='text'
									autoComplete='firstName'
									onChange={(e) => onValueChange(e)}
									// eslint-disable-next-line camelcase
									value={first_name || ''}
								/>
							</FormGroup>
						</div>
						<div className='col-12'>
							<FormGroup id='last_name' isFloating label='Your LastName'>
								<Input
									autoComplete='lastName'
									onChange={(e) => onValueChange(e)}
									// eslint-disable-next-line camelcase
									value={last_name || ''}
								/>
							</FormGroup>
						</div>
						<div className='col-12'>
							<FormGroup id='phone_number' isFloating label='Your PhoneNumber'>
								<Input
									autoComplete='phoneNumber'
									type='number'
									onChange={(e) => onValueChange(e)}
									// eslint-disable-next-line camelcase
									value={phone_number || ''}
								/>
							</FormGroup>
						</div>

						{/* <div className='col-12'>
							<FormGroup>
								<Label>Profile Picture</Label>
								<Input
									type='file'
									autoComplete='photo'
									// eslint-disable-next-line camelcase
									value={profile_picture}
									onChange={(e) => onValueChange(e)}
								/>
							</FormGroup>
						</div> */}
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
					</form>
				</ModalBody>
				<ModalFooter>
					<Button
						color={currentUser === null ? 'info' : 'success'}
						className='w-100 py-3'
						onClick={() => handleSubmit()}>
						{currentUser === null ? 'Create' : 'Update'}
					</Button>
				</ModalFooter>
			</Modal>
		</div>
	);
};

export default AddEditUser;
