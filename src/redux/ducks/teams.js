export const LOAD_TEAMS_START = 'LOAD_TEAMS_START';
export const LOAD_TEAMS_SUCCESS = 'LOAD_TEAMS_SUCCESS';
export const LOAD_TEAMS_ERROR = 'LOAD_TEAMS_ERROR';

export const CREATE_TEAM_START = 'CREATE_TEAM_START';
export const CREATE_TEAM_SUCCESS = 'CREATE_TEAM_SUCCESS';
export const CREATE_TEAM_ERROR = 'CREATE_TEAM_ERROR';

export const DELETE_TEAM_START = 'DELETE_TEAM_START';
export const DELETE_TEAM_SUCCESS = 'DELETE_TEAM_SUCCESS';
export const DELETE_TEAM_ERROR = 'DELETE_TEAM_ERROR';

export const UPDATE_TEAM_START = 'UPDATE_TEAM_START';
export const UPDATE_TEAM_SUCCESS = 'UPDATE_TEAM_SUCCESS';
export const UPDATE_TEAM_ERROR = 'UPDATE_TEAM_ERROR';

export const loadTeamsStart = (userId) => ({
	type: LOAD_TEAMS_START,
	payload: userId,
});

export const loadTeamsSuccess = (teams) => ({
	type: LOAD_TEAMS_SUCCESS,
	payload: teams,
});

export const loadTeamsError = (error) => ({
	type: LOAD_TEAMS_ERROR,
	payload: error,
});

export const createTeamsStart = (team) => ({
	type: CREATE_TEAM_START,
	payload: team,
});

export const createTeamsSuccess = (team) => ({
	type: CREATE_TEAM_SUCCESS,
	payload: team,
});

export const createTeamsError = (error) => ({
	type: CREATE_TEAM_ERROR,
	payload: error,
});

export const deleteTeamsStart = (teamId) => ({
	type: DELETE_TEAM_START,
	payload: teamId,
});

export const deleteTeamsSuccess = (teamId) => ({
	type: DELETE_TEAM_SUCCESS,
	payload: teamId,
});

export const deleteTeamsError = (error) => ({
	type: DELETE_TEAM_ERROR,
	payload: error,
});

export const updateTeamsStart = (teamInfo) => ({
	type: UPDATE_TEAM_START,
	payload: teamInfo,
});

export const updateTeamsSuccess = (teamInfo) => ({
	type: UPDATE_TEAM_SUCCESS,
	payload: teamInfo,
});

export const updateTeamsError = (error) => ({
	type: UPDATE_TEAM_ERROR,
	payload: error,
});

const initialState = {
	teams: [],
	loading: false,
	error: '',
};

// eslint-disable-next-line default-param-last
const teamReducer = (state = initialState, action) => {
	switch (action.type) {
		case LOAD_TEAMS_START:
		case CREATE_TEAM_START:
		case DELETE_TEAM_START:
		case UPDATE_TEAM_START:
			return {
				...state,
				loading: true,
			};

		case LOAD_TEAMS_SUCCESS:
			return {
				...state,
				loading: false,
				teams: action.payload,
			};
		case CREATE_TEAM_SUCCESS:
			return {
				...state,
				loading: false,
				teams: [...state.teams.concat(action.payload)],
			};

		case DELETE_TEAM_SUCCESS: {
			return {
				...state,
				loading: false,
				teams: state.teams.filter((team) => team.id !== action.payload),
			};
		}

		case UPDATE_TEAM_SUCCESS:
			const index = state.teams.findIndex((team) => team.id === action.payload.id);

			const newArray = [...state.teams];

			newArray[index] = action.payload;
			return {
				...state,
				loading: false,
				teams: newArray,
			};

		case LOAD_TEAMS_ERROR:
		case CREATE_TEAM_ERROR:
		case DELETE_TEAM_ERROR:
		case UPDATE_TEAM_ERROR:
			return {
				...state,
				loading: false,
				error: action.payload,
			};
		default:
			return state;
	}
};
export default teamReducer;
