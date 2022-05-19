export const LOAD_LOCATION_START = 'LOAD_LOCATION_START';
export const LOAD_LOCATION_SUCCESS = 'LOAD_LOCATION_SUCCESS';
export const LOAD_LOCATION_ERROR = 'LOAD_LOCATION_ERROR';

export const CREATE_LOCATION_START = 'CREATE_LOCATION_START';
export const CREATE_LOCATION_SUCCESS = 'CREATE_LOCATION_SUCCESS';
export const CREATE_LOCATION_ERROR = 'CREATE_LOCATION_ERROR';

export const DELETE_LOCATION_START = 'DELETE_LOCATION_START';
export const DELETE_LOCATION_SUCCESS = 'DELETE_LOCATION_SUCCESS';
export const DELETE_LOCATION_ERROR = 'DELETE_LOCATION_ERROR';

export const UPDATE_LOCATION_START = 'UPDATE_LOCATION_START';
export const UPDATE_LOCATION_SUCCESS = 'UPDATE_LOCATION_SUCCESS';
export const UPDATE_LOCATION_ERROR = 'UPDATE_LOCATION_ERROR';

export const loadLocationsStart = (userId) => ({
	type: LOAD_LOCATION_START,
	payload: userId,
});

export const loadLocationsSuccess = (location) => ({
	type: LOAD_LOCATION_SUCCESS,
	payload: location,
});

export const loadLocationsError = (error) => ({
	type: LOAD_LOCATION_ERROR,
	payload: error,
});

export const createLocationsStart = (location) => ({
	type: CREATE_LOCATION_START,
	payload: location,
});

export const createLocationsSuccess = (location) => ({
	type: CREATE_LOCATION_SUCCESS,
	payload: location,
});

export const createLocationsError = (error) => ({
	type: CREATE_LOCATION_ERROR,
	payload: error,
});

export const deleteLocationsStart = (locationId) => ({
	type: DELETE_LOCATION_START,
	payload: locationId,
});

export const deleteLocationsSuccess = (locationId) => ({
	type: DELETE_LOCATION_SUCCESS,
	payload: locationId,
});

export const deleteLocationsError = (error) => ({
	type: DELETE_LOCATION_ERROR,
	payload: error,
});

export const updateLocationStart = (agentInfo) => ({
	type: UPDATE_LOCATION_START,
	payload: agentInfo,
});

export const updateLocationSuccess = (agentInfo) => ({
	type: UPDATE_LOCATION_SUCCESS,
	payload: agentInfo,
});

export const updateLocationError = (error) => ({
	type: UPDATE_LOCATION_ERROR,
	payload: error,
});

const initialState = {
	locations: [],
	loading: false,
	error: '',
};

// eslint-disable-next-line default-param-last
const locationReducer = (state = initialState, action) => {
	switch (action.type) {
		case LOAD_LOCATION_START:
		case CREATE_LOCATION_START:
		case DELETE_LOCATION_START:
		case UPDATE_LOCATION_START:
			return {
				...state,
				loading: true,
			};

		case LOAD_LOCATION_SUCCESS:
			return {
				...state,
				loading: false,
				locations: action.payload,
			};
		case CREATE_LOCATION_SUCCESS:
			return {
				...state,
				loading: false,
				locations: [...state.locations.concat(action.payload)],
			};

		case DELETE_LOCATION_SUCCESS: {
			return {
				...state,
				loading: false,
				locations: state.locations.filter((location) => location.id !== action.payload),
			};
		}
		case UPDATE_LOCATION_SUCCESS:
			const index = state.locations.findIndex(
				(location) => location.id === action.payload.id,
			);

			const newArray = [...state.locations];

			newArray[index] = action.payload;
			return {
				...state,
				loading: false,
				locations: newArray,
			};
		case LOAD_LOCATION_ERROR:
		case CREATE_LOCATION_ERROR:
		case DELETE_LOCATION_ERROR:
		case UPDATE_LOCATION_ERROR:
			return {
				...state,
				loading: false,
				error: action.payload,
			};
		default:
			return state;
	}
};
export default locationReducer;
