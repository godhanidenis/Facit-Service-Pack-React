import { call, put } from 'redux-saga/effects';
import {
	loadSkillSetListError,
	loadSkillSetListSuccess,
	updateSkillSetListError,
	updateSkillSetListSuccess,
} from '../../ducks/skillSetList';
import { requestGetSkillSetList, requestUpdateSkillSetList } from '../requests/skillSetList';

export function* handleGetSkillSetList({ payload: { id, slug } }) {
	try {
		const response = yield call(requestGetSkillSetList, id, slug);
		console.log('resssss tag ', response);
		if (response.status === 200) {
			yield put(loadSkillSetListSuccess(response?.data?.data));
		}
	} catch (error) {
		yield put(loadSkillSetListError(error));
	}
}
export function* handleUpdateSkillSetList({ payload: { id, record } }) {
	try {
		const response = yield call(requestUpdateSkillSetList, id, record);
		console.log('response..', response);

		if (response.status === 200) {
			yield put(updateSkillSetListSuccess(response.data.data));
		}
	} catch (error) {
		yield put(updateSkillSetListError(error));
	}
}
