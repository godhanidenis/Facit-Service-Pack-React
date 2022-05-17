import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink, Route, Routes, useParams } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';
import Button from '../../../components/bootstrap/Button';
import { CardActions } from '../../../components/bootstrap/Card';
import Nav, { NavItem } from '../../../components/bootstrap/Nav';
import Spinner from '../../../components/bootstrap/Spinner';
import Toasts from '../../../components/bootstrap/Toasts';
import AgentPage from './Agents/Agents';

const TeamsPage = () => {
	const [AgentlinkActie, setAgentlinkActie] = useState('');
	const [AgentdetaillinkActie, setAgentdetaillinkActie] = useState('active');
	const id = useParams();

	useEffect(() => {
		if (
			window.location.pathname === `/users/${id.id}/teams/${id.teamId}/agents` ||
			`/users/${id.id}/teams/${id.teamId}/agents/create` ||
			`/users/${id.id}/teams/${id.teamId}/agents/edit`
			// (`/users/${id.id}/teams/${id.teamId}/agents/create` ||
			// 	`/users/${id.id}/teams/${id.teamId}/agents/edit` ||
			// 	`/users/${id.id}/teams/${id.teamId}/agents`)
		) {
			// setAgentdetaillinkActie('');)) {
			setAgentdetaillinkActie('');
			setAgentlinkActie('active');
		}
		if (`/users/${id.id}/teams/${id.teamId}/`) {
			setAgentdetaillinkActie('active');
			setAgentlinkActie('');
		}
	}, [id.id, id.id1, id.teamId]);

	return (
		<div className='w-100 h-100' style={{ marginTop: 10 }}>
			<div className='d-flex align-items-center justify-content-center mb-2'>
				<div className='row'>
					<div className='bg-light p-2 rounded-3'>
						<Nav design='pills' tag='nav' style={{ margin: 'auto' }}>
							<NavItem>
								<NavLink
									to='./'
									className={AgentdetaillinkActie}
									onClick={() => {
										setAgentdetaillinkActie('active');
										setAgentlinkActie('');
									}}>
									Team Details
								</NavLink>
							</NavItem>
							<NavItem>
								<NavLink
									to='agents'
									className={AgentlinkActie}
									onClick={() => {
										setAgentdetaillinkActie('');
										setAgentlinkActie('active');
									}}>
									Agents
								</NavLink>
							</NavItem>
						</Nav>
					</div>
				</div>
			</div>

			<div className='w-100 h-100'>
				<Routes>
					<Route exact path='/' element={<TeamDetail />} />

					<Route path='agents/*' element={<AgentPage />} />
				</Routes>
			</div>
		</div>
	);
};

const TeamDetail = () => {
	const id = useParams();
	const [teamInfoData, setTeamInfoData] = useState();
	const { teams, loading, error } = useSelector((state) => state.teams);
	const { addToast } = useToasts();
	useEffect(() => {
		if (error !== '') {
			addToast(
				<Toasts
					title='Error in Team'
					icon='warning'
					iconColor='danger'
					color='red'
					time='Now'
					isDismiss>
					{`${error}`}
				</Toasts>,
				{
					autoDismiss: true,
				},
			);
		}
	}, [addToast, error]);
	useEffect(() => {
		if (id) {
			if (teams) {
				const singleTeam = teams.find((team) => team.id === Number(id.teamId));

				setTeamInfoData(singleTeam);
			}
		}
	}, [id, teams]);
	return (
		// eslint-disable-next-line react/jsx-no-useless-fragment
		<>
			{loading ? (
				<div className='d-flex align-items-center justify-content-center w-100 h-100'>
					<Spinner isGrow={false} />
				</div>
			) : (
				<div className='row justify-content-center w-100'>
					<div className='col-6 d-flex justify-content-center flex-column'>
						<hr style={{ opacity: '0.05' }} />
						<div className='row align-items-center'>
							<CardActions className='d-flex justify-content-end'>
								<Button
									icon='Backspace'
									color='info'
									isLight
									tag='a'
									to={`../../../../../users/${id.id}/teams`}>
									Back to teams
								</Button>
							</CardActions>
						</div>
						<div className='row align-items-center' style={{ marginTop: 20 }}>
							<div className='col'>
								<p className='mb-1'>
									<b>Team Name</b>
								</p>
								<div className=' border rounded p-2'>{teamInfoData?.Team_name}</div>
							</div>
							<div className='col'>
								<p className='mb-1'>
									<b>TeamLead Name</b>
								</p>
								<div className=' border rounded p-2'>
									{teamInfoData?.Team_lead.TeamLead_name}
								</div>
							</div>
						</div>
						<div className='row align-items-center' style={{ marginTop: 20 }}>
							<div className='col'>
								<p className='mb-1'>
									<b>location</b>
								</p>
								<div className=' border rounded p-2'>
									{teamInfoData?.Location.Location_name}
								</div>
							</div>
							<div className='col'>
								<p className='mb-1'>
									<b>No Agentns</b>
								</p>
								<div className=' border rounded p-2'>
									{teamInfoData?.No_agentns}
								</div>
							</div>
						</div>
						<div className='row align-items-center' style={{ marginTop: 20 }}>
							<div className='col-md-6'>
								<p className='mb-1'>
									<b>Lob</b>
								</p>
								<div className=' border rounded p-2'>
									{teamInfoData?.LOB.Lob_name}
								</div>
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default TeamsPage;
