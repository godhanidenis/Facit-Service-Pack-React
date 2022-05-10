export const LOAD_AGENTS_START = 'LOAD_AGENTS_START';
export const LOAD_AGENTS_SUCCESS = 'LOAD_AGENTS_SUCCESS';
export const LOAD_AGENTS_ERROR = 'LOAD_AGENTS_ERROR';

export const CREATE_AGENT_START = 'CREATE_AGENT_START';
export const CREATE_AGENT_SUCCESS = 'CREATE_AGENT_SUCCESS';
export const CREATE_AGENT_ERROR = 'CREATE_AGENT_ERROR';

export const DELETE_AGENT_START = 'DELETE_AGENT_START';
export const DELETE_AGENT_SUCCESS = 'DELETE_AGENT_SUCCESS';
export const DELETE_AGENT_ERROR = 'DELETE_AGENT_ERROR';

export const UPDATE_AGENT_START = 'UPDATE_AGENT_START';
export const UPDATE_AGENT_SUCCESS = 'UPDATE_AGENT_SUCCESS';
export const UPDATE_AGENT_ERROR = 'UPDATE_AGENT_ERROR';

export const loadAgentsStart = (userId) => ({
	type: LOAD_AGENTS_START,
	payload: userId,
});

export const loadAgentsSuccess = (agents) => ({
	type: LOAD_AGENTS_SUCCESS,
	payload: agents,
});

export const loadAgentsError = (error) => ({
	type: LOAD_AGENTS_ERROR,
	payload: error,
});

export const createAgentsStart = (agent) => ({
	type: CREATE_AGENT_START,
	payload: agent,
});

export const createAgentsSuccess = (agent) => ({
	type: CREATE_AGENT_SUCCESS,
	payload: agent,
});

export const createAgentsError = (error) => ({
	type: CREATE_AGENT_ERROR,
	payload: error,
});

export const deleteAgentsStart = (agentId) => ({
	type: DELETE_AGENT_START,
	payload: agentId,
});

export const deleteAgentsSuccess = (agentId) => ({
	type: DELETE_AGENT_SUCCESS,
	payload: agentId,
});

export const deleteAgentsError = (error) => ({
	type: DELETE_AGENT_ERROR,
	payload: error,
});

export const updateAgentsStart = (agentInfo) => ({
	type: UPDATE_AGENT_START,
	payload: agentInfo,
});

export const updateAgentsSuccess = (agentInfo) => ({
	type: UPDATE_AGENT_SUCCESS,
	payload: agentInfo,
});

export const updateAgentsError = (error) => ({
	type: UPDATE_AGENT_ERROR,
	payload: error,
});

const initialState = {
	agents: [],
	loading: false,
	error: '',
};

// eslint-disable-next-line default-param-last
const agentReducer = (state = initialState, action) => {
	switch (action.type) {
		case LOAD_AGENTS_START:
		case CREATE_AGENT_START:
		case DELETE_AGENT_START:
		case UPDATE_AGENT_START:
			return {
				...state,
				loading: true,
			};

		case LOAD_AGENTS_SUCCESS:
			return {
				...state,
				loading: false,
				agents: action.payload,
			};
		case CREATE_AGENT_SUCCESS:
			return {
				...state,
				loading: false,
				agents: [...state.agents.concat(action.payload)],
			};

		case DELETE_AGENT_SUCCESS: {
			return {
				...state,
				loading: false,
				agents: state.agents.filter((agent) => agent.id !== action.payload),
			};
		}

		case UPDATE_AGENT_SUCCESS:
			const index = state.agents.findIndex((agent) => agent.id === action.payload.id);

			const newArray = [...state.agents];

			newArray[index] = action.payload;
			return {
				...state,
				loading: false,
				agents: newArray,
			};

		case LOAD_AGENTS_ERROR:
		case CREATE_AGENT_ERROR:
		case DELETE_AGENT_ERROR:
		case UPDATE_AGENT_ERROR:
			return {
				...state,
				loading: false,
				error: action.payload,
			};
		default:
			return state;
	}
};
export default agentReducer;
