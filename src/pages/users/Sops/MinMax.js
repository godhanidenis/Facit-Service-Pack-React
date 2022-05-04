import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import Page from '../../../layout/Page/Page';
import Card, {
	CardHeader,
	CardBody,
	CardLabel,
	CardTitle,
} from '../../../components/bootstrap/Card';
import Button from '../../../components/bootstrap/Button';

import FormGroup from '../../../components/bootstrap/forms/FormGroup';
import Input from '../../../components/bootstrap/forms/Input';

const MinMax = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		setValue,
		reset,
	} = useForm();
	const onSubmit = (data) => {
		console.log('AddEdit FormData', data);
	};
	const onError = (errors) => console.log('Errors Occurred !! :', errors);

	return (
		<PageWrapper>
			<Page className='p-0'>
				<div className='row h-100 align-items-center justify-content-center'>
					<div className='col-xl-4 col-lg-6 col-md-8 shadow-3d-container'>
						<Card className='shadow-3d-dark'>
							<CardHeader>
								<CardLabel icon='People' iconColor='info'>
									<CardTitle tag='h4' className='h5'>
										Add Sub Sops
									</CardTitle>
								</CardLabel>
							</CardHeader>
							<CardBody>
								<form
									className='row g-4'
									onSubmit={handleSubmit(onSubmit, onError)}
									onReset={reset}>
									<div className='col-12'>
										<FormGroup id='min' isFloating label='Your min value'>
											<Input
												autoComplete='off'
												type='number'
												{...register('min', {
													required: 'min is required',
												})}
											/>
										</FormGroup>
										{errors.min?.message}
									</div>

									<div className='col-12'>
										<FormGroup id='max' isFloating label='Your max value'>
											<Input
												autoComplete='off'
												type='number'
												{...register('max', {
													required: 'max is required',
												})}
											/>
										</FormGroup>
										{errors.max?.message}
									</div>

									<div className='col-12'>
										<Button color='info' className='w-100 py-3' type='submit'>
											Create
										</Button>
									</div>
								</form>
							</CardBody>
						</Card>
					</div>
				</div>
			</Page>
		</PageWrapper>
	);
};

export default MinMax;
