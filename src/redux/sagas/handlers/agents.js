import { call, put } from 'redux-saga/effects';
import {
	loadAgentsSuccess,
	loadAgentsError,
	createAgentsSuccess,
	createAgentsError,
	deleteAgentsSuccess,
	deleteAgentsError,
	updateAgentsSuccess,
	updateAgentsError,
} from '../../ducks/agents';
import {
	requestCreateAgents,
	requestDeleteAgents,
	requestGetAgents,
	requestUpdateAgents,
} from '../requests/agents';

// eslint-disable-next-line import/prefer-default-export
export function* handleGetAgents({ payload }) {
	try {
		const response = yield call(requestGetAgents, payload);

		if (response.status === 200) {
			yield put(loadAgentsSuccess(response.data.data));
		}
	} catch (error) {
		yield put(loadAgentsError(error.response.data.data));
	}
}

export function* handleCreateAgent({ payload }) {
	try {
		const response = yield call(requestCreateAgents, payload);

		if (response.status === 200) {
			yield put(createAgentsSuccess(response.data.data));
		}
	} catch (error) {
		yield put(createAgentsError(error.response.data));
	}
}

export function* handleDeleteAgent({ payload }) {
	try {
		const response = yield call(requestDeleteAgents, payload);

		if (response.status === 200) {
			yield put(deleteAgentsSuccess(payload));
		}
	} catch (error) {
		yield put(deleteAgentsError(error.response.data));
	}
}

export function* handleUpdateAgent({ payload: { id, toBeUpdatedAgent } }) {
	try {
		const response = yield call(requestUpdateAgents, id, toBeUpdatedAgent);

		if (response.status === 200) {
			yield put(updateAgentsSuccess(response.data.data));
		}
	} catch (error) {
		yield put(updateAgentsError(error.response.data));
	}
}
