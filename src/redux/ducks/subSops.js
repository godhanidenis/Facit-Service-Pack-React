export const LOAD_SUBSOPS_START = 'LOAD_SUBSOPS_START';
export const LOAD_SUBSOPS_SUCCESS = 'LOAD_SUBSOPS_SUCCESS';
export const LOAD_SUBSOPS_ERROR = 'LOAD_SUBSOPS_ERROR';

export const CREATE_SUBSOPS_START = 'CREATE_SUBSOPS_START';
export const CREATE_SUBSOPS_SUCCESS = 'CREATE_SUBSOPS_SUCCESS';
export const CREATE_SUBSOPS_ERROR = 'CREATE_SUBSOPS_ERROR';

export const DELETE_SUBSOPS_START = 'DELETE_SUBSOPS_START';
export const DELETE_SUBSOPS_SUCCESS = 'DELETE_SUBSOPS_SUCCESS';
export const DELETE_SUBSOPS_ERROR = 'DELETE_SUBSOPS_ERROR';

export const UPDATE_SUBSOPS_START = 'UPDATE_SUBSOPS_START';
export const UPDATE_SUBSOPS_SUCCESS = 'UPDATE_SUBSOPS_SUCCESS';
export const UPDATE_SUBSOPS_ERROR = 'UPDATE_SUBSOPS_ERROR';

export const loadSubSopsStart = (userInfo) => ({
	type: LOAD_SUBSOPS_START,
	payload: userInfo,
});

export const loadSubSopsSuccess = (userInfo) => ({
	type: LOAD_SUBSOPS_SUCCESS,
	payload: userInfo,
});

export const loadSubSopsError = (error) => ({
	type: LOAD_SUBSOPS_ERROR,
	payload: error,
});

export const createSubSopsStart = (subSop) => ({
	type: CREATE_SUBSOPS_START,
	payload: subSop,
});

export const createSubSopsSuccess = (subSop) => ({
	type: CREATE_SUBSOPS_SUCCESS,
	payload: subSop,
});

export const createSubSopsError = (error) => ({
	type: CREATE_SUBSOPS_ERROR,
	payload: error,
});

export const deleteSubSopsStart = (subSopId) => ({
	type: DELETE_SUBSOPS_START,
	payload: subSopId,
});

export const deleteSubSopsSuccess = (subSopId) => ({
	type: DELETE_SUBSOPS_SUCCESS,
	payload: subSopId,
});

export const deleteSubSopsError = (error) => ({
	type: DELETE_SUBSOPS_ERROR,
	payload: error,
});

export const updateSubSopsStart = (subSopInfo) => ({
	type: UPDATE_SUBSOPS_START,
	payload: subSopInfo,
});

export const updateSubSopsSuccess = (subSopInfo) => ({
	type: UPDATE_SUBSOPS_SUCCESS,
	payload: subSopInfo,
});

export const updateSubSopsError = (error) => ({
	type: UPDATE_SUBSOPS_ERROR,
	payload: error,
});

const initialState = {
	subSops: [],
	loading: false,
	error: null,
};

// eslint-disable-next-line default-param-last
const subSopReducer = (state = initialState, action) => {
	switch (action.type) {
		case LOAD_SUBSOPS_START:
		case CREATE_SUBSOPS_START:
		case DELETE_SUBSOPS_START:
		case UPDATE_SUBSOPS_START:
			return {
				...state,
				loading: true,
			};

		case LOAD_SUBSOPS_SUCCESS:
			console.log('load ppp', action);
			return {
				...state,
				loading: false,
				subSops: action.payload,
			};
		case CREATE_SUBSOPS_SUCCESS:
			console.log('actions', action.payload);

			// eslint-disable-next-line no-return-assign
			return {
				...state,
				loading: false,
				subSops: (state.subSops = action.payload),
			};

		case DELETE_SUBSOPS_SUCCESS: {
			return {
				...state,
				loading: false,
				subSops: state.subSops.filter((subSop) => subSop._id !== action.payload.id),
			};
		}

		case UPDATE_SUBSOPS_SUCCESS:
			console.log('actions', action.payload[0]);
			const index = state.subSops.findIndex((subSop) => subSop._id === action.payload[0]._id);

			const newArray = [...state.subSops];

			// eslint-disable-next-line prefer-destructuring
			newArray[index] = action.payload[0];
			return {
				...state,
				loading: false,
				subSops: newArray,
			};

		case LOAD_SUBSOPS_ERROR:
		case CREATE_SUBSOPS_ERROR:
		case DELETE_SUBSOPS_ERROR:
		case UPDATE_SUBSOPS_ERROR:
			return {
				...state,
				loading: false,
				error: action.payload,
			};
		default:
			return state;
	}
};
export default subSopReducer;
