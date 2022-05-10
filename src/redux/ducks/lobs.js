export const LOAD_LOBS_START = 'LOAD_LOBS_START';
export const LOAD_LOBS_SUCCESS = 'LOAD_LOBS_SUCCESS';
export const LOAD_LOBS_ERROR = 'LOAD_LOBS_ERROR';

export const CREATE_LOBS_START = 'CREATE_LOBS_START';
export const CREATE_LOBS_SUCCESS = 'CREATE_LOBS_SUCCESS';
export const CREATE_LOBS_ERROR = 'CREATE_LOBS_ERROR';

export const DELETE_LOBS_START = 'DELETE_LOBS_START';
export const DELETE_LOBS_SUCCESS = 'DELETE_LOBS_SUCCESS';
export const DELETE_LOBS_ERROR = 'DELETE_LOBS_ERROR';

export const UPDATE_LOBS_START = 'UPDATE_LOBS_START';
export const UPDATE_LOBS_SUCCESS = 'UPDATE_LOBS_SUCCESS';
export const UPDATE_LOBS_ERROR = 'UPDATE_LOBS_ERROR';

export const loadLobsStart = (userId) => ({
	type: LOAD_LOBS_START,
	payload: userId,
});

export const loadLobsSuccess = (lob) => ({
	type: LOAD_LOBS_SUCCESS,
	payload: lob,
});

export const loadLobsError = (error) => ({
	type: LOAD_LOBS_ERROR,
	payload: error,
});

export const createLobsStart = (lob) => ({
	type: CREATE_LOBS_START,
	payload: lob,
});

export const createLobsSuccess = (lob) => ({
	type: CREATE_LOBS_SUCCESS,
	payload: lob,
});

export const createLobsError = (error) => ({
	type: CREATE_LOBS_ERROR,
	payload: error,
});

export const deleteLobsStart = (lobId) => ({
	type: DELETE_LOBS_START,
	payload: lobId,
});

export const deleteLobsSuccess = (lobId) => ({
	type: DELETE_LOBS_SUCCESS,
	payload: lobId,
});

export const deleteLobsError = (error) => ({
	type: DELETE_LOBS_ERROR,
	payload: error,
});
export const updateLobsStart = (lobInfo) => ({
	type: UPDATE_LOBS_START,
	payload: lobInfo,
});

export const updateLobsSuccess = (lobInfo) => ({
	type: UPDATE_LOBS_SUCCESS,
	payload: lobInfo,
});

export const updateLobsError = (error) => ({
	type: UPDATE_LOBS_ERROR,
	payload: error,
});
const initialState = {
	lobs: [],
	loading: false,
	error: '',
};

// eslint-disable-next-line default-param-last
const lobReducer = (state = initialState, action) => {
	switch (action.type) {
		case LOAD_LOBS_START:
		case CREATE_LOBS_START:
		case DELETE_LOBS_START:
		case UPDATE_LOBS_START:
			return {
				...state,
				loading: true,
			};

		case LOAD_LOBS_SUCCESS:
			return {
				...state,
				loading: false,
				lobs: action.payload,
			};
		case CREATE_LOBS_SUCCESS:
			return {
				...state,
				loading: false,
				lobs: [...state.lobs.concat(action.payload)],
			};

		case DELETE_LOBS_SUCCESS: {
			return {
				...state,
				loading: false,
				lobs: state.lobs.filter((lob) => lob.id !== action.payload),
			};
		}
		case UPDATE_LOBS_SUCCESS:
			const index = state.lobs.findIndex((lob) => lob.id === action.payload.id);

			const newArray = [...state.lobs];

			newArray[index] = action.payload;
			return {
				...state,
				loading: false,
				lobs: newArray,
			};
		case LOAD_LOBS_ERROR:
		case CREATE_LOBS_ERROR:
		case DELETE_LOBS_ERROR:
		case UPDATE_LOBS_ERROR:
			return {
				...state,
				loading: false,
				error: action.payload,
			};
		default:
			return state;
	}
};
export default lobReducer;
