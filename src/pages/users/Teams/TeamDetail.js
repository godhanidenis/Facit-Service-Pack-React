import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink, Route, Routes, useParams } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';
import Button from '../../../components/bootstrap/Button';
import Card, {
	CardActions,
	CardBody,
	CardHeader,
	CardLabel,
	CardTitle,
} from '../../../components/bootstrap/Card';
import Nav, { NavItem } from '../../../components/bootstrap/Nav';
import Spinner from '../../../components/bootstrap/Spinner';
import Toasts from '../../../components/bootstrap/Toasts';
import Page from '../../../layout/Page/Page';
import PageWrapper from '../../../layout/PageWrapper/PageWrapper';
import AgentPage from './Agents/Agents';

const TeamsPage = () => {
	const [AgentlinkActie, setAgentlinkActie] = useState('');
	const [AgentdetaillinkActie, setAgentdetaillinkActie] = useState('active');

	return (
		<div className='w-100 h-100'>
			<Nav design='pills' tag='nav' isJustified className='w-50' style={{ margin: 'auto' }}>
				<NavItem>
					<NavLink
						to='./'
						className={AgentdetaillinkActie}
						onClick={() => {
							setAgentdetaillinkActie('active');
							setAgentlinkActie('');
						}}>
						Teams Details
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
		console.log('loading???????????', error);
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
		<div>
			{loading ? (
				<div className='d-flex align-items-center justify-content-center w-100 h-100'>
					<Spinner isGrow={false} />
				</div>
			) : (
				<PageWrapper>
					<Page className='p-0'>
						<div className='row h-100 align-items-center justify-content-center'>
							<div className='col-xl-4 col-lg-6 col-md-8 shadow-3d-container'>
								<Card className='shadow-3d-dark'>
									<CardHeader>
										<CardLabel icon='People' iconColor='info'>
											<CardTitle tag='h4' className='h5'>
												Team Details
											</CardTitle>
										</CardLabel>

										<CardActions>
											<Button
												icon='Backspace'
												color='info'
												isLight
												tag='a'
												to={`../../../../../users/${id.id}/teams`}>
												Back to teams
											</Button>
										</CardActions>
									</CardHeader>
									<CardBody>
										<div className='col-12'>
											<div
												className='row'
												style={{
													margin: 'auto',
													padding: '15px',
													alignContent: 'center',
												}}>
												<p className='col-lg-6 fw-bold'>ID:</p>
												<p className='col-lg-6'>{teamInfoData?.id}</p>

												<p className='col-lg-6 fw-bold'>TeamName:</p>
												<p className='col-lg-6'>
													{teamInfoData?.Team_name}
												</p>

												<p className='col-lg-6 fw-bold'>TeamLead Name:</p>
												<p className='col-lg-6'>
													{teamInfoData?.Team_lead.TeamLead_name}
												</p>

												<p className='col-lg-6 fw-bold'>Location:</p>
												<p className='col-lg-6'>
													{teamInfoData?.Location.Location_name}
												</p>

												<p className='col-lg-6 fw-bold'>Total Agent:</p>
												<p className='col-lg-6'>
													{teamInfoData?.No_agentns}
												</p>

												<p className='col-lg-6 fw-bold'>Lob:</p>
												<p className='col-lg-6'>
													{teamInfoData?.LOB.Lob_name}
												</p>
											</div>
										</div>
									</CardBody>
								</Card>
							</div>
						</div>
					</Page>
				</PageWrapper>
			)}
		</div>
	);
};

export default TeamsPage;
