import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import Page from '../../../layout/Page/Page';
import Button from '../../../components/bootstrap/Button';
import Icon from '../../../components/icon/Icon';
import FormGroup from '../../../components/bootstrap/forms/FormGroup';
import Input from '../../../components/bootstrap/forms/Input';
import Label from '../../../components/bootstrap/forms/Label';
import Select from '../../../components/bootstrap/forms/Select';
import Option from '../../../components/bootstrap/Option';
import { createSubSopsStart, updateSubSopsStart } from '../../../redux/ducks/subSops';

const AddUpdateSubSops = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const location = useLocation();
	const perams = useParams();
	console.log('params', perams);

	const [editMode, setEditMode] = useState(false);
	const [keywordsList, setKeywordsList] = useState([]);
	const [tagList, setTagList] = useState([]);
	const [skillSetList, setSkillSetList] = useState([]);

	// Selectors
	const { teams } = useSelector((state) => state.teams);
	const { subSops } = useSelector((state) => state.subSops);
	const { tagLists } = useSelector((state) => state.tagLists);
	const { skillSetLists } = useSelector((state) => state.skillSetLists);
	console.log('skillSetLists', skillSetLists);
	const {
		register,
		handleSubmit,
		formState: { errors },
		setValue,
		reset,
	} = useForm();

	useEffect(() => {
		if (editMode) {
			const singleSubSop = subSops.find((subSop) => subSop._id === location?.state?.id);
			console.log('singleSubSop', singleSubSop);
			setValue('tag_type', singleSubSop?._source?.tag_type);
			setValue('skill_set_list', singleSubSop?._source?.skill_set_list);
		}
	}, [editMode, location?.state?.id, setValue, subSops, tagLists, skillSetLists]);

	useEffect(() => {
		setTagList(tagLists[0]?._source?.tag_list);
		setSkillSetList(skillSetLists[0]?._source?.skill_set_list);
		if (!location?.state?.id) {
			setEditMode(false);
		} else {
			setEditMode(true);
			if (subSops?.length) {
				const selectedSop = subSops.find((subSop) => subSop._id === location?.state?.id);
				console.log('selectedSop :', selectedSop);

				setValue('text', selectedSop?._source?.text);
				setValue('score', selectedSop?._source?.score);
				setValue('min', selectedSop?._source?.min);
				setValue('max', selectedSop?._source?.max);
				setValue('sentiment_type', selectedSop?._source?.sentiment_type);
				setValue('incidents_type', selectedSop?._source?.incidents_type);
				setValue('type', selectedSop?._source?.type);
				// setValue('tag_type', selectedSop?._source?.tag_type);
				setKeywordsList(selectedSop?._source?.keywords);

				// if (perams.sop_slug === 'tagging_found') {
				// 	setTagList(selectedSop?._source?.tag_list);
				// }
				// if (perams.sop_slug === 'skill_set_found') {
				// 	setSkillSetList(selectedSop?._source?.skill_set_list);
				// }
				// setTagList(selectedSop?._source?.tag_list);
				const teamList = [];
				// eslint-disable-next-line array-callback-return
				selectedSop?._source?.team_list?.map((teamId) => {
					teamList.push(String(teamId));
				});
				setValue('team_list', teamList);
			}
		}
	}, [
		perams.id,
		perams.sop_slug,
		location?.state?.id,
		setValue,
		subSops,
		tagLists,
		skillSetLists,
	]);

	const onSubmit = (data) => {
		console.log('SopAddUpdate FormData', data);
		const teamList = [];
		// eslint-disable-next-line array-callback-return
		data.team_list?.map((ar) => {
			teamList.push(Number(ar));
		});
		const formDataCreate = {
			record: {
				doctype: perams.sop_slug.replace('_found', ''),
				text: data.text,
				score: Number(data.score),
				team_list: teamList,
				user_id: Number(perams.id),
			},
		};
		const formDataCreateVerification = {
			record: {
				doctype: perams.sop_slug.replace('_found', ''),
				text: data.text,
				score: Number(data.score),
				team_list: teamList,
				skill_set_list: data.skill_set_list,
				user_id: Number(perams.id),
			},
		};
		const formDataUpdate = {
			doctype: perams.sop_slug.replace('_found', ''),
			text: data.text,
			score: Number(data.score),
			team_list: teamList,
			user_id: Number(perams.id),
		};
		const formDataUpdateVerification = {
			doctype: perams.sop_slug.replace('_found', ''),
			text: data.text,
			score: Number(data.score),
			team_list: teamList,
			skill_set_list: data.skill_set_list,
			user_id: Number(perams.id),
		};

		const formDataCreateOnHoldCallRefreshMent = {
			record: {
				doctype: perams.sop_slug.replace('_found', ''),
				text: data.text,
				score: Number(data.score),
				team_list: teamList,
				user_id: Number(perams.id),
				keywords: keywordsList,
			},
		};
		const formDataUpdateOnHoldCallRefreshMent = {
			doctype: perams.sop_slug.replace('_found', ''),
			text: data.text,
			score: Number(data.score),
			team_list: teamList,
			user_id: Number(perams.id),
			keywords: keywordsList,
		};
		const formDataCreateTagging = {
			record: {
				doctype: perams.sop_slug.replace('_found', ''),
				tag_list: tagList,
				user_id: Number(perams.id),
			},
		};

		const formDataCreateCallInfoChannel = {
			record: {
				doctype: perams.sop_slug.replace('_found', ''),
				text: data.text,
				score: Number(data.score),
				team_list: teamList,
				user_id: Number(perams.id),
				tag_type: data.tag_type,
			},
		};
		const formDataUpdateCallInfoChannel = {
			doctype: perams.sop_slug.replace('_found', ''),
			text: data.text,
			score: Number(data.score),
			team_list: teamList,
			user_id: Number(perams.id),
			tag_type: data.tag_type,
		};
		const formDataCreateMinMaxSentimate = {
			record: {
				doctype: perams.sop_slug.replace('_found', ''),
				user_id: Number(perams.id),
				min: Number(data?.min),
				max: Number(data?.max),
				sentiment_type: data?.sentiment_type,
			},
		};

		const formDataCreateMinMaxIncident = {
			record: {
				doctype: perams.sop_slug.replace('_found', ''),
				user_id: Number(perams.id),
				min: Number(data?.min),
				max: Number(data?.max),
				incidents_type: data?.incidents_type,
			},
		};

		const formDataCreateMinMaxType = {
			record: {
				doctype: perams.sop_slug.replace('_found', ''),
				user_id: Number(perams.id),
				min: Number(data?.min),
				max: Number(data?.max),
				type: data?.type,
			},
		};

		if (editMode) {
			if (
				perams.sop_slug === 'on_hold_found' ||
				perams.sop_slug === 'call_refreshment_found'
			) {
				dispatch(
					updateSubSopsStart({
						id: location?.state?.id,
						record: formDataUpdateOnHoldCallRefreshMent,
					}),
				);
			} else if (
				perams.sop_slug === 'call_additional_info_found' ||
				perams.sop_slug === 'call_alternate_channel_found'
			) {
				dispatch(
					updateSubSopsStart({
						id: location?.state?.id,
						record: formDataUpdateCallInfoChannel,
					}),
				);
			} else if (perams.sop_slug === 'customer_verification_found') {
				dispatch(
					updateSubSopsStart({
						id: location?.state?.id,
						record: formDataUpdateVerification,
					}),
				);
			} else {
				dispatch(updateSubSopsStart({ id: location?.state?.id, record: formDataUpdate }));
			}
			navigate(`/users/${perams.id}/sops/${perams.sop_slug}`);
		} else {
			if (
				perams.sop_slug === 'on_hold_found' ||
				perams.sop_slug === 'call_refreshment_found'
			) {
				dispatch(createSubSopsStart(formDataCreateOnHoldCallRefreshMent));
			} else if (perams.sop_slug === 'tagging_found') {
				dispatch(createSubSopsStart(formDataCreateTagging));
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
				dispatch(createSubSopsStart(formDataCreateMinMaxSentimate));
			} else if (
				perams.sop_slug === 'silence_incidents_found' ||
				perams.sop_slug === 'customer_silence_incidents_found'
			) {
				dispatch(createSubSopsStart(formDataCreateMinMaxIncident));
			} else if (
				perams.sop_slug === 'rate_of_speech_found' ||
				perams.sop_slug === 'responsiveness_found' ||
				perams.sop_slug === 'customer_rate_of_speech_found' ||
				perams.sop_slug === 'customer_responsiveness_found' ||
				perams.sop_slug === 'customer_clarity_found'
			) {
				dispatch(createSubSopsStart(formDataCreateMinMaxType));
			} else if (
				perams.sop_slug === 'call_additional_info_found' ||
				perams.sop_slug === 'call_alternate_channel_found'
			) {
				dispatch(createSubSopsStart(formDataCreateCallInfoChannel));
			} else if (perams.sop_slug === 'customer_verification_found') {
				dispatch(createSubSopsStart(formDataCreateVerification));
			} else {
				dispatch(createSubSopsStart(formDataCreate));
			}
			navigate(`/users/${perams.id}/sops/${perams.sop_slug}`);
		}
	};
	const onError = (errors) => console.log('Errors Occurred !! :', errors);

	return (
		<PageWrapper>
			<Page className='p-0'>
				<form
					className='row g-4 w-75'
					onSubmit={handleSubmit(onSubmit, onError)}
					onReset={reset}>
					{(perams.sop_slug === 'call_opening_found' ||
						perams.sop_slug === 'customer_verification_found' ||
						perams.sop_slug === 'on_hold_found' ||
						perams.sop_slug === 'call_refreshment_found' ||
						perams.sop_slug === 'call_closures_found' ||
						perams.sop_slug === 'call_additional_info_found' ||
						perams.sop_slug === 'call_alternate_channel_found') && (
						<div className='col-12'>
							<FormGroup id='text' isFloating label='Your Text'>
								<Input
									autoComplete='off'
									{...register('text', {
										required: 'Text is required',
									})}
								/>
							</FormGroup>
							<span style={{ color: 'red' }}>{errors.text?.message}</span>
						</div>
					)}

					{(perams.sop_slug === 'call_opening_found' ||
						perams.sop_slug === 'customer_verification_found' ||
						perams.sop_slug === 'on_hold_found' ||
						perams.sop_slug === 'call_refreshment_found' ||
						perams.sop_slug === 'call_closures_found' ||
						perams.sop_slug === 'call_additional_info_found' ||
						perams.sop_slug === 'call_alternate_channel_found') && (
						<div className='col-12'>
							<FormGroup id='score' isFloating label='Your Score'>
								<Input
									autoComplete='off'
									type='number'
									{...register('score', {
										required: 'Score is required',
									})}
								/>
							</FormGroup>
							<span style={{ color: 'red' }}>{errors.score?.message}</span>
						</div>
					)}
					{(perams.sop_slug === 'call_opening_found' ||
						perams.sop_slug === 'customer_verification_found' ||
						perams.sop_slug === 'on_hold_found' ||
						perams.sop_slug === 'call_refreshment_found' ||
						perams.sop_slug === 'call_closures_found' ||
						perams.sop_slug === 'call_additional_info_found' ||
						perams.sop_slug === 'call_alternate_channel_found') && (
						<div className='col-12'>
							<Label>Select teamList</Label>
							<FormGroup>
								<Select
									size='sm'
									ariaLabel='Select Category'
									multiple
									{...register('team_list', {
										required: 'teamList is required',
									})}>
									<Option value=''>Select teamList</Option>
									{teams?.map((team) => {
										return (
											<Option key={team?.id} value={team?.id}>
												{team?.Team_name}
											</Option>
										);
									})}
								</Select>
								<span style={{ color: 'red' }}>{errors.team_list?.message}</span>
							</FormGroup>
						</div>
					)}

					{perams.sop_slug === 'customer_verification_found' && (
						<div className='col-12'>
							<Label>Select Skill Set </Label>
							<FormGroup>
								<Select
									size='sm'
									multiple
									ariaLabel='Select Category'
									{...register('skill_set_list', {
										required: 'skill_set_list is required',
									})}>
									<Option value=''>Select skill_set_list</Option>
									{skillSetList &&
										skillSetList?.map((skill) => {
											return (
												<Option key={skill} value={skill}>
													{skill}
												</Option>
											);
										})}
								</Select>
								<span style={{ color: 'red' }}>
									{errors.skill_set_list?.message}
								</span>
							</FormGroup>
						</div>
					)}
					{(perams.sop_slug === 'on_hold_found' ||
						perams.sop_slug === 'call_refreshment_found') && (
						<>
							<div className='col-12'>
								<FormGroup id='keywords' isFloating label='Your keywords'>
									<Input
										autoComplete='off'
										{...register('keywords', {
											required: editMode ? false : 'keywords is required',
										})}
										onKeyPress={(ev) => {
											if (ev.key === 'Enter') {
												ev.preventDefault();
												setKeywordsList([...keywordsList, ev.target.value]);
											}
										}}
									/>
								</FormGroup>
								<span style={{ color: 'red' }}>{errors.keywords?.message}</span>
							</div>
							<div className='d-flex align-items-center'>
								{keywordsList &&
									keywordsList?.map((keyword) => {
										return (
											<div
												key={keyword}
												style={{
													display: 'flex',
													alignItems: 'center',
													justifyContent: 'space-between',
													padding: '5px',
													border: '1px solid gray',
													borderRadius: '12px',
													width: '140px',
													margin: '8px',
												}}>
												<span className='fw-bold'>{keyword}</span>
												<Icon
													size='lg'
													icon='Cancel'
													color='danger'
													style={{
														cursor: 'pointer',
													}}
													onClick={() =>
														setKeywordsList((keywords) =>
															keywords.filter(
																(keyw) => keyw !== keyword,
															),
														)
													}
												/>
											</div>
										);
									})}
							</div>
						</>
					)}
					{perams.sop_slug === 'tagging_found' && (
						<>
							<div className='col-12'>
								<FormGroup id='tag_list' isFloating label='Your tag_list'>
									<Input
										autoComplete='off'
										{...register('tag_list', {
											required: editMode ? false : 'tag_list is required',
										})}
										onKeyPress={(ev) => {
											if (ev.key === 'Enter') {
												ev.preventDefault();
												setTagList([...tagList, ev.target.value]);
											}
										}}
									/>
								</FormGroup>
								<span style={{ color: 'red' }}>{errors.tag_list?.message}</span>
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
													justifyContent: 'space-between',
													padding: '5px',
													border: '1px solid gray',
													borderRadius: '12px',
													width: '140px',
													margin: '8px',
												}}>
												<span className='fw-bold'>{tag}</span>
												<Icon
													size='lg'
													icon='Cancel'
													color='danger'
													style={{
														cursor: 'pointer',
													}}
													onClick={() =>
														setTagList((tags) =>
															tags.filter((tg) => tg !== tag),
														)
													}
												/>
											</div>
										);
									})}
							</div>
						</>
					)}

					{perams.sop_slug === 'skill_set_found' && (
						<>
							<div className='col-12'>
								<FormGroup
									id='skill_set_list'
									isFloating
									label='Your skill_set_list'>
									<Input
										autoComplete='off'
										{...register('skill_set_list', {
											required: editMode
												? false
												: 'skill_set_list is required',
										})}
										onKeyPress={(ev) => {
											if (ev.key === 'Enter') {
												ev.preventDefault();
												setSkillSetList([...skillSetList, ev.target.value]);
											}
										}}
									/>
								</FormGroup>
								<span style={{ color: 'red' }}>
									{errors.skill_set_list?.message}
								</span>
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
													justifyContent: 'space-between',
													padding: '5px',
													border: '1px solid gray',
													borderRadius: '12px',
													width: '140px',
													margin: '8px',
												}}>
												<span className='fw-bold'>{skill}</span>
												<Icon
													size='lg'
													icon='Cancel'
													color='danger'
													style={{
														cursor: 'pointer',
													}}
													onClick={() =>
														setSkillSetList((skills) =>
															skills.filter((sk) => sk !== skill),
														)
													}
												/>
											</div>
										);
									})}
							</div>
						</>
					)}

					{(perams.sop_slug === 'call_additional_info_found' ||
						perams.sop_slug === 'call_alternate_channel_found') && (
						<div className='col-12'>
							<Label>Select Tag Type</Label>
							<FormGroup>
								<Select
									size='sm'
									multiple
									ariaLabel='Select Category'
									{...register('tag_type', {
										required: 'tag_type is required',
									})}>
									<Option value=''>Select tag_type</Option>
									{tagList &&
										tagList?.map((tag) => {
											return (
												<Option key={tag} value={tag}>
													{tag}
												</Option>
											);
										})}
								</Select>
								<span style={{ color: 'red' }}>{errors.tag_type?.message}</span>
							</FormGroup>
						</div>
					)}

					{(perams.sop_slug === 'customer_call_end_sentiment_found' ||
						perams.sop_slug === 'customer_overall_call_sentiment_found' ||
						perams.sop_slug === 'customer_call_start_sentiment_found' ||
						perams.sop_slug === 'customer_overtalk_incidents_found' ||
						perams.sop_slug === 'overall_call_sentiment_found' ||
						perams.sop_slug === 'call_start_sentiment_found' ||
						perams.sop_slug === 'call_end_sentiment_found' ||
						perams.sop_slug === 'overtalk_incidents_found' ||
						perams.sop_slug === 'silence_incidents_found' ||
						perams.sop_slug === 'customer_silence_incidents_found' ||
						perams.sop_slug === 'rate_of_speech_found' ||
						perams.sop_slug === 'responsiveness_found' ||
						perams.sop_slug === 'customer_rate_of_speech_found' ||
						perams.sop_slug === 'customer_responsiveness_found' ||
						perams.sop_slug === 'customer_clarity_found') && (
						<>
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
								<span style={{ color: 'red' }}>{errors.min?.message}</span>
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
								<span style={{ color: 'red' }}>{errors.max?.message}</span>
							</div>
						</>
					)}
					{(perams.sop_slug === 'customer_call_end_sentiment_found' ||
						perams.sop_slug === 'customer_overall_call_sentiment_found' ||
						perams.sop_slug === 'customer_call_start_sentiment_found' ||
						perams.sop_slug === 'customer_overtalk_incidents_found' ||
						perams.sop_slug === 'overall_call_sentiment_found' ||
						perams.sop_slug === 'call_start_sentiment_found' ||
						perams.sop_slug === 'call_end_sentiment_found' ||
						perams.sop_slug === 'overtalk_incidents_found') && (
						<div className='col-12'>
							<Label>Select Sentiment Type</Label>
							<FormGroup>
								<Select
									size='sm'
									ariaLabel='Select sentiment_type'
									{...register('sentiment_type', {
										required: 'sentiment_type is required',
									})}>
									<Option value=''>Select sentiment_type</Option>
									<Option value='True'>True</Option>
									<Option value='False'>False</Option>
								</Select>
								<span style={{ color: 'red' }}>
									{errors.sentiment_type?.message}
								</span>
							</FormGroup>
						</div>
					)}
					{(perams.sop_slug === 'silence_incidents_found' ||
						perams.sop_slug === 'customer_silence_incidents_found') && (
						<div className='col-12'>
							<Label>Select incident Type</Label>
							<FormGroup>
								<Select
									size='sm'
									ariaLabel='Select incidents_type'
									{...register('incidents_type', {
										required: 'incidents_type is required',
									})}>
									<Option value=''>Select incidents_type</Option>
									<Option value='True'>True</Option>
									<Option value='False'>False</Option>
								</Select>
								<span style={{ color: 'red' }}>
									{errors.incidents_type?.message}
								</span>
							</FormGroup>
						</div>
					)}

					{(perams.sop_slug === 'rate_of_speech_found' ||
						perams.sop_slug === 'responsiveness_found' ||
						perams.sop_slug === 'customer_rate_of_speech_found' ||
						perams.sop_slug === 'customer_responsiveness_found' ||
						perams.sop_slug === 'customer_clarity_found') && (
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
								<span style={{ color: 'red' }}>{errors.type?.message}</span>
							</FormGroup>
						</div>
					)}
					<div className='col-12' style={{ marginTop: 50 }}>
						<div className='row d-flex'>
							<div className='col'>
								<Button
									isLight
									color='success'
									className='float-end mx-2'
									type='submit'>
									{!editMode ? 'Create' : 'Update'}
								</Button>

								<Button
									color='info'
									isLight
									className='float-end'
									tag='a'
									to={`/users/${perams.id}/sops/${perams.sop_slug}`}>
									cancle
								</Button>
							</div>
						</div>
					</div>
					{/* <div className='col-12'>
						<div className='row d-flex'>
							<div className='col'>
								<Button
									color={editMode ? 'success' : 'info'}
									type='submit'
									className='float-end mx-2'>
									{editMode ? 'Update' : 'Create'}
								</Button>
								<Button
									isLight
									color='danger'
									className='float-end'
									tag='a'
									to={`/users/${perams.id}/sops/${perams.sop_slug}`}>
									Cancel
								</Button>
							</div>
						</div>
					</div> */}
				</form>
			</Page>
		</PageWrapper>
	);
};

export default AddUpdateSubSops;
