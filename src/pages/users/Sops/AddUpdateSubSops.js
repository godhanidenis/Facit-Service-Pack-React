import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams, useLocation } from 'react-router-dom';

import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import Page from '../../../layout/Page/Page';
import Card, {
	CardHeader,
	CardBody,
	CardLabel,
	CardTitle,
} from '../../../components/bootstrap/Card';
import Button from '../../../components/bootstrap/Button';
import Icon from '../../../components/icon/Icon';

import FormGroup from '../../../components/bootstrap/forms/FormGroup';
import Input from '../../../components/bootstrap/forms/Input';
import Label from '../../../components/bootstrap/forms/Label';
import Select from '../../../components/bootstrap/forms/Select';
import Option from '../../../components/bootstrap/Option';
import { loadTeamsStart } from '../../../redux/ducks/teams';
import {
	createSubSopsStart,
	loadSubSopsStart,
	updateSubSopsStart,
} from '../../../redux/ducks/subSops';

const AddUpdateSubSops = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const location = useLocation();
	const [editMode, setEditMode] = useState(false);
	// console.log('::::::', location?.state?.id);
	const id = useParams();
	// console.log('id::', id);
	const { teams } = useSelector((state) => state.teams);
	const { subSops } = useSelector((state) => state.subSops);
	// console.log('sub sops', subSops);
	const [keywordsList, setKeywordsList] = useState([]);
	const [tagList, setTagList] = useState([]);
	// console.log('keywordsList', keywordsList);
	// console.log('tagList', tagList);
	const {
		register,
		handleSubmit,
		formState: { errors },
		setValue,
		reset,
	} = useForm();

	// useEffect(() => {
	// 	if (id.id1 === 'call_additional_info_found' || id.id1 === 'call_alternate_channel_found') {
	// 		console.log('hiii');
	// 		const formDataTagging = {
	// 			doctype: 'tagging_found',
	// 		};
	// 		dispatch(loadSubSopsStart({ id: id.id, slug: formDataTagging }));
	// 	}

	// 	// eslint-disable-next-line react-hooks/exhaustive-deps
	// }, []);
	const getTegging = async (taggingdata) => {
		let result = {};
		try {
			const res = await axios.post(
				`${process.env.REACT_APP_DOMAIN}/admin_panel/getsopelasticsearch/?user_id=${taggingdata.id}`,
				taggingdata.slug,
			);
			result = res.data || {};
			result.data[0]?._source?.tag_list?.map((str, index) => ({ value: str, id: str }));
			console.log('::::', result);
			setTagList(result.data[0]._source.tag_list);
			return { success: true, data: result };
		} catch (err) {
			return {
				success: false,
				message: err || 'something went wrong',
			};
		}
	};

	// const taggingData = () => {
	// 	console.log('lng', subSops.length);
	// 	if (subSops.length) {
	// 		subSops?.map((sub) => {
	// 			console.log('sub', sub);

	// 			// eslint-disable-next-line no-sequences
	// 			return setTagList(sub?._source?.tag_list);
	// 		});
	// 	}
	// };
	// useEffect(() => {
	// 	if (subSops) {
	// 		taggingData();
	// 	}
	// 	// eslint-disable-next-line react-hooks/exhaustive-deps
	// }, [subSops]);

	useEffect(() => {
		if (id.id1 === 'call_additional_info_found' || id.id1 === 'call_alternate_channel_found') {
			console.log('hiii');
			const formDataTagging = {
				doctype: 'tagging_found',
			};
			getTegging({ id: id.id, slug: formDataTagging });
			// axios.post("http://127.0.0.1:8000/admin_panel/getsopelasticsearch/")
			// dispatch(loadSubSopsStart({ id: id.id, slug: formDataTagging }));
		}
		if (!location?.state?.id) {
			setEditMode(false);
		} else {
			setEditMode(true);
			if (subSops.length) {
				const singleSubSop = subSops.find((subSop) => subSop._id === location?.state?.id);
				console.log('object', singleSubSop);

				setValue('text', singleSubSop?._source?.text);
				setValue('score', singleSubSop?._source?.score);

				setValue('min', singleSubSop?._source?.min);
				setValue('max', singleSubSop?._source?.max);
				setValue('sentiment_type', singleSubSop?._source?.sentiment_type);
				setValue('incidents_type', singleSubSop?._source?.incidents_type);
				setValue('type', singleSubSop?._source?.type);
				setValue('tag_type', singleSubSop?._source?.tag_type);

				setKeywordsList(singleSubSop?._source?.keywords);
				setTagList(singleSubSop?._source?.tag_list);

				console.log('singleSubSop?._source?.tag_type', singleSubSop?._source?.tag_type);

				const arr1 = singleSubSop?._source?.team_list;
				const arry1 = [];
				// eslint-disable-next-line array-callback-return
				arr1?.map((ar) => {
					arry1.push(String(ar));
				});
				setValue('team_list', arry1);
			}
		}
	}, [id.id, id.id1, location?.state?.id, setValue, subSops]);

	const onSubmit = (data) => {
		console.log('AddEdit FormData', data);
		// console.log('keywords FormData', keywordsList);
		// console.log('tagList FormData', tagList);
		const arr = data.team_list;
		const arry = [];
		// eslint-disable-next-line array-callback-return
		arr?.map((ar) => {
			arry.push(Number(ar));
		});
		const formDataCreate = {
			record: {
				doctype: id.id1.replace('_found', ''),
				text: data.text,
				score: Number(data.score),
				team_list: arry,
				user_id: Number(id.id),
			},
		};
		const formDataUpdate = {
			doctype: id.id1.replace('_found', ''),
			text: data.text,
			score: Number(data.score),
			team_list: arry,
			user_id: Number(id.id),
		};

		const formDataCreateOnHoldCallRefreshMent = {
			record: {
				doctype: id.id1.replace('_found', ''),
				text: data.text,
				score: Number(data.score),
				team_list: arry,
				user_id: Number(id.id),
				keywords: keywordsList,
			},
		};
		const formDataUpdateOnHoldCallRefreshMent = {
			doctype: id.id1.replace('_found', ''),
			text: data.text,
			score: Number(data.score),
			team_list: arry,
			user_id: Number(id.id),
			keywords: keywordsList,
		};
		const formDataCreateTagging = {
			record: {
				doctype: id.id1.replace('_found', ''),
				tag_list: tagList,
				user_id: Number(id.id),
			},
		};

		const formDataCreateCallInfoChannel = {
			record: {
				doctype: id.id1.replace('_found', ''),
				text: data.text,
				score: Number(data.score),
				team_list: arry,
				user_id: Number(id.id),
				tag_type: data.tag_type,
			},
		};
		const formDataUpdateCallInfoChannel = {
			doctype: id.id1.replace('_found', ''),
			text: data.text,
			score: Number(data.score),
			team_list: arry,
			user_id: Number(id.id),
			tag_type: data.tag_type,
		};
		const formDataCreateMinMaxSentimate = {
			record: {
				doctype: id.id1.replace('_found', ''),
				user_id: Number(id.id),
				min: Number(data?.min),
				max: Number(data?.max),
				sentiment_type: data?.sentiment_type,
			},
		};

		const formDataCreateMinMaxIncident = {
			record: {
				doctype: id.id1.replace('_found', ''),
				user_id: Number(id.id),
				min: Number(data?.min),
				max: Number(data?.max),
				incidents_type: data?.incidents_type,
			},
		};

		const formDataCreateMinMaxType = {
			record: {
				doctype: id.id1.replace('_found', ''),
				user_id: Number(id.id),
				min: Number(data?.min),
				max: Number(data?.max),
				type: data?.type,
			},
		};

		if (editMode) {
			if (id.id1 === 'on_hold_found' || id.id1 === 'call_refreshment_found') {
				dispatch(
					updateSubSopsStart({
						id: location?.state?.id,
						record: formDataUpdateOnHoldCallRefreshMent,
					}),
				);
			} else if (
				id.id1 === 'call_additional_info_found' ||
				id.id1 === 'call_alternate_channel_found'
			) {
				dispatch(
					updateSubSopsStart({
						id: location?.state?.id,
						record: formDataUpdateCallInfoChannel,
					}),
				);
			} else {
				dispatch(updateSubSopsStart({ id: location?.state?.id, record: formDataUpdate }));
			}
			navigate(`/users/${id.id}/sops/${id.id1}`);
		} else {
			if (id.id1 === 'on_hold_found' || id.id1 === 'call_refreshment_found') {
				dispatch(createSubSopsStart(formDataCreateOnHoldCallRefreshMent));
			} else if (id.id1 === 'tagging_found') {
				dispatch(createSubSopsStart(formDataCreateTagging));
			} else if (
				id.id1 === 'customer_call_end_sentiment_found' ||
				id.id1 === 'customer_overall_call_sentiment_found' ||
				id.id1 === 'customer_call_start_sentiment_found' ||
				id.id1 === 'customer_overtalk_incidents_found' ||
				id.id1 === 'overall_call_sentiment_found' ||
				id.id1 === 'call_start_sentiment_found' ||
				id.id1 === 'call_end_sentiment_found' ||
				id.id1 === 'overtalk_incidents_found'
			) {
				dispatch(createSubSopsStart(formDataCreateMinMaxSentimate));
			} else if (
				id.id1 === 'silence_incidents_found' ||
				id.id1 === 'customer_silence_incidents_found'
			) {
				dispatch(createSubSopsStart(formDataCreateMinMaxIncident));
			} else if (
				id.id1 === 'rate_of_speech_found' ||
				id.id1 === 'responsiveness_found' ||
				id.id1 === 'customer_rate_of_speech_found' ||
				id.id1 === 'customer_responsiveness_found' ||
				id.id1 === 'customer_clarity_found'
			) {
				dispatch(createSubSopsStart(formDataCreateMinMaxType));
			} else if (
				id.id1 === 'call_additional_info_found' ||
				id.id1 === 'call_alternate_channel_found'
			) {
				dispatch(createSubSopsStart(formDataCreateCallInfoChannel));
			} else {
				dispatch(createSubSopsStart(formDataCreate));
			}
			navigate(`/users/${id.id}/sops/${id.id1}`);
		}
	};
	const onError = (errors) => console.log('Errors Occurred !! :', errors);

	return (
		<PageWrapper>
			<Page className='p-0'>
				<form
					className='row g-4'
					onSubmit={handleSubmit(onSubmit, onError)}
					onReset={reset}>
					{(id.id1 === 'call_opening_found' ||
						id.id1 === 'customer_verification_found' ||
						id.id1 === 'on_hold_found' ||
						id.id1 === 'call_refreshment_found' ||
						id.id1 === 'call_closures_found' ||
						id.id1 === 'call_additional_info_found' ||
						id.id1 === 'call_alternate_channel_found') && (
						<div className='col-12'>
							<FormGroup id='text' isFloating label='Your Text'>
								<Input
									autoComplete='off'
									{...register('text', {
										required: 'Text is required',
									})}
								/>
							</FormGroup>
							{errors.text?.message}
						</div>
					)}

					{(id.id1 === 'call_opening_found' ||
						id.id1 === 'customer_verification_found' ||
						id.id1 === 'on_hold_found' ||
						id.id1 === 'call_refreshment_found' ||
						id.id1 === 'call_closures_found' ||
						id.id1 === 'call_additional_info_found' ||
						id.id1 === 'call_alternate_channel_found') && (
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
							{errors.score?.message}
						</div>
					)}
					{(id.id1 === 'call_opening_found' ||
						id.id1 === 'customer_verification_found' ||
						id.id1 === 'on_hold_found' ||
						id.id1 === 'call_refreshment_found' ||
						id.id1 === 'call_closures_found' ||
						id.id1 === 'call_additional_info_found' ||
						id.id1 === 'call_alternate_channel_found') && (
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
								{errors.team_list?.message}
							</FormGroup>
						</div>
					)}
					{(id.id1 === 'on_hold_found' || id.id1 === 'call_refreshment_found') && (
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
												console.log(ev.target.value);
												setKeywordsList([...keywordsList, ev.target.value]);
											}
										}}
									/>
								</FormGroup>
								{errors.keywords?.message}
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
					{id.id1 === 'tagging_found' && (
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
												console.log(ev.target.value);
												setTagList([...tagList, ev.target.value]);
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

					{(id.id1 === 'call_additional_info_found' ||
						id.id1 === 'call_alternate_channel_found') && (
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
											console.log('tag', tag);
											return (
												<Option key={tag} value={tag}>
													{tag}
												</Option>
											);
										})}
								</Select>
								{errors.tag_type?.message}
							</FormGroup>
						</div>
					)}

					{(id.id1 === 'customer_call_end_sentiment_found' ||
						id.id1 === 'customer_overall_call_sentiment_found' ||
						id.id1 === 'customer_call_start_sentiment_found' ||
						id.id1 === 'customer_overtalk_incidents_found' ||
						id.id1 === 'overall_call_sentiment_found' ||
						id.id1 === 'call_start_sentiment_found' ||
						id.id1 === 'call_end_sentiment_found' ||
						id.id1 === 'overtalk_incidents_found' ||
						id.id1 === 'silence_incidents_found' ||
						id.id1 === 'customer_silence_incidents_found' ||
						id.id1 === 'rate_of_speech_found' ||
						id.id1 === 'responsiveness_found' ||
						id.id1 === 'customer_rate_of_speech_found' ||
						id.id1 === 'customer_responsiveness_found' ||
						id.id1 === 'customer_clarity_found') && (
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
						</>
					)}
					{(id.id1 === 'customer_call_end_sentiment_found' ||
						id.id1 === 'customer_overall_call_sentiment_found' ||
						id.id1 === 'customer_call_start_sentiment_found' ||
						id.id1 === 'customer_overtalk_incidents_found' ||
						id.id1 === 'overall_call_sentiment_found' ||
						id.id1 === 'call_start_sentiment_found' ||
						id.id1 === 'call_end_sentiment_found' ||
						id.id1 === 'overtalk_incidents_found') && (
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
								{errors.sentiment_type?.message}
							</FormGroup>
						</div>
					)}
					{(id.id1 === 'silence_incidents_found' ||
						id.id1 === 'customer_silence_incidents_found') && (
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
								{errors.incidents_type?.message}
							</FormGroup>
						</div>
					)}

					{(id.id1 === 'rate_of_speech_found' ||
						id.id1 === 'responsiveness_found' ||
						id.id1 === 'customer_rate_of_speech_found' ||
						id.id1 === 'customer_responsiveness_found' ||
						id.id1 === 'customer_clarity_found') && (
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
					)}
					<div className='col-12'>
						<Button
							color={editMode ? 'success' : 'info'}
							className='w-100 py-3'
							type='submit'>
							{editMode ? 'Update' : 'Create'}
						</Button>
					</div>
				</form>
			</Page>
		</PageWrapper>
	);
};

export default AddUpdateSubSops;
