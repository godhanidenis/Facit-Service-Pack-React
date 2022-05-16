import { Children } from 'react';
import { useToasts } from 'react-toast-notifications';
import { call, put } from 'redux-saga/effects';
import Toasts, { Toast } from '../../../components/bootstrap/Toasts';
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
			console.log('success....????????////////200', response.data.data);
			yield put(loadUsersSuccess(response.data.data));
		}
	} catch (error) {
		console.log('error....????????////////', error);
		yield put(loadUsersError(error));
	}
}

export function* handleCreateUser({ payload }) {
	try {
		const response = yield call(requestCreateUsers, payload);

		if (response.status === 200) {
			console.log('success..create....????????////////200', response.data.data);
			yield put(createUsersSuccess(response.data.data));
		}
	} catch (error) {
		yield put(createUsersError(error));
	}
}

export function* handleDeleteUser({ payload }) {
	try {
		const response = yield call(requestDeleteUsers, payload);

		if (response.status === 200) {
			yield put(deleteUsersSuccess(payload));
		}
	} catch (error) {
		yield put(deleteUsersError(error));
	}
}

export function* handleUpdateUser({ payload: { id, toBeUpdatedUser } }) {
	try {
		const response = yield call(requestUpdateUsers, id, toBeUpdatedUser);

		if (response.status === 200) {
			console.log('success..create....????????////////200', response.data.data);
			yield put(updateUsersSuccess(response.data.data));
		}
	} catch (error) {
		yield put(updateUsersError(error));
	}
}
