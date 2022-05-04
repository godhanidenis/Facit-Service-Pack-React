import { call, put } from 'redux-saga/effects';
import {
	loadSopsError,
	loadSopsSuccess,
	updateSopsError,
	updateSopsSuccess,
} from '../../ducks/sops';
import { requestGetSops, requestUpdateSops } from '../requests/sops';

export function* handleGetSops({ payload }) {
	try {
		const response = yield call(requestGetSops, payload);

		if (response.status === 200) {
			yield put(loadSopsSuccess(response.data.data));
		}
	} catch (error) {
		yield put(loadSopsError(error.response.data.data));
	}
}

export function* handleUpdateSop({ payload: { id, toBeUpdatedSop } }) {
	try {
		const response = yield call(requestUpdateSops, id, toBeUpdatedSop);

		if (response.status === 200) {
			yield put(updateSopsSuccess(response.data.data));
		}
	} catch (error) {
		yield put(updateSopsError(error.response.data));
	}
}
