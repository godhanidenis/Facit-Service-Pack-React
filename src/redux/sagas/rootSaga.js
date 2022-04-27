import { all, fork, takeLatest } from 'redux-saga/effects';
import { CREATE_LOBS_START, DELETE_LOBS_START } from '../ducks/lobs';
import {
	CREATE_LOCATION_START,
	DELETE_LOCATION_START,
	LOAD_LOCATION_START,
} from '../ducks/locations';
import {
	CREATE_TEAMLEAD_START,
	DELETE_TEAMLEAD_START,
	LOAD_TEAMLEAD_START,
} from '../ducks/teamLeads';
import {
	CREATE_TEAM_START,
	DELETE_TEAM_START,
	LOAD_TEAMS_START,
	UPDATE_TEAM_START,
} from '../ducks/teams';
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
import { handleCreateLob, handleDeleteLob, handleGetLobs } from './handlers/lobs';
import {
	handleCreateLocation,
	handleDeleteLocation,
	handleGetLocations,
} from './handlers/locations';
import {
	handleCreateTeamLead,
	handleDeleteTeamLead,
	handleGetTeamLeads,
} from './handlers/teamLeads';
import {
	handleCreateTeam,
	handleDeleteTeam,
	handleGetTeams,
	handleUpdateTeam,
} from './handlers/teams';
import {
	handleCreateTeam,
	handleDeleteTeam,
	handleGetTeams,
	handleUpdateTeam,
} from './handlers/teams';
import {
	handleCreateUser,
	handleDeleteUser,
	handleGetUsers,
	handleUpdateUser,
} from './handlers/users';

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

function* onLoadTeamLeads() {
	yield takeLatest(LOAD_TEAMLEAD_START, handleGetTeamLeads);
}

function* onCreateTeamLeads() {
	yield takeLatest(CREATE_TEAMLEAD_START, handleCreateTeamLead);
}
function* onDeleteTeamLeads() {
	yield takeLatest(DELETE_TEAMLEAD_START, handleDeleteTeamLead);
}

function* onLoadLobs() {
	yield takeLatest(LOAD_LOCATION_START, handleGetLobs);
}

function* onCreateLobs() {
	yield takeLatest(CREATE_LOBS_START, handleCreateLob);
}
function* onDeleteLobs() {
	yield takeLatest(DELETE_LOBS_START, handleDeleteLob);
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
<<<<<<< HEAD

export default function* watcherSaga() {
	yield all([...userSagas, ...teamSagas]);
=======
const locationSagas = [fork(onLoadLocations), fork(onCreateLocations), fork(onDeleteLocations)];
const teamLeadSagas = [fork(onLoadTeamLeads), fork(onCreateTeamLeads), fork(onDeleteTeamLeads)];
const lobSagas = [fork(onLoadLobs), fork(onCreateLobs), fork(onDeleteLobs)];

export default function* watcherSaga() {
	yield all([...userSagas, ...teamSagas, ...locationSagas, ...teamLeadSagas, ...lobSagas]);
>>>>>>> 094e58a51e736b37d547f579df49db7267591eaa
}
