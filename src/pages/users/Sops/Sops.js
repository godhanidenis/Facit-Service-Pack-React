import React, { useEffect, useState } from 'react';
import { useParams, Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../../../components/bootstrap/Button';
import Card, { CardBody } from '../../../components/bootstrap/Card';

import { loadSopsStart } from '../../../redux/ducks/sops';
import UpdateSopDetails from './UpdateSopDetails';
import SopsDetails from './SopsDetails';
import AddUpdateSubSops from './AddUpdateSubSops';

const Sops = () => {
	const id = useParams();
	const dispatch = useDispatch();
	const { sops } = useSelector((state) => state.sops);

	const [activeListTab, setActiveListTab] = useState();
	const [selectListTab, setSelectListTab] = useState();
	const [disabled, setDisabled] = useState(false);
	const { subSops } = useSelector((state) => state.subSops);

	useEffect(() => {
		dispatch(loadSopsStart(id.id));
	}, [dispatch, id.id]);

	const handleActiveListTab = (tabName, id) => {
		console.log('id', id);

		setActiveListTab(tabName);

		const singleSop = sops.find((sop) => sop.id === Number(id));
		console.log('single sop', singleSop);
		setSelectListTab(singleSop);

		if (
			singleSop?.slug === 'tagging_found' ||
			singleSop?.slug === 'customer_call_end_sentiment_found' ||
			singleSop?.slug === 'customer_overall_call_sentiment_found' ||
			singleSop?.slug === 'customer_call_start_sentiment_found' ||
			singleSop?.slug === 'customer_overtalk_incidents_found' ||
			singleSop?.slug === 'overall_call_sentiment_found' ||
			singleSop?.slug === 'call_start_sentiment_found' ||
			singleSop?.slug === 'call_end_sentiment_found' ||
			singleSop?.slug === 'overtalk_incidents_found' ||
			singleSop?.slug === 'silence_incidents_found' ||
			singleSop?.slug === 'customer_silence_incidents_found' ||
			singleSop?.slug === 'rate_of_speech_found' ||
			singleSop?.slug === 'responsiveness_found' ||
			singleSop?.slug === 'customer_rate_of_speech_found' ||
			singleSop?.slug === 'customer_responsiveness_found' ||
			singleSop?.slug === 'customer_clarity_found'
		) {
			if (subSops.length) {
				setDisabled(true);
			} else {
				setDisabled(false);
			}
		} else {
			setDisabled(false);
		}
	};
	const getStatusActiveListTabColor = (tabName) => {
		if (activeListTab === tabName) return 'success';
		return 'light';
	};

	return (
		<div className='row' style={{ height: '95%' }}>
			<div className='col-3'>
				<Card stretch>
					<CardBody isScrollable>
						<div className='row g-5 rounded-3'>
							{sops?.map((i) => (
								<div className='col-12'>
									<Button
										className='w-100'
										key={i?.id}
										color={getStatusActiveListTabColor(i?.Sub_category)}
										onClick={() => handleActiveListTab(i?.Sub_category, i?.id)}
										tag='a'
										to={i?.slug}>
										{i?.Sub_category}
									</Button>
								</div>
							))}
						</div>
					</CardBody>
				</Card>
			</div>
			<div className='col-9'>
				<Card stretch>
					<CardBody isScrollable>
						<div className='d-flex align-items-center justify-content-between'>
							<div className='d-flex align-items-center'>
								<h1>{selectListTab?.Sub_category}</h1>
								{activeListTab && (
									<Button
										icon='Edit'
										color='info'
										tag='a'
										isLight
										style={{ cursor: 'pointer', marginLeft: '25px' }}
										to={`${selectListTab?.slug}/update`}
									/>
								)}
							</div>
							{activeListTab && (
								<Button
									color='info'
									isLight
									tag='a'
									to={`${selectListTab?.slug}/sub/create`}
									isDisable={disabled}>
									Add
								</Button>
							)}
						</div>
						<br />
						<br />
						{selectListTab && (
							<div>
								<Routes>
									<Route exact path=':id1' element={<SopsDetails />} />
									<Route
										exact
										path=':id1/update'
										element={<UpdateSopDetails />}
									/>
									<Route
										exact
										path=':id1/sub/create'
										element={<AddUpdateSubSops />}
									/>
									<Route
										exact
										path=':id1/sub/update'
										element={<AddUpdateSubSops />}
									/>
								</Routes>
							</div>
						)}
					</CardBody>
				</Card>
			</div>
		</div>
	);
};

export default Sops;
