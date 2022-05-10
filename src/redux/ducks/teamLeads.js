export const LOAD_TEAMLEAD_START = 'LOAD_TEAMLEAD_START';
export const LOAD_TEAMLEAD_SUCCESS = 'LOAD_TEAMLEAD_SUCCESS';
export const LOAD_TEAMLEAD_ERROR = 'LOAD_TEAMLEAD_ERROR';

export const CREATE_TEAMLEAD_START = 'CREATE_TEAMLEAD_START';
export const CREATE_TEAMLEAD_SUCCESS = 'CREATE_TEAMLEAD_SUCCESS';
export const CREATE_TEAMLEAD_ERROR = 'CREATE_TEAMLEAD_ERROR';

export const DELETE_TEAMLEAD_START = 'DELETE_TEAMLEAD_START';
export const DELETE_TEAMLEAD_SUCCESS = 'DELETE_TEAMLEAD_SUCCESS';
export const DELETE_TEAMLEAD_ERROR = 'DELETE_TEAMLEAD_ERROR';

export const UPDATE_TEAMLEAD_START = 'UPDATE_TEAMLEAD_START';
export const UPDATE_TEAMLEAD_SUCCESS = 'UPDATE_TEAMLEAD_SUCCESS';
export const UPDATE_TEAMLEAD_ERROR = 'UPDATE_TEAMLEAD_ERROR';

export const loadTeamLeadsStart = (userId) => ({
	type: LOAD_TEAMLEAD_START,
	payload: userId,
});

export const loadTeamLeadsSuccess = (teamLead) => ({
	type: LOAD_TEAMLEAD_SUCCESS,
	payload: teamLead,
});

export const loadTeamLeadsError = (error) => ({
	type: LOAD_TEAMLEAD_ERROR,
	payload: error,
});

export const createTeamLeadsStart = (teamLead) => ({
	type: CREATE_TEAMLEAD_START,
	payload: teamLead,
});

export const createTeamLeadsSuccess = (teamLead) => ({
	type: CREATE_TEAMLEAD_SUCCESS,
	payload: teamLead,
});

export const createTeamLeadsError = (error) => ({
	type: CREATE_TEAMLEAD_ERROR,
	payload: error,
});

export const deleteTeamLeadsStart = (teamLeadId) => ({
	type: DELETE_TEAMLEAD_START,
	payload: teamLeadId,
});

export const deleteTeamLeadsSuccess = (teamLeadId) => ({
	type: DELETE_TEAMLEAD_SUCCESS,
	payload: teamLeadId,
});

export const deleteTeamLeadsError = (error) => ({
	type: DELETE_TEAMLEAD_ERROR,
	payload: error,
});

export const updateTeamLeadsStart = (teamLeadInfo) => ({
	type: UPDATE_TEAMLEAD_START,
	payload: teamLeadInfo,
});

export const updateTeamLeadsSuccess = (teamLeadInfo) => ({
	type: UPDATE_TEAMLEAD_SUCCESS,
	payload: teamLeadInfo,
});

export const updateTeamLeadsError = (error) => ({
	type: UPDATE_TEAMLEAD_ERROR,
	payload: error,
});

const initialState = {
	teamLeads: [],
	loading: false,
	error: '',
};

// eslint-disable-next-line default-param-last
const teamLeadReducer = (state = initialState, action) => {
	switch (action.type) {
		case LOAD_TEAMLEAD_START:
		case CREATE_TEAMLEAD_START:
		case DELETE_TEAMLEAD_START:
		case UPDATE_TEAMLEAD_START:
			return {
				...state,
				loading: true,
			};

		case LOAD_TEAMLEAD_SUCCESS:
			return {
				...state,
				loading: false,
				teamLeads: action.payload,
			};
		case CREATE_TEAMLEAD_SUCCESS:
			return {
				...state,
				loading: false,
				teamLeads: [...state.teamLeads.concat(action.payload)],
			};

		case DELETE_TEAMLEAD_SUCCESS: {
			return {
				...state,
				loading: false,
				teamLeads: state.teamLeads.filter((teamLead) => teamLead.id !== action.payload),
			};
		}

		case UPDATE_TEAMLEAD_SUCCESS:
			const index = state.teamLeads.findIndex(
				(teamLead) => teamLead.id === action.payload.id,
			);

			const newArray = [...state.teamLeads];

			newArray[index] = action.payload;
			return {
				...state,
				loading: false,
				teamLeads: newArray,
			};

		case LOAD_TEAMLEAD_ERROR:
		case CREATE_TEAMLEAD_ERROR:
		case DELETE_TEAMLEAD_ERROR:
		case UPDATE_TEAMLEAD_ERROR:
			return {
				...state,
				loading: false,
				error: action.payload,
			};
		default:
			return state;
	}
};
export default teamLeadReducer;
