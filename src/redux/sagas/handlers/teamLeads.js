import { call, put } from 'redux-saga/effects';
import {
	createTeamLeadsError,
	createTeamLeadsSuccess,
	deleteTeamLeadsError,
	deleteTeamLeadsSuccess,
	loadTeamLeadsError,
	loadTeamLeadsSuccess,
} from '../../ducks/teamLeads';
import {
	requestCreateTeamLeads,
	requestDeleteTeamLeads,
	requestGetTeamLeads,
} from '../requests/teamLeads';

export function* handleGetTeamLeads({ payload }) {
	try {
		const response = yield call(requestGetTeamLeads, payload);

		if (response.status === 200) {
			yield put(loadTeamLeadsSuccess(response.data.data));
		}
	} catch (error) {
		yield put(loadTeamLeadsError(error.response.data.data));
	}
}

export function* handleCreateTeamLead({ payload }) {
	try {
		const response = yield call(requestCreateTeamLeads, payload);

		if (response.status === 200) {
			yield put(createTeamLeadsSuccess(response.data.data));
		}
	} catch (error) {
		yield put(createTeamLeadsError(error.response.data));
	}
}

export function* handleDeleteTeamLead({ payload }) {
	try {
		const response = yield call(requestDeleteTeamLeads, payload);

		if (response.status === 200) {
			yield put(deleteTeamLeadsSuccess(payload));
		}
	} catch (error) {
		yield put(deleteTeamLeadsError(error.response.data));
	}
}
