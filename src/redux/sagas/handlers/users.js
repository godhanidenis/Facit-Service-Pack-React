import axios from 'axios';
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
import { requestGetUsers } from '../requests/users';

// eslint-disable-next-line import/prefer-default-export
export function* handleGetUsers() {
	try {
		const response = yield call(requestGetUsers);
		console.log('....res', response);

		if (response.status === 200) {
			yield console.log('success load..');
			yield put(loadUsersSuccess(response.data.data));
		}
	} catch (error) {
		yield console.log('error load...');
		yield put(loadUsersError(error.response.data.data));
	}
}

export function* handleCreateUser({ payload }) {
	try {
		const response = yield call(axios.post, 'http://3.215.147.147/admin_panel/users/', payload);

		yield console.log('res create...', response);

		if (response.status === 201) {
			yield console.log('success create...');

			yield put(createUsersSuccess(response.data.data));
		}
	} catch (error) {
		yield console.log('error create...');
		yield put(createUsersError(error.response.data));
	}
}

export function* handleDeleteUser({ payload }) {
	try {
		console.log('id::::::', payload);
		// const response = yield call(requestDeleteUsers);
		const response = yield call(
			axios.delete,
			`http://3.215.147.147/admin_panel/users/${payload}`,
		);

		console.log('....res', response);

		if (response.status === 200) {
			yield console.log('success delete...');
			yield put(deleteUsersSuccess(payload));
		}
	} catch (error) {
		yield console.log('error delete...');
		yield put(deleteUsersError(error.response.data));
	}
}

export function* handleUpdateUser({ payload: { id, formValue } }) {
	try {
		// const response = yield call(updateUsersApi, id, formValue);

		const response = yield call(
			axios.put,
			`http://3.215.147.147/admin_panel/users/${id}`,
			formValue,
		);
		console.log('....res', response);

		if (response.status === 200) {
			yield console.log('success update...');
			yield put(updateUsersSuccess());
		}
	} catch (error) {
		yield console.log('error update...');
		yield put(updateUsersError(error.response.data));
	}
}
