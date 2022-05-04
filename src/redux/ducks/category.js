export const LOAD_CATEGORY_START = 'LOAD_CATEGORY_START';
export const LOAD_CATEGORY_SUCCESS = 'LOAD_CATEGORY_SUCCESS';
export const LOAD_CATEGORY_ERROR = 'LOAD_CATEGORY_ERROR';

export const loadCategoryStart = () => ({
	type: LOAD_CATEGORY_START,
});

export const loadCategorySuccess = (cat) => ({
	type: LOAD_CATEGORY_SUCCESS,
	payload: cat,
});

export const loadCategoryError = (error) => ({
	type: LOAD_CATEGORY_ERROR,
	payload: error,
});
const initialState = {
	category: [],
	loading: false,
	error: null,
};

// eslint-disable-next-line default-param-last
const categoryReducer = (state = initialState, action) => {
	switch (action.type) {
		case LOAD_CATEGORY_START:
			return {
				...state,
				loading: true,
			};

		case LOAD_CATEGORY_SUCCESS:
			return {
				...state,
				loading: false,
				category: action.payload,
			};

		case LOAD_CATEGORY_ERROR:
			return {
				...state,
				loading: false,
				error: action.payload,
			};
		default:
			return state;
	}
};

export default categoryReducer;
