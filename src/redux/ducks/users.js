export const LOAD_USERS_START = 'LOAD_USERS_START';
export const LOAD_USERS_SUCCESS = 'LOAD_USERS_SUCCESS';
export const LOAD_USERS_ERROR = 'LOAD_USERS_ERROR';

export const CREATE_USER_START = 'CREATE_USER_START';
export const CREATE_USER_SUCCESS = 'CREATE_USER_SUCCESS';
export const CREATE_USER_ERROR = 'CREATE_USER_ERROR';

export const DELETE_USER_START = 'DELETE_USER_START';
export const DELETE_USER_SUCCESS = 'DELETE_USER_SUCCESS';
export const DELETE_USER_ERROR = 'DELETE_USER_ERROR';

export const UPDATE_USER_START = 'UPDATE_USER_START';
export const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS';
export const UPDATE_USER_ERROR = 'UPDATE_USER_ERROR';

export const loadUsersStart = () => ({
	type: LOAD_USERS_START,
});

export const loadUsersSuccess = (users) => ({
	type: LOAD_USERS_SUCCESS,
	payload: users,
});

export const loadUsersError = (error) => ({
	type: LOAD_USERS_ERROR,
	payload: error,
});

export const createUsersStart = (user) => ({
	type: CREATE_USER_START,
	payload: user,
});

export const createUsersSuccess = (user) => ({
	type: CREATE_USER_SUCCESS,
	payload: user,
});

export const createUsersError = (error) => ({
	type: CREATE_USER_ERROR,
	payload: error,
});

export const deleteUsersStart = (userId) => ({
	type: DELETE_USER_START,
	payload: userId,
});

export const deleteUsersSuccess = (userId) => ({
	type: DELETE_USER_SUCCESS,
	payload: userId,
});

export const deleteUsersError = (error) => ({
	type: DELETE_USER_ERROR,
	payload: error,
});

export const updateUsersStart = (userInfo) => ({
	type: UPDATE_USER_START,
	payload: userInfo,
});

export const updateUsersSuccess = (userInfo) => ({
	type: UPDATE_USER_SUCCESS,
	payload: userInfo,
});

export const updateUsersError = (error) => ({
	type: UPDATE_USER_ERROR,
	payload: error,
});

const initialState = {
	users: [],
	loading: false,
	error: null,
};

// eslint-disable-next-line default-param-last
const usersReducer = (state = initialState, action) => {
	switch (action.type) {
		case LOAD_USERS_START:
		case CREATE_USER_START:
		case DELETE_USER_START:
		case UPDATE_USER_START:
			return {
				...state,
				loading: true,
			};

		case LOAD_USERS_SUCCESS:
			return {
				...state,
				loading: false,
				users: action.payload,
			};

		case CREATE_USER_SUCCESS:
			return {
				...state,
				loading: false,
				users: [...state.users.concat(action.payload)],
			};
		case UPDATE_USER_SUCCESS:
			const index = state.users.findIndex((user) => user.id === action.payload.id);

			const newArray = [...state.users];

			newArray[index] = action.payload;
			return {
				...state,
				loading: false,
				users: newArray,
			};

		case DELETE_USER_SUCCESS: {
			return {
				...state,
				loading: false,
				users: state.users.filter((user) => user.id !== action.payload),
			};
		}

		case LOAD_USERS_ERROR:
		case CREATE_USER_ERROR:
		case DELETE_USER_ERROR:
		case UPDATE_USER_ERROR:
			return {
				...state,
				loading: false,
				error: action.payload,
			};
		default:
			return state;
	}
};

export default usersReducer;
