import { call, put } from 'redux-saga/effects';
import { requestGetTagList, requestUpdateTagList } from '../requests/tagList';
// eslint-disable-next-line import/named
import {
	loadTagListError,
	loadTagListSuccess,
	updateTagListError,
	updateTagListSuccess,
} from '../../ducks/tagList';

// eslint-disable-next-line import/prefer-default-export
export function* handleGetTagList({ payload: { id, slug } }) {
	try {
		const response = yield call(requestGetTagList, id, slug);
		if (response.status === 200) {
			yield put(loadTagListSuccess(response?.data?.data));
		}
	} catch (error) {
		yield put(loadTagListError(error));
	}
}
export function* handleUpdateTagList({ payload: { id, record } }) {
	try {
		const response = yield call(requestUpdateTagList, id, record);

		if (response.status === 200) {
			yield put(updateTagListSuccess(response?.data?.data));
		}
	} catch (error) {
		yield put(updateTagListError(error));
	}
}
