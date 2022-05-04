import { call, put } from 'redux-saga/effects';
import {
	loadSubSopsSuccess,
	loadSubSopsError,
	createSubSopsError,
	createSubSopsSuccess,
	deleteSubSopsSuccess,
	deleteSubSopsError,
	updateSubSopsSuccess,
	updateSubSopsError,
} from '../../ducks/subSops';
import {
	requestCreateSubSops,
	requestDeleteSubSops,
	requestGetSubSops,
	requestUpdateSubSops,
} from '../requests/subSops';

export function* handleGetSubSops({ payload: { id, slug } }) {
	console.log('sub sops payload');
	try {
		const response = yield call(requestGetSubSops, id, slug);

		if (response.status === 200) {
			yield put(loadSubSopsSuccess(response.data.data));
		}
	} catch (error) {
		yield put(loadSubSopsError(error.response.data.data));
	}
}

export function* handleCreateSubSop({ payload }) {
	try {
		const response = yield call(requestCreateSubSops, payload);
		console.log('res....', response);
		if (response.status === 200) {
			yield put(createSubSopsSuccess(response.data.data));
		}
	} catch (error) {
		yield put(createSubSopsError(error.response.data));
	}
}

export function* handleDeleteSubSop({ payload }) {
	try {
		const response = yield call(requestDeleteSubSops, payload);

		if (response.status === 200) {
			yield put(deleteSubSopsSuccess(payload));
		}
	} catch (error) {
		yield put(deleteSubSopsError(error.response.data));
	}
}

export function* handleUpdateSubSop({ payload: { id, record } }) {
	try {
		const response = yield call(requestUpdateSubSops, id, record);

		if (response.status === 200) {
			yield put(updateSubSopsSuccess(response.data.data));
		}
	} catch (error) {
		yield put(updateSubSopsError(error.response.data));
	}
}
