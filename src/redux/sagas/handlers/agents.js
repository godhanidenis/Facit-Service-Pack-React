import { useToasts } from 'react-toast-notifications';
import { call, put } from 'redux-saga/effects';
import Toasts from '../../../components/bootstrap/Toasts';
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
		yield put(loadAgentsError(error));
		
	}
}

export function* handleCreateAgent({ payload }) {
	try {
		const response = yield call(requestCreateAgents, payload);

		if (response.status === 200) {
			yield put(createAgentsSuccess(response.data.data));
		}
	} catch (error) {
		yield put(createAgentsError(error));
	}
}

export function* handleDeleteAgent({ payload }) {
	try {
		const response = yield call(requestDeleteAgents, payload);

		if (response.status === 200) {
			yield put(deleteAgentsSuccess(payload));
		}
	} catch (error) {
		yield put(deleteAgentsError(error));
	}
}

export function* handleUpdateAgent({ payload: { id, toBeUpdatedAgent } }) {
	try {
		const response = yield call(requestUpdateAgents, id, toBeUpdatedAgent);

		if (response.status === 200) {
			yield put(updateAgentsSuccess(response.data.data));
		}
	} catch (error) {
		yield put(updateAgentsError(error));
	}
}
