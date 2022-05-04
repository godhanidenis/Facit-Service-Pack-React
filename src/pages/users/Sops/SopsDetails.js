import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { deleteSubSopsStart, loadSubSopsStart } from '../../../redux/ducks/subSops';
import Card, {
	CardHeader,
	CardBody,
	CardLabel,
	CardTitle,
} from '../../../components/bootstrap/Card';
import Icon from '../../../components/icon/Icon';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import Page from '../../../layout/Page/Page';
import { loadTeamsStart } from '../../../redux/ducks/teams';

const SopsDetails = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const id = useParams();
	console.log('id', id);
	const { subSops } = useSelector((state) => state.subSops);
	useEffect(() => {
		const formData = {
			doctype: id.id1,
		};
		dispatch(loadSubSopsStart({ id: id.id, slug: formData }));
		dispatch(loadTeamsStart(id.id));
	}, [dispatch, id.id, id.id1]);

	console.log('subSops', subSops);
	return (
		<PageWrapper>
			<Page className='p-0'>
				{(() => {
					switch (id.id1) {
						case 'tagging_found':
							return (
								subSops.length &&
								subSops?.map((subSop) => {
									return (
										<div
											className='d-flex align-items-center justify-content-between'
											style={{
												// border: '1px solid gray',
												background: 'lightgray',
												margin: '8px',
												padding: '10px',
												borderRadius: '12px',
											}}>
											<div>
												{subSop?._source?.tag_list?.map((tag) => {
													return (
														<div>
															<h4>{tag}</h4>
														</div>
													);
												})}
											</div>

											<div>
												<Icon
													size='lg'
													icon='Edit'
													color='info'
													style={{ cursor: 'pointer' }}
													onClick={() => {
														navigate(
															`/users/${id.id}/sops/${id.id1}/sub/update`,
															{
																state: { id: subSop?._id },
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
														marginLeft: '25px',
													}}
													onClick={() => {
														// eslint-disable-next-line no-alert
														if (window.confirm('Are you sure??')) {
															dispatch(
																deleteSubSopsStart({
																	id: subSop._id,
																}),
															);
														}
													}}
												/>
											</div>
										</div>
									);
								})
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
								subSops.length &&
								subSops?.map((subSop) => {
									return (
										<div className='col-12'>
											<div className='d-flex align-items-center justify-content-between'>
												<div
													className='row'
													style={{
														padding: '15px',
														alignContent: 'center',
													}}>
													<p className='col-lg-6 fw-bold'>Min Value :</p>
													<p className='col-lg-6'>
														{subSop?._source?.min}
													</p>
													<p className='col-lg-6 fw-bold'>Max Value :</p>
													<p className='col-lg-6'>
														{subSop?._source?.max}
													</p>
													<p className='col-lg-6 fw-bold'>
														Sentiment Type :
													</p>
													<p className='col-lg-6'>
														{subSop?._source?.sentiment_type}
													</p>
												</div>
												<div>
													<Icon
														size='lg'
														icon='Edit'
														color='info'
														style={{ cursor: 'pointer' }}
														onClick={() => {
															navigate(
																`/users/${id.id}/sops/${id.id1}/sub/update`,
																{
																	state: { id: subSop?._id },
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
															marginLeft: '25px',
														}}
														// onClick={() => {
														// 	// eslint-disable-next-line no-alert
														// 	if (window.confirm('Are you sure??')) {
														// 		dispatch(
														// 			deleteSubSopsStart({
														// 				id: subSop._id,
														// 			}),
														// 		);
														// 	}
														// }}
													/>
												</div>
											</div>
										</div>
									);
								})
							);

						case 'call_refreshment_found':
						case 'on_hold_found':
						case 'call_verification_found':
						case 'call_closure_found':
						case 'call_opening_found':
						case 'call_additional_info_found':
						case 'call_alternate_channel_found':
							return (
								subSops.length &&
								subSops?.map((subSop) => {
									return (
										<Card key={subSop?._id}>
											<CardBody className='d-flex align-items-center justify-content-between'>
												<div>
													<h1>{subSop?._source?.text}</h1>
												</div>
												<div>
													<Icon
														size='lg'
														icon='Edit'
														color='info'
														style={{ cursor: 'pointer' }}
														onClick={() => {
															navigate(
																`/users/${id.id}/sops/${id.id1}/sub/update`,
																{ state: { id: subSop?._id } },
															);
														}}
													/>
													<Icon
														size='lg'
														icon='Delete'
														color='danger'
														style={{
															cursor: 'pointer',
															marginLeft: '25px',
														}}
														onClick={() => {
															// eslint-disable-next-line no-alert
															if (window.confirm('Are you sure??')) {
																dispatch(
																	deleteSubSopsStart({
																		id: subSop._id,
																	}),
																);
															}
														}}
													/>
												</div>
											</CardBody>
										</Card>
									);
								})
							);
						default:
							return null;
					}
				})()}

				{/* {id.id1 === 'tagging_found' &&
					subSops.length &&
					subSops?.map((subSop) => {
						return (
							<div
								className='d-flex align-items-center justify-content-between'
								style={{
									// border: '1px solid gray',
									background: 'lightgray',
									margin: '8px',
									padding: '10px',
									borderRadius: '12px',
								}}>
								<div>
									{subSop?._source?.tag_list?.map((tag) => {
										return (
											<div>
												<h4>{tag}</h4>
											</div>
										);
									})}
								</div>

								<div>
									<Icon
										size='lg'
										icon='Edit'
										color='info'
										style={{ cursor: 'pointer' }}
										onClick={() => {
											navigate(`/users/${id.id}/sops/${id.id1}/sub/update`, {
												state: { id: subSop?._id },
											});
										}}
									/>
									<Icon
										size='lg'
										icon='Delete'
										color='danger'
										style={{
											cursor: 'pointer',
											marginLeft: '25px',
										}}
										onClick={() => {
											// eslint-disable-next-line no-alert
											if (window.confirm('Are you sure??')) {
												dispatch(
													deleteSubSopsStart({
														id: subSop._id,
													}),
												);
											}
										}}
									/>
								</div>
							</div>
						);
					})} */}
				{/* {(id.id1 === 'customer_call_end_sentiment_found' ||
					id.id1 === 'customer_overall_call_sentiment_found' ||
					id.id1 === 'customer_call_start_sentiment_found' ||
					id.id1 === 'customer_overtalk_incidents' ||
					id.id1 === 'overall_call_sentiment_found' ||
					id.id1 === 'call_start_sentiment_found' ||
					id.id1 === 'call_end_sentiment_found' ||
					id.id1 === 'overtalk_incidents_found') &&
					subSops.length &&
					subSops?.map((subSop) => {
						return (
							<div className='col-12'>
								<div className='d-flex align-items-center justify-content-between'>
									<div
										className='row'
										style={{
											padding: '15px',
											alignContent: 'center',
										}}>
										<p className='col-lg-6 fw-bold'>Min Value :</p>
										<p className='col-lg-6'>{subSop?._source?.min}</p>
										<p className='col-lg-6 fw-bold'>Max Value :</p>
										<p className='col-lg-6'>{subSop?._source?.max}</p>
										<p className='col-lg-6 fw-bold'>Sentiment Type :</p>
										<p className='col-lg-6'>
											{subSop?._source?.sentiment_type}
										</p>
									</div>
									<div>
										<Icon
											size='lg'
											icon='Edit'
											color='info'
											style={{ cursor: 'pointer' }}
											onClick={() => {
												navigate(
													`/users/${id.id}/sops/${id.id1}/sub/update`,
													{
														state: { id: subSop?._id },
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
												marginLeft: '25px',
											}}
											// onClick={() => {
											// 	// eslint-disable-next-line no-alert
											// 	if (window.confirm('Are you sure??')) {
											// 		dispatch(
											// 			deleteSubSopsStart({
											// 				id: subSop._id,
											// 			}),
											// 		);
											// 	}
											// }}
										/>
									</div>
								</div>
							</div>
						);
					})} */}
				{/* {id.id1 !== 'tagging_found' &&
					subSops.length &&
					subSops?.map((subSop) => {
						return (
							<Card key={subSop?._id}>
								<CardBody className='d-flex align-items-center justify-content-between'>
									<div>
										<h1>{subSop?._source?.text}</h1>
									</div>
									<div>
										<Icon
											size='lg'
											icon='Edit'
											color='info'
											style={{ cursor: 'pointer' }}
											onClick={() => {
												navigate(
													`/users/${id.id}/sops/${id.id1}/sub/update`,
													{ state: { id: subSop?._id } },
												);
											}}
										/>
										<Icon
											size='lg'
											icon='Delete'
											color='danger'
											style={{
												cursor: 'pointer',
												marginLeft: '25px',
											}}
											onClick={() => {
												// eslint-disable-next-line no-alert
												if (window.confirm('Are you sure??')) {
													dispatch(
														deleteSubSopsStart({
															id: subSop._id,
														}),
													);
												}
											}}
										/>
									</div>
								</CardBody>
							</Card>
						);
					})} */}
			</Page>
		</PageWrapper>
	);
};

export default SopsDetails;
