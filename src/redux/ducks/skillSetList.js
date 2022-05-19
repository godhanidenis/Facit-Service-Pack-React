export const LOAD_SKILLSETLIST_START = 'LOAD_SKILLSETLIST_START';
export const LOAD_SKILLSETLIST_SUCCESS = 'LOAD_SKILLSETLIST_SUCCESS';
export const LOAD_SKILLSETLIST_ERROR = 'LOAD_SKILLSETLIST_ERROR';

export const UPDATE_SKILLSETLIST_START = 'UPDATE_SKILLSETLIST_START';
export const UPDATE_SKILLSETLIST_SUCCESS = 'UPDATE_SKILLSETLIST_SUCCESS';
export const UPDATE_SKILLSETLIST_ERROR = 'UPDATE_SKILLSETLIST_ERROR';

export const loadSkillSetListStart = (userInfo) => ({
	type: LOAD_SKILLSETLIST_START,
	payload: userInfo,
});

export const loadSkillSetListSuccess = (userInfo) => ({
	type: LOAD_SKILLSETLIST_SUCCESS,
	payload: userInfo,
});

export const loadSkillSetListError = (error) => ({
	type: LOAD_SKILLSETLIST_ERROR,
	payload: error,
});

export const updateSkillSetListStart = (subSopInfo) => ({
	type: UPDATE_SKILLSETLIST_START,
	payload: subSopInfo,
});

export const updateSkillSetListSuccess = (subSopInfo) => ({
	type: UPDATE_SKILLSETLIST_SUCCESS,
	payload: subSopInfo,
});

export const updateSkillSetListError = (error) => ({
	type: UPDATE_SKILLSETLIST_ERROR,
	payload: error,
});

const initialState = {
	skillSetLists: [],
	loading: false,
	error: '',
};

// eslint-disable-next-line default-param-last
const skillSetListReducer = (state = initialState, action) => {
	switch (action.type) {
		case LOAD_SKILLSETLIST_START:
		case UPDATE_SKILLSETLIST_START:
			return {
				...state,
				loading: true,
			};

		case LOAD_SKILLSETLIST_SUCCESS:
			console.log('load ppp', action);
			return {
				...state,
				loading: false,
				skillSetLists: action.payload,
			};
		case UPDATE_SKILLSETLIST_SUCCESS:
			console.log('actions', action);
			const index = state.skillSetLists.findIndex(
				(skill) => skill._id === action.payload[0]._id,
			);
			console.log('index', index);

			const newArray = [...state.skillSetLists];

			// eslint-disable-next-line prefer-destructuring
			newArray[index] = action.payload[0];
			return {
				...state,
				loading: false,
				skillSetLists: newArray,
			};
		case LOAD_SKILLSETLIST_ERROR:
		case UPDATE_SKILLSETLIST_ERROR:
			return {
				...state,
				loading: false,
				error: action.payload,
			};
		default:
			return state;
	}
};
export default skillSetListReducer;
