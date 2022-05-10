import { call, put } from 'redux-saga/effects';
import {
	createTeamLeadsError,
	createTeamLeadsSuccess,
	deleteTeamLeadsError,
	deleteTeamLeadsSuccess,
	loadTeamLeadsError,
	loadTeamLeadsSuccess,
	updateTeamLeadsError,
	updateTeamLeadsSuccess,
} from '../../ducks/teamLeads';
import {
	requestCreateTeamLeads,
	requestDeleteTeamLeads,
	requestGetTeamLeads,
	requestUpdateTeamLeads,
} from '../requests/teamLeads';

export function* handleGetTeamLeads({ payload }) {
	try {
		const response = yield call(requestGetTeamLeads, payload);

		if (response.status === 200) {
			yield put(loadTeamLeadsSuccess(response.data.data));
		}
	} catch (error) {
		yield put(loadTeamLeadsError(error));
	}
}

export function* handleCreateTeamLead({ payload }) {
	try {
		const response = yield call(requestCreateTeamLeads, payload);

		if (response.status === 200) {
			yield put(createTeamLeadsSuccess(response.data.data));
		}
	} catch (error) {
		yield put(createTeamLeadsError(error));
	}
}

export function* handleDeleteTeamLead({ payload }) {
	try {
		const response = yield call(requestDeleteTeamLeads, payload);

		if (response.status === 200) {
			yield put(deleteTeamLeadsSuccess(payload));
		}
	} catch (error) {
		yield put(deleteTeamLeadsError(error));
	}
}
export function* handleUpdateTeamLead({ payload: { id, toBeUpdatedTeamLead } }) {
	try {
		const response = yield call(requestUpdateTeamLeads, id, toBeUpdatedTeamLead);

		if (response.status === 200) {
			yield put(updateTeamLeadsSuccess(response.data.data));
		}
	} catch (error) {
		yield put(updateTeamLeadsError(error));
	}
}
