import { all, fork, takeLatest } from 'redux-saga/effects';
import {
	CREATE_USER_START,
	DELETE_USER_START,
	LOAD_USERS_START,
	UPDATE_USER_START,
} from '../ducks/users';
import {
	handleCreateUser,
	handleDeleteUser,
	handleGetUsers,
	handleUpdateUser,
} from './handlers/users';

function* onLoadUsers() {
	yield takeLatest(LOAD_USERS_START, handleGetUsers);
}

function* onCreateUsers() {
	yield takeLatest(CREATE_USER_START, handleCreateUser);
}

function* onUpdateUsers() {
	yield takeLatest(UPDATE_USER_START, handleUpdateUser);
}

function* onDeleteUsers() {
	yield takeLatest(DELETE_USER_START, handleDeleteUser);
}

const userSagas = [
	fork(onLoadUsers),
	fork(onCreateUsers),
	fork(onDeleteUsers),
	fork(onUpdateUsers),
];

// eslint-disable-next-line import/prefer-default-export
export default function* watcherSaga() {
	yield all([...userSagas]);
}
