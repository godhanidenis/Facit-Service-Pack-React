import { call, put } from 'redux-saga/effects';
import {
	createLocationsError,
	createLocationsSuccess,
	deleteLocationsError,
	deleteLocationsSuccess,
	loadLocationsError,
	loadLocationsSuccess,
	updateLocationError,
	updateLocationSuccess,
} from '../../ducks/locations';
import {
	requestCreateLocations,
	requestDeleteLocations,
	requestGetLocations,
	requestUpdateLocations,
} from '../requests/locations';

export function* handleGetLocations({ payload }) {
	try {
		const response = yield call(requestGetLocations, payload);

		if (response.status === 200) {
			yield put(loadLocationsSuccess(response.data.data));
		}
	} catch (error) {
		yield put(loadLocationsError(error));
	}
}

export function* handleCreateLocation({ payload }) {
	try {
		const response = yield call(requestCreateLocations, payload);

		if (response.status === 200) {
			yield put(createLocationsSuccess(response.data.data));
		}
	} catch (error) {
		yield put(createLocationsError(error));
	}
}

export function* handleDeleteLocation({ payload }) {
	try {
		const response = yield call(requestDeleteLocations, payload);

		if (response.status === 200) {
			yield put(deleteLocationsSuccess(payload));
		}
	} catch (error) {
		yield put(deleteLocationsError(error));
	}
}

export function* handleUpdateLocation({ payload: { id, toBeUpdatedLocation } }) {
	try {
		const response = yield call(requestUpdateLocations, id, toBeUpdatedLocation);

		if (response.status === 200) {
			yield put(updateLocationSuccess(response.data.data));
		}
	} catch (error) {
		yield put(updateLocationError(error));
	}
}
