import React, { useState, useEffect } from 'react';
import { Routes, Route, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import Button from '../../../components/bootstrap/Button';
import Card, { CardBody } from '../../../components/bootstrap/Card';
import UpdateSopDetails from './UpdateSopDetails';
import SopsDetails from './SopsDetails';
import AddUpdateSubSops from './AddUpdateSubSops';
import Spinner from '../../../components/bootstrap/Spinner';
import { loadTagListStart } from '../../../redux/ducks/tagList';
import { loadSkillSetListStart } from '../../../redux/ducks/skillSetList';

const Sops = () => {
	const [selectedSopTab, setSelectedSopTab] = useState();
	const id = useParams();
	// console.log('idddd', id);
	// console.log('sluggggggg', window.location.pathname.split('/').pop());
	const dispatch = useDispatch();
	const { sops, loading } = useSelector((state) => state.sops);
	const { subSops } = useSelector((state) => state.subSops);

	const handleActiveListTab = React.useCallback(
		(sopId) => {
			/* function body */
			const selectedSop = sops.find((sop) => sop.id === Number(sopId));
			setSelectedSopTab(selectedSop);
		},
		[sops],
	);

	useEffect(() => {
		if (!selectedSopTab && sops?.length > 0) {
			const selectedSop = sops.find(
				(sop) => sop.slug === window.location.pathname.split('/').pop(),
			);
			// console.log('selectedSop', selectedSop);
			setSelectedSopTab(selectedSop);
			if (selectedSop === undefined) {
				handleActiveListTab(sops[0].id);
			} else {
				handleActiveListTab(selectedSop.id);
			}
		}
	}, [handleActiveListTab, sops, selectedSopTab]);

	return (
		// eslint-disable-next-line react/jsx-no-useless-fragment
		<>
			{loading ? (
				<div
					className='d-flex align-items-center justify-content-center w-100 h-100'
					style={{ position: 'absolute', top: 50, left: 50, opacity: 1, zIndex: 1 }}>
					<Spinner isGrow={false} />
				</div>
			) : (
				<div className='row' style={{ height: '100%' }}>
					<div className='col-3'>
						<hr style={{ opacity: '0.05' }} />
						<Card stretch>
							<CardBody isScrollable>
								<div className='row'>
									{sops?.map((sop) => (
										<div className='col-12 mb-3' key={sop?.id}>
											<Button
												className='w-100'
												color={
													selectedSopTab?.slug === sop?.slug
														? 'success'
														: 'light'
												}
												onClick={() => handleActiveListTab(sop?.id)}
												tag='a'
												to={sop?.slug}>
												{sop?.Sub_category}
											</Button>
										</div>
									))}
								</div>
							</CardBody>
						</Card>
					</div>
					<div className='col-9'>
						<hr style={{ opacity: '0.05' }} />
						<Card stretch>
							<CardBody isScrollable>
								{selectedSopTab && (
									<>
										<div className='d-flex align-items-center justify-content-between'>
											<div className='d-flex align-items-center'>
												<h1>
													{selectedSopTab?.Sub_category.replaceAll(
														'_',
														' ',
													)}
												</h1>

												<Button
													icon='Edit'
													color='info'
													tag='a'
													isLight
													style={{
														cursor: 'pointer',
														marginLeft: '25px',
													}}
													to={`${selectedSopTab?.slug}/update`}
												/>
											</div>
											{(selectedSopTab?.slug === 'tagging_found' ||
												selectedSopTab?.slug === 'skill_set_found' ||
												selectedSopTab?.slug ===
													'customer_call_end_sentiment_found' ||
												selectedSopTab?.slug ===
													'customer_overall_call_sentiment_found' ||
												selectedSopTab?.slug ===
													'customer_call_start_sentiment_found' ||
												selectedSopTab?.slug ===
													'customer_overtalk_incidents_found' ||
												selectedSopTab?.slug ===
													'overall_call_sentiment_found' ||
												selectedSopTab?.slug ===
													'call_start_sentiment_found' ||
												selectedSopTab?.slug ===
													'call_end_sentiment_found' ||
												selectedSopTab?.slug ===
													'overtalk_incidents_found' ||
												selectedSopTab?.slug ===
													'silence_incidents_found' ||
												selectedSopTab?.slug ===
													'customer_silence_incidents_found' ||
												selectedSopTab?.slug === 'rate_of_speech_found' ||
												selectedSopTab?.slug === 'responsiveness_found' ||
												selectedSopTab?.slug ===
													'customer_rate_of_speech_found' ||
												selectedSopTab?.slug ===
													'customer_responsiveness_found' ||
												selectedSopTab?.slug === 'customer_clarity_found' ||
												selectedSopTab?.slug === 'clarity_found') &&
											subSops.length ? (
												''
											) : (
												<Button
													color='info'
													isLight
													tag='a'
													to={`${selectedSopTab?.slug}/sub/create`}
													isDisable={
														window.location.pathname ===
															`/users/${id.id}/sops/${selectedSopTab?.slug}/sub/create` ||
														window.location.pathname ===
															`/users/${id.id}/sops/${selectedSopTab?.slug}/sub/update` ||
														window.location.pathname ===
															`/users/${id.id}/sops/${selectedSopTab?.slug}/update`
													}>
													Add
												</Button>
											)}
										</div>

										<div>
											<Routes>
												<Route
													exact
													path=':sop_slug'
													element={<SopsDetails />}
												/>
												<Route
													exact
													path=':sop_slug/update'
													element={<UpdateSopDetails />}
												/>
												<Route
													exact
													path=':sop_slug/sub/create'
													element={<AddUpdateSubSops />}
												/>
												<Route
													exact
													path=':sop_slug/sub/update'
													element={<AddUpdateSubSops />}
												/>
											</Routes>
										</div>
									</>
								)}
							</CardBody>
						</Card>
					</div>
				</div>
			)}
		</>
	);
};

export default Sops;
