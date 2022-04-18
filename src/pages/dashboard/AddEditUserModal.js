import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import Button from '../../components/bootstrap/Button';
import FormGroup from '../../components/bootstrap/forms/FormGroup';
import Input from '../../components/bootstrap/forms/Input';
import Modal, { ModalBody, ModalHeader, ModalTitle } from '../../components/bootstrap/Modal';
import { createUsersStart, updateUsersStart } from '../../redux/ducks/users';

const AddEditUserModal = (props) => {
	const dispatch = useDispatch();

	const { currentUser, modalOpen, setModalOpen } = props;

	const {
		register,
		handleSubmit,
		formState: { errors },
		setValue,
		reset,
	} = useForm();

	useEffect(() => {
		if (currentUser) {
			const fields = ['username', 'email', 'first_name', 'last_name', 'phone_number'];
			fields.forEach((field) => setValue(field, currentUser[field]));
		}
	}, [currentUser, setValue]);

	const onSubmit = (data, e) => {
		console.log('AddEdit Formdata', data);
		if (currentUser) {
			dispatch(updateUsersStart({ id: currentUser?.id, toBeUpdatedUser: data }));
			setModalOpen(false);
		} else {
			dispatch(createUsersStart(data));
			setModalOpen(false);
		}
	};

	const onError = (errors, e) => console.log('Errors Occured !! :', errors);

	return (
		<>
			<Modal isOpen={modalOpen} setIsOpen={setModalOpen} size='lg' isScrollable>
				<ModalHeader setIsOpen={setModalOpen}>
					<ModalTitle>{currentUser === null ? 'Create User' : 'Update User'}</ModalTitle>
				</ModalHeader>
				<ModalBody>
					<form
						className='row g-4'
						onSubmit={handleSubmit(onSubmit, onError)}
						onReset={reset}>
						<div className='col-12'>
							<FormGroup id='username' isFloating label='Your Username'>
								<Input
									autoComplete='off'
									{...register('username', { required: true })}
								/>
							</FormGroup>
							{errors.username && 'Username is required'}
						</div>
						{!currentUser && modalOpen && (
							<>
								<div className='col-12'>
									<FormGroup id='password' isFloating label='Your Password'>
										<Input
											autoComplete='off'
											type='password'
											{...register('password', {
												required: currentUser ? false : true,
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
							<FormGroup id='first_name' isFloating label='Your FirstName'>
								<Input
									type='text'
									autoComplete='off'
									{...register('first_name', { required: true })}
								/>
							</FormGroup>
							{errors.first_name && 'First Name is required'}
						</div>

						<div className='col-12'>
							<FormGroup id='last_name' isFloating label='Your LastName'>
								<Input
									autoComplete='off'
									{...register('last_name', { required: true })}
								/>
							</FormGroup>
							{errors.last_name && 'Last Name is required'}
						</div>

						<div className='col-12'>
							<FormGroup id='phone_number' isFloating label='Your PhoneNumber'>
								<Input
									autoComplete='off'
									type='number'
									{...register('phone_number', { required: true })}
								/>
							</FormGroup>
							{errors.phone_number && 'Phone Number is required'}
						</div>

						<div className='col-12'>
							<Button
								color={currentUser ? 'success' : 'info'}
								className='w-100 py-3'
								type='submit'>
								{currentUser ? 'Update' : 'Create'}
							</Button>
						</div>
					</form>
				</ModalBody>
			</Modal>
		</>
	);
};

export default AddEditUserModal;
