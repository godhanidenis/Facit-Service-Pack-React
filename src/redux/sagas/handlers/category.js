import { call, put } from 'redux-saga/effects';
import { loadCategoryError, loadCategorySuccess } from '../../ducks/category';
import { requestGetCategory } from '../requests/category';

// eslint-disable-next-line import/prefer-default-export
export function* handleGetCategory() {
	try {
		const response = yield call(requestGetCategory);

		if (response.status === 200) {
			yield put(loadCategorySuccess(response.data.data));
		}
	} catch (error) {
		yield put(loadCategoryError(error));
	}
}
