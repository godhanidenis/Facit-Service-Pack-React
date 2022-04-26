import { call, put } from 'redux-saga/effects';
import {
	createLobsError,
	createLobsSuccess,
	deleteLobsError,
	deleteLobsSuccess,
	loadLobsError,
	loadLobsSuccess,
} from '../../ducks/lobs';
import { requestCreateLobs, requestDeleteLobs, requestGetLobs } from '../requests/lobs';

export function* handleGetLobs({ payload }) {
	try {
		const response = yield call(requestGetLobs, payload);

		if (response.status === 200) {
			yield put(loadLobsSuccess(response.data.data));
		}
	} catch (error) {
		yield put(loadLobsError(error.response.data.data));
	}
}

export function* handleCreateLob({ payload }) {
	try {
		const response = yield call(requestCreateLobs, payload);

		if (response.status === 200) {
			yield put(createLobsSuccess(response.data.data));
		}
	} catch (error) {
		yield put(createLobsError(error.response.data));
	}
}

export function* handleDeleteLob({ payload }) {
	try {
		const response = yield call(requestDeleteLobs, payload);

		if (response.status === 200) {
			yield put(deleteLobsSuccess(payload));
		}
	} catch (error) {
		yield put(deleteLobsError(error.response.data));
	}
}
