import { all, fork, takeLatest } from 'redux-saga/effects';
import {
	CREATE_LOBS_START,
	DELETE_LOBS_START,
	LOAD_LOBS_START,
	UPDATE_LOBS_START,
} from '../ducks/lobs';
import {
	CREATE_LOCATION_START,
	DELETE_LOCATION_START,
	LOAD_LOCATION_START,
	UPDATE_LOCATION_START,
} from '../ducks/locations';
import {
	CREATE_TEAMLEAD_START,
	DELETE_TEAMLEAD_START,
	LOAD_TEAMLEAD_START,
	UPDATE_TEAMLEAD_START,
} from '../ducks/teamLeads';
import {
	CREATE_TEAM_START,
	DELETE_TEAM_START,
	LOAD_TEAMS_START,
	UPDATE_TEAM_START,
} from '../ducks/teams';

import {
	CREATE_USER_START,
	DELETE_USER_START,
	LOAD_USERS_START,
	UPDATE_USER_START,
} from '../ducks/users';
import {
	handleCreateAgent,
	handleDeleteAgent,
	handleGetAgents,
	handleUpdateAgent,
} from './handlers/agents';
import { handleCreateLob, handleDeleteLob, handleGetLobs, handleUpdateLob } from './handlers/lobs';
import {
	handleCreateLocation,
	handleDeleteLocation,
	handleGetLocations,
	handleUpdateLocation,
} from './handlers/locations';
import {
	handleCreateTeamLead,
	handleDeleteTeamLead,
	handleGetTeamLeads,
	handleUpdateTeamLead,
} from './handlers/teamLeads';
import {
	handleCreateTeam,
	handleDeleteTeam,
	handleGetTeams,
	handleUpdateTeam,
} from './handlers/teams';

import {
	CREATE_AGENT_START,
	DELETE_AGENT_START,
	LOAD_AGENTS_START,
	UPDATE_AGENT_START,
} from '../ducks/agents';
import {
	handleCreateUser,
	handleDeleteUser,
	handleGetUsers,
	handleUpdateUser,
} from './handlers/users';
import { LOAD_SOPS_START, UPDATE_SOP_START } from '../ducks/sops';
import { handleGetSops, handleUpdateSop } from './handlers/sops';
import { LOAD_CATEGORY_START } from '../ducks/category';
import { handleGetCategory } from './handlers/category';
import {
	CREATE_SUBSOPS_START,
	DELETE_SUBSOPS_START,
	LOAD_SUBSOPS_START,
	UPDATE_SUBSOPS_START,
} from '../ducks/subSops';
import {
	handleCreateSubSop,
	handleDeleteSubSop,
	handleGetSubSops,
	handleUpdateSubSop,
} from './handlers/subSops';

function* onLoadUsers() {
	yield takeLatest(LOAD_USERS_START, handleGetUsers);
}

function* onCreateUsers() {
	yield takeLatest(CREATE_USER_START, handleCreateUser);
}

function* onUpdateUsers() {
	yield takeLatest(UPDATE_USER_START, handleUpdateUser);
}

function* onDeleteUsers() {
	yield takeLatest(DELETE_USER_START, handleDeleteUser);
}

function* onLoadTeams() {
	yield takeLatest(LOAD_TEAMS_START, handleGetTeams);
}

function* onCreateTeams() {
	yield takeLatest(CREATE_TEAM_START, handleCreateTeam);
}
function* onDeleteTeams() {
	yield takeLatest(DELETE_TEAM_START, handleDeleteTeam);
}

function* onUpdateTeams() {
	yield takeLatest(UPDATE_TEAM_START, handleUpdateTeam);
}

function* onLoadLocations() {
	yield takeLatest(LOAD_LOCATION_START, handleGetLocations);
}

function* onCreateLocations() {
	yield takeLatest(CREATE_LOCATION_START, handleCreateLocation);
}
function* onDeleteLocations() {
	yield takeLatest(DELETE_LOCATION_START, handleDeleteLocation);
}

function* onUpdateLocations() {
	yield takeLatest(UPDATE_LOCATION_START, handleUpdateLocation);
}
function* onLoadTeamLeads() {
	yield takeLatest(LOAD_TEAMLEAD_START, handleGetTeamLeads);
}

function* onCreateTeamLeads() {
	yield takeLatest(CREATE_TEAMLEAD_START, handleCreateTeamLead);
}
function* onDeleteTeamLeads() {
	yield takeLatest(DELETE_TEAMLEAD_START, handleDeleteTeamLead);
}
function* onUpdateTeamLeads() {
	yield takeLatest(UPDATE_TEAMLEAD_START, handleUpdateTeamLead);
}

function* onLoadLobs() {
	yield takeLatest(LOAD_LOBS_START, handleGetLobs);
}

function* onCreateLobs() {
	yield takeLatest(CREATE_LOBS_START, handleCreateLob);
}
function* onDeleteLobs() {
	yield takeLatest(DELETE_LOBS_START, handleDeleteLob);
}
function* onUpdateLobs() {
	yield takeLatest(UPDATE_LOBS_START, handleUpdateLob);
}

function* onLoadAgents() {
	yield takeLatest(LOAD_AGENTS_START, handleGetAgents);
}

function* onCreateAgents() {
	yield takeLatest(CREATE_AGENT_START, handleCreateAgent);
}
function* onDeleteAgents() {
	yield takeLatest(DELETE_AGENT_START, handleDeleteAgent);
}

function* onUpdateAgents() {
	yield takeLatest(UPDATE_AGENT_START, handleUpdateAgent);
}

function* onLoadSops() {
	yield takeLatest(LOAD_SOPS_START, handleGetSops);
}

function* onUpdateSops() {
	yield takeLatest(UPDATE_SOP_START, handleUpdateSop);
}

function* onLoadCategory() {
	yield takeLatest(LOAD_CATEGORY_START, handleGetCategory);
}

function* onLoadSubSops() {
	yield takeLatest(LOAD_SUBSOPS_START, handleGetSubSops);
}

function* onCreateSubSops() {
	yield takeLatest(CREATE_SUBSOPS_START, handleCreateSubSop);
}
function* onDeleteSubSops() {
	yield takeLatest(DELETE_SUBSOPS_START, handleDeleteSubSop);
}

function* onUpdateSubSops() {
	yield takeLatest(UPDATE_SUBSOPS_START, handleUpdateSubSop);
}
const userSagas = [
	fork(onLoadUsers),
	fork(onCreateUsers),
	fork(onDeleteUsers),
	fork(onUpdateUsers),
];

const teamSagas = [
	fork(onLoadTeams),
	fork(onCreateTeams),
	fork(onDeleteTeams),
	fork(onUpdateTeams),
];
const locationSagas = [
	fork(onLoadLocations),
	fork(onCreateLocations),
	fork(onDeleteLocations),
	fork(onUpdateLocations),
];
const teamLeadSagas = [
	fork(onLoadTeamLeads),
	fork(onCreateTeamLeads),
	fork(onDeleteTeamLeads),
	fork(onUpdateTeamLeads),
];
const lobSagas = [fork(onLoadLobs), fork(onCreateLobs), fork(onDeleteLobs), fork(onUpdateLobs)];

const agentSaga = [
	fork(onLoadAgents),
	fork(onCreateAgents),
	fork(onDeleteAgents),
	fork(onUpdateAgents),
];
const sopSagas = [fork(onLoadSops), fork(onUpdateSops)];
const categorySagas = [fork(onLoadCategory)];

const subSopSagas = [
	fork(onLoadSubSops),
	fork(onCreateSubSops),
	fork(onUpdateSubSops),
	fork(onDeleteSubSops),
];
export default function* watcherSaga() {
	yield all([
		...userSagas,
		...teamSagas,
		...locationSagas,
		...teamLeadSagas,
		...lobSagas,
		...agentSaga,
		...sopSagas,
		...categorySagas,
		...subSopSagas,
	]);
}
