import { call, put } from 'redux-saga/effects';
import {
	createTeamsError,
	createTeamsSuccess,
	deleteTeamsError,
	deleteTeamsSuccess,
	loadTeamsError,
	loadTeamsSuccess,
	updateTeamsError,
	updateTeamsSuccess,
} from '../../ducks/teams';
import {
	requestCreateTeams,
	requestDeleteTeams,
	requestGetTeams,
	requestUpdateTeams,
} from '../requests/teams';

export function* handleGetTeams({ payload }) {
	try {
		const response = yield call(requestGetTeams, payload);

		if (response.status === 200) {
			yield put(loadTeamsSuccess(response.data.data));
		}
	} catch (error) {
		yield put(loadTeamsError(error.response.data.data));
	}
}

export function* handleCreateTeam({ payload }) {
	// console.log('payload', payload);1

	try {
		const response = yield call(requestCreateTeams, payload);
		// console.log('response', response);

		if (response.status === 200) {
			yield put(createTeamsSuccess(response.data.data));
		}
	} catch (error) {
		yield put(createTeamsError(error.response.data));
	}
}

export function* handleDeleteTeam({ payload }) {
	try {
		const response = yield call(requestDeleteTeams, payload);

		if (response.status === 200) {
			yield put(deleteTeamsSuccess(payload));
		}
	} catch (error) {
		yield put(deleteTeamsError(error.response.data));
	}
}

export function* handleUpdateTeam({ payload: { id, toBeUpdatedTeam } }) {
	try {
		const response = yield call(requestUpdateTeams, id, toBeUpdatedTeam);

		if (response.status === 200) {
			yield put(updateTeamsSuccess(response.data.data));
		}
	} catch (error) {
		yield put(updateTeamsError(error.response.data));
	}
}
