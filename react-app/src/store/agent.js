import { BASE_URL } from "./config";

// Actions
const GET_AGENTS = "agents/GET_AGENTS";
const GET_AGENT = "agents/GET_AGENT";

// Action Creator
export const getAgents = (agents) => {
	return {
		type: GET_AGENTS,
		agents,
	};
};

const getAgent = (agent) => {
	return {
		type: GET_AGENT,
		agent,
	};
};

// Thunks
export const getAllAgents = () => async (dispatch) => {
	const response = await fetch(`${BASE_URL}/api/agents/`);
	if (response.ok) {
		const data = await response.json();
		dispatch(getAgents(data.agents));
		return data;
	} else if (response.status < 500) {
		const data = await response.json();
		if (data.errors) {
			return data;
		}
	} else {
		return { errors: ["An error occurred. Please try again."] };
	}
};

export const getThisAgent = (agent_id) => async (dispatch) => {
	const response = await fetch(`${BASE_URL}/api/agents/${agent_id}`);
	if (response.ok) {
		const data = await response.json();
		dispatch(getAgent(data.agent));
		return data;
	} else if (response.status < 500) {
		const data = await response.json();
		if (data.errors) {
			return data;
		}
	} else {
		return { errors: ["An error occurred. Please try again."] };
	}
};

// Reducer
const initialState = {};
export default function reducer(state = initialState, action) {
	let newState;
	switch (action.type) {
		case GET_AGENTS:
			newState = { ...state };
			action.agents.forEach((agent) => {
				newState[agent.id] = agent;
			});
			return newState;
		case GET_AGENT:
			newState = {
				...state,
			};
			newState[action.agent.id] = action.agent;
			return newState;
		default:
			return state;
	}
}
