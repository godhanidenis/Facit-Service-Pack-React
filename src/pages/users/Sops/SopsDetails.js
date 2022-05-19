import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import {
	deleteSubSopsStart,
	loadSubSopsStart,
	updateSubSopsStart,
} from '../../../redux/ducks/subSops';
import Card, { CardBody } from '../../../components/bootstrap/Card';
import Icon from '../../../components/icon/Icon';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import Page from '../../../layout/Page/Page';
import FormGroup from '../../../components/bootstrap/forms/FormGroup';
import Input from '../../../components/bootstrap/forms/Input';
import Button from '../../../components/bootstrap/Button';
import Label from '../../../components/bootstrap/forms/Label';
import Select from '../../../components/bootstrap/forms/Select';
import Option from '../../../components/bootstrap/Option';
import DeleteModel from '../../../common/ConfirmationModal';
import { updateTagListStart } from '../../../redux/ducks/tagList';
import { updateSkillSetListStart } from '../../../redux/ducks/skillSetList';
import Spinner from '../../../components/bootstrap/Spinner';

const SopsDetails = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const perams = useParams();
	console.log('peramssssss', perams);
	const [tagId, setTagId] = useState();
	const { subSops, loading } = useSelector((state) => state.subSops);
	const [deleteModalOpen, setDeleteModalOpen] = useState(false);
	const [currentSubSops, setCurrentSubSops] = useState();
	const {
		register,
		handleSubmit,
		formState: { errors },
		setValue,
		reset,
	} = useForm();
	const [tagList, setTagList] = useState([]);
	const [skillSetList, setSkillSetList] = useState([]);

	useEffect(() => {
		const formData = {
			doctype: perams.sop_slug,
		};
		dispatch(loadSubSopsStart({ id: perams.id, slug: formData }));
	}, [dispatch, perams.id, perams.sop_slug]);

	const handleDeleteSubSops = () => {
		dispatch(
			deleteSubSopsStart({
				id: currentSubSops?._id,
			}),
		);
		setDeleteModalOpen(false);
	};

	const taggingData = () => {
		if (subSops.length) {
			subSops?.map((sub) => {
				console.log('sub/..............', sub);
				// eslint-disable-next-line no-sequences
				return (
					setTagList(sub?._source?.tag_list),
					setSkillSetList(sub?._source?.skill_set_list),
					setTagId(sub?._id),
					setValue('min', sub?._source?.min),
					setValue('max', sub?._source?.max),
					setValue('sentiment_type', sub?._source?.sentiment_type),
					setValue('incidents_type', sub?._source?.incidents_type),
					setValue('type', sub?._source?.type)
				);
			});
		}
	};

	useEffect(() => {
		if (subSops) {
			taggingData();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [subSops]);
	const onSubmit = (data) => {
		const formDataUpdateTagging = {
			doctype: perams.sop_slug.replace('_found', ''),
			tag_list: tagList,
			user_id: Number(perams.id),
		};
		const formDataUpdateSkill = {
			doctype: perams.sop_slug.replace('_found', ''),
			skill_set_list: skillSetList,
			user_id: Number(perams.id),
		};
		const formDataUpdateMinMaxSentimate = {
			doctype: perams.sop_slug.replace('_found', ''),
			user_id: Number(perams.id),
			min: Number(data?.min),
			max: Number(data?.max),
			sentiment_type: data?.sentiment_type,
		};
		const formDataUpdateMinMaxIncident = {
			doctype: perams.sop_slug.replace('_found', ''),
			user_id: Number(perams.id),
			min: Number(data?.min),
			max: Number(data?.max),
			incidents_type: data?.incidents_type,
		};
		const formDataUpdateMinMaxType = {
			doctype: perams.sop_slug.replace('_found', ''),
			user_id: Number(perams.id),
			min: Number(data?.min),
			max: Number(data?.max),
			type: data?.type,
		};
		if (perams.sop_slug === 'tagging_found') {
			dispatch(
				updateTagListStart({
					id: tagId,
					record: formDataUpdateTagging,
				}),
			);
		}
		if (perams.sop_slug === 'skill_set_found') {
			dispatch(
				updateSkillSetListStart({
					id: tagId,
					record: formDataUpdateSkill,
				}),
			);
		}

		if (perams.sop_slug === 'tagging_found') {
			dispatch(
				updateSubSopsStart({
					id: tagId,
					record: formDataUpdateTagging,
				}),
			);
		} else if (perams.sop_slug === 'skill_set_found') {
			dispatch(
				updateSubSopsStart({
					id: tagId,
					record: formDataUpdateSkill,
				}),
			);
		} else if (
			perams.sop_slug === 'customer_call_end_sentiment_found' ||
			perams.sop_slug === 'customer_overall_call_sentiment_found' ||
			perams.sop_slug === 'customer_call_start_sentiment_found' ||
			perams.sop_slug === 'customer_overtalk_incidents_found' ||
			perams.sop_slug === 'overall_call_sentiment_found' ||
			perams.sop_slug === 'call_start_sentiment_found' ||
			perams.sop_slug === 'call_end_sentiment_found' ||
			perams.sop_slug === 'overtalk_incidents_found'
		) {
			dispatch(
				updateSubSopsStart({
					id: tagId,
					record: formDataUpdateMinMaxSentimate,
				}),
			);
		} else if (
			perams.sop_slug === 'silence_incidents_found' ||
			perams.sop_slug === 'customer_silence_incidents_found'
		) {
			dispatch(
				updateSubSopsStart({
					id: tagId,
					record: formDataUpdateMinMaxIncident,
				}),
			);
		} else if (
			perams.sop_slug === 'rate_of_speech_found' ||
			perams.sop_slug === 'responsiveness_found' ||
			perams.sop_slug === 'customer_rate_of_speech_found' ||
			perams.sop_slug === 'customer_responsiveness_found' ||
			perams.sop_slug === 'customer_clarity_found'
		) {
			dispatch(
				updateSubSopsStart({
					id: tagId,
					record: formDataUpdateMinMaxType,
				}),
			);
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
			<PageWrapper>
				<Page className='p-0'>
					{(() => {
						switch (perams.sop_slug) {
							case 'tagging_found':
								return (
									<div>
										{subSops.length ? (
											<form
												className='row g-4 w-75'
												onSubmit={handleSubmit(onSubmit, onError)}
												onReset={reset}>
												<div className='col-12'>
													<FormGroup
														id='tag_list'
														isFloating
														label='Your tag_list'>
														<Input
															autoComplete='off'
															{...register('tag_list')}
															onKeyPress={(ev) => {
																if (ev.key === 'Enter') {
																	ev.preventDefault();
																	setTagList([
																		...tagList,
																		ev.target.value,
																	]);
																}
															}}
														/>
													</FormGroup>
													{errors.tag_list?.message}
												</div>
												<div className='d-flex align-items-center'>
													{tagList &&
														tagList?.map((tag) => {
															return (
																<div
																	key={tag}
																	style={{
																		display: 'flex',
																		alignItems: 'center',
																		justifyContent:
																			'space-between',
																		padding: '5px',
																		border: '1px solid gray',
																		borderRadius: '12px',
																		width: '140px',
																		margin: '8px',
																	}}>
																	<span className='fw-bold'>
																		{tag}
																	</span>
																	<Icon
																		size='lg'
																		icon='Cancel'
																		color='danger'
																		style={{
																			cursor: 'pointer',
																		}}
																		onClick={() =>
																			setTagList((tags) =>
																				tags.filter(
																					(tg) =>
																						tg !== tag,
																				),
																			)
																		}
																	/>
																</div>
															);
														})}
												</div>
												<div className='col-12'>
													<Button
														color='success'
														className='mb-2'
														style={{
															display: 'flex',
															marginLeft: 'auto',
														}}
														type='submit'>
														Save
													</Button>
												</div>
											</form>
										) : (
											''
										)}
									</div>
								);

							case 'skill_set_found':
								return (
									<div>
										{subSops.length ? (
											<form
												className='row g-4 w-75'
												onSubmit={handleSubmit(onSubmit, onError)}
												onReset={reset}>
												<div className='col-12'>
													<FormGroup
														id='skill_set_list'
														isFloating
														label='Your skill_set_list'>
														<Input
															autoComplete='off'
															{...register('skill_set_list')}
															onKeyPress={(ev) => {
																if (ev.key === 'Enter') {
																	ev.preventDefault();
																	console.log(ev.target.value);
																	setSkillSetList([
																		...skillSetList,
																		ev.target.value,
																	]);
																}
															}}
														/>
													</FormGroup>
													{errors.skill_set_list?.message}
												</div>
												<div className='d-flex align-items-center'>
													{skillSetList &&
														skillSetList?.map((skill) => {
															return (
																<div
																	key={skill}
																	style={{
																		display: 'flex',
																		alignItems: 'center',
																		justifyContent:
																			'space-between',
																		padding: '5px',
																		border: '1px solid gray',
																		borderRadius: '12px',
																		width: '150px',
																		margin: '8px',
																	}}>
																	<span className='fw-bold'>
																		{skill}
																	</span>
																	<Icon
																		size='lg'
																		icon='Cancel'
																		color='danger'
																		style={{
																			cursor: 'pointer',
																		}}
																		onClick={() =>
																			setSkillSetList(
																				(skills) =>
																					skills.filter(
																						(sk) =>
																							sk !==
																							skill,
																					),
																			)
																		}
																	/>
																</div>
															);
														})}
												</div>
												<div className='col-12'>
													<Button
														color='success'
														className='mb-2'
														style={{
															display: 'flex',
															marginLeft: 'auto',
														}}
														type='submit'>
														Save
													</Button>
												</div>
											</form>
										) : (
											''
										)}
									</div>
								);

							case 'customer_call_end_sentiment_found':
							case 'customer_overall_call_sentiment_found':
							case 'customer_overtalk_incidents_found':
							case 'customer_call_start_sentiment_found':
							case 'overall_call_sentiment_found':
							case 'call_start_sentiment_found':
							case 'call_end_sentiment_found':
							case 'overtalk_incidents_found':
								return (
									<div style={{ opacity: loading ? 0.5 : 1 }}>
										{subSops.length ? (
											<form
												className='row g-4 w-75'
												onSubmit={handleSubmit(onSubmit, onError)}
												onReset={reset}>
												<div className='col-12'>
													<FormGroup
														id='min'
														isFloating
														label='Your min value'>
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
													<FormGroup
														id='max'
														isFloating
														label='Your max value'>
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
													<Label>Select Sentiment Type</Label>
													<FormGroup>
														<Select
															size='sm'
															ariaLabel='Select sentiment_type'
															{...register('sentiment_type', {
																required:
																	'sentiment_type is required',
															})}>
															<Option value=''>
																Select sentiment_type
															</Option>
															<Option value='True'>True</Option>
															<Option value='False'>False</Option>
														</Select>
														{errors.sentiment_type?.message}
													</FormGroup>
												</div>
												<div className='col-12'>
													<Button
														color='success'
														className='mb-2'
														style={{
															display: 'flex',
															marginLeft: 'auto',
														}}
														type='submit'>
														Save
													</Button>
												</div>
											</form>
										) : (
											''
										)}
									</div>
								);

							case 'customer_silence_incidents_found':
							case 'silence_incidents_found':
								return (
									<div style={{ opacity: loading ? 0.5 : 1 }}>
										{subSops.length ? (
											<form
												className='row g-4 w-75'
												onSubmit={handleSubmit(onSubmit, onError)}
												onReset={reset}>
												<div className='col-12'>
													<FormGroup
														id='min'
														isFloating
														label='Your min value'>
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
													<FormGroup
														id='max'
														isFloating
														label='Your max value'>
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
													<Label>Select incident Type</Label>
													<FormGroup>
														<Select
															size='sm'
															ariaLabel='Select incidents_type'
															{...register('incidents_type', {
																required:
																	'incidents_type is required',
															})}>
															<Option value=''>
																Select incidents_type
															</Option>
															<Option value='True'>True</Option>
															<Option value='False'>False</Option>
														</Select>
														{errors.incidents_type?.message}
													</FormGroup>
												</div>
												<div className='col-12'>
													<Button
														color='success'
														className='mb-2'
														style={{
															display: 'flex',
															marginLeft: 'auto',
														}}
														type='submit'>
														Save
													</Button>
												</div>
											</form>
										) : (
											''
										)}
									</div>
								);

							case 'rate_of_speech_found':
							case 'responsiveness_found':
							case 'customer_rate_of_speech_found':
							case 'customer_responsiveness_found':
							case 'customer_clarity_found':
								return (
									<div style={{ opacity: loading ? 0.5 : 1 }}>
										{subSops.length ? (
											<form
												className='row g-4 w-75'
												onSubmit={handleSubmit(onSubmit, onError)}
												onReset={reset}>
												<div className='col-12'>
													<FormGroup
														id='min'
														isFloating
														label='Your min value'>
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
													<FormGroup
														id='max'
														isFloating
														label='Your max value'>
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
													<Label>Select Type</Label>
													<FormGroup>
														<Select
															size='sm'
															ariaLabel='Select incidents_type'
															{...register('type', {
																required: 'type is required',
															})}>
															<Option value=''>Select type</Option>
															<Option value='True'>True</Option>
															<Option value='False'>False</Option>
														</Select>

														{errors.type?.message}
													</FormGroup>
												</div>
												<div className='col-12'>
													<Button
														color='success'
														className='mb-2'
														style={{
															display: 'flex',
															marginLeft: 'auto',
														}}
														type='submit'>
														Save
													</Button>
												</div>
											</form>
										) : (
											''
										)}
									</div>
								);

							case 'call_refreshment_found':
							case 'on_hold_found':
							case 'customer_verification_found':
							case 'call_closure_found':
							case 'call_opening_found':
							case 'call_additional_info_found':
							case 'call_alternate_channel_found':
								return (
									<div
										className='row d-flex align-items-center justify-content-between'
										style={{ opacity: loading ? 0.5 : 1 }}>
										{subSops.length &&
											subSops?.map((subSop) => {
												return (
													<div className='col-md-6'>
														<Card key={subSop?._id}>
															<CardBody>
																<div className='row'>
																	<div className='col-md-10'>
																		<h4>
																			{subSop?._source?.text}
																		</h4>
																	</div>
																	<div className='col-md-2 d-flex align-items-center justify-content-between'>
																		<Icon
																			size='lg'
																			icon='Edit'
																			color='info'
																			style={{
																				cursor: 'pointer',
																			}}
																			onClick={() => {
																				navigate(
																					`/users/${perams.id}/sops/${perams.sop_slug}/sub/update`,
																					{
																						state: {
																							id: subSop?._id,
																						},
																					},
																				);
																			}}
																		/>
																		<Icon
																			size='lg'
																			icon='Delete'
																			color='danger'
																			style={{
																				cursor: 'pointer',
																				// marginLeft: '25px',
																			}}
																			onClick={() => {
																				setCurrentSubSops(
																					subSop,
																				);
																				setDeleteModalOpen(
																					true,
																				);
																			}}
																		/>
																	</div>
																</div>
															</CardBody>
														</Card>
													</div>
												);
											})}
									</div>
								);
							default:
								return null;
						}
					})()}
				</Page>
			</PageWrapper>

			<DeleteModel
				deleteModalOpen={deleteModalOpen}
				setDeleteModalOpen={setDeleteModalOpen}
				handleDeleteOpration={handleDeleteSubSops}
				alertLable='Delete SubSops'
			/>
		</>
	);
};

export default SopsDetails;
