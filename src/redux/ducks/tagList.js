export const LOAD_TAGLIST_START = 'LOAD_TAGLIST_START';
export const LOAD_TAGLIST_SUCCESS = 'LOAD_TAGLIST_SUCCESS';
export const LOAD_TAGLIST_ERROR = 'LOAD_TAGLIST_ERROR';

export const UPDATE_TAGLIST_START = 'UPDATE_TAGLIST_START';
export const UPDATE_TAGLIST_SUCCESS = 'UPDATE_TAGLIST_SUCCESS';
export const UPDATE_TAGLIST_ERROR = 'UPDATE_TAGLIST_ERROR';

export const loadTagListStart = (userInfo) => ({
	type: LOAD_TAGLIST_START,
	payload: userInfo,
});

export const loadTagListSuccess = (userInfo) => ({
	type: LOAD_TAGLIST_SUCCESS,
	payload: userInfo,
});

export const loadTagListError = (error) => ({
	type: LOAD_TAGLIST_ERROR,
	payload: error,
});

export const updateTagListStart = (subSopInfo) => ({
	type: UPDATE_TAGLIST_START,
	payload: subSopInfo,
});

export const updateTagListSuccess = (subSopInfo) => ({
	type: UPDATE_TAGLIST_SUCCESS,
	payload: subSopInfo,
});

export const updateTagListError = (error) => ({
	type: UPDATE_TAGLIST_ERROR,
	payload: error,
});

const initialState = {
	tagLists: [],
	loading: false,
	error: '',
};

// eslint-disable-next-line default-param-last
const tagListReducer = (state = initialState, action) => {
	switch (action.type) {
		case LOAD_TAGLIST_START:
		case UPDATE_TAGLIST_START:
			return {
				...state,
				loading: true,
			};

		case LOAD_TAGLIST_SUCCESS:
			return {
				...state,
				loading: false,
				tagLists: action.payload,
			};
		case UPDATE_TAGLIST_SUCCESS:
			// console.log('ADDD UPDATE TAGS :', action.payload);
			// const index = state.tagLists.findIndex((tag) => tag._id === action.payload[0]._id);

			// const newArray = [...state.tagLists];

			// // eslint-disable-next-line prefer-destructuring
			// newArray[index] = action.payload[0];
			return {
				...state,
				loading: false,
				tagLists: action.payload,
			};
		case LOAD_TAGLIST_ERROR:
		case UPDATE_TAGLIST_ERROR:
			return {
				...state,
				loading: false,
				error: action.payload,
			};
		default:
			return state;
	}
};
export default tagListReducer;
