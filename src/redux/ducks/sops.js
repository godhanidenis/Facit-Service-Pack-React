export const LOAD_SOPS_START = 'LOAD_SOPS_START';
export const LOAD_SOPS_SUCCESS = 'LOAD_SOPS_SUCCESS';
export const LOAD_SOPS_ERROR = 'LOAD_SOPS_ERROR';

export const UPDATE_SOP_START = 'UPDATE_SOP_START';
export const UPDATE_SOP_SUCCESS = 'UPDATE_SOP_SUCCESS';
export const UPDATE_SOP_ERROR = 'UPDATE_SOP_ERROR';

export const loadSopsStart = (userId) => ({
	type: LOAD_SOPS_START,
	payload: userId,
});

export const loadSopsSuccess = (sops) => ({
	type: LOAD_SOPS_SUCCESS,
	payload: sops,
});

export const loadSopsError = (error) => ({
	type: LOAD_SOPS_ERROR,
	payload: error,
});

export const updateSopsStart = (sopInfo) => ({
	type: UPDATE_SOP_START,
	payload: sopInfo,
});

export const updateSopsSuccess = (sopInfo) => ({
	type: UPDATE_SOP_SUCCESS,
	payload: sopInfo,
});

export const updateSopsError = (error) => ({
	type: UPDATE_SOP_ERROR,
	payload: error,
});

const initialState = {
	sops: [],
	loading: false,
	error: '',
};

// eslint-disable-next-line default-param-last
const sopReducer = (state = initialState, action) => {
	switch (action.type) {
		case LOAD_SOPS_START:
		case UPDATE_SOP_START:
			return {
				...state,
				loading: true,
			};

		case LOAD_SOPS_SUCCESS:
			return {
				...state,
				loading: false,
				sops: action.payload,
			};

		case UPDATE_SOP_SUCCESS:
			const index = state.sops.findIndex((sop) => sop.id === action.payload.id);

			const newArray = [...state.sops];

			newArray[index] = action.payload;
			return {
				...state,
				loading: false,
				sops: newArray,
			};

		case LOAD_SOPS_ERROR:
		case UPDATE_SOP_ERROR:
			return {
				...state,
				loading: false,
				error: action.payload,
			};
		default:
			return state;
	}
};
export default sopReducer;
