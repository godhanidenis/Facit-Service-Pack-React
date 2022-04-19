import { call, put } from 'redux-saga/effects';
import {
	createUsersError,
	createUsersSuccess,
	deleteUsersError,
	deleteUsersSuccess,
	loadUsersError,
	loadUsersSuccess,
	updateUsersError,
	updateUsersSuccess,
} from '../../ducks/users';
import {
	requestCreateUsers,
	requestDeleteUsers,
	requestGetUsers,
	requestUpdateUsers,
} from '../requests/users';

export function* handleGetUsers() {
	try {
		const response = yield call(requestGetUsers);

		if (response.status === 200) {
			yield put(loadUsersSuccess(response.data.data));
		}
	} catch (error) {
		yield put(loadUsersError(error.response.data.data));
	}
}

export function* handleCreateUser({ payload }) {
	try {
		const response = yield call(requestCreateUsers, payload);

		if (response.status === 200) {
			yield put(createUsersSuccess(response.data.data));
		}
	} catch (error) {
		yield put(createUsersError(error.response.data));
	}
}

export function* handleDeleteUser({ payload }) {
	try {
		const response = yield call(requestDeleteUsers, payload);

		if (response.status === 200) {
			yield put(deleteUsersSuccess(payload));
		}
	} catch (error) {
		yield put(deleteUsersError(error.response.data));
	}
}

export function* handleUpdateUser({ payload: { id, toBeUpdatedUser } }) {
	try {
		const response = yield call(requestUpdateUsers, id, toBeUpdatedUser);

		if (response.status === 200) {
			yield put(updateUsersSuccess(response.data.data));
		}
	} catch (error) {
		yield put(updateUsersError(error.response.data));
	}
}
