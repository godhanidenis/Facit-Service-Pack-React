import { all, fork, takeLatest } from 'redux-saga/effects';
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

export default function* watcherSaga() {
	yield all([...userSagas, ...teamSagas]);
}
