import { call, put } from 'redux-saga/effects';
import {
	createLobsError,
	createLobsSuccess,
	deleteLobsError,
	deleteLobsSuccess,
	loadLobsError,
	loadLobsSuccess,
	updateLobsError,
	updateLobsSuccess,
} from '../../ducks/lobs';
import {
	requestCreateLobs,
	requestDeleteLobs,
	requestGetLobs,
	requestUpdateLobs,
} from '../requests/lobs';

export function* handleGetLobs({ payload }) {
	try {
		const response = yield call(requestGetLobs, payload);

		if (response.status === 200) {
			yield put(loadLobsSuccess(response.data.data));
		}
	} catch (error) {
		yield put(loadLobsError(error));
	}
}

export function* handleCreateLob({ payload }) {
	try {
		const response = yield call(requestCreateLobs, payload);

		if (response.status === 200) {
			yield put(createLobsSuccess(response.data.data));
		}
	} catch (error) {
		yield put(createLobsError(error));
	}
}

export function* handleDeleteLob({ payload }) {
	try {
		const response = yield call(requestDeleteLobs, payload);

		if (response.status === 200) {
			yield put(deleteLobsSuccess(payload));
		}
	} catch (error) {
		yield put(deleteLobsError(error));
	}
}
export function* handleUpdateLob({ payload: { id, toBeUpdatedLob } }) {
	try {
		const response = yield call(requestUpdateLobs, id, toBeUpdatedLob);

		if (response.status === 200) {
			yield put(updateLobsSuccess(response.data.data));
		}
	} catch (error) {
		yield put(updateLobsError(error));
	}
}
