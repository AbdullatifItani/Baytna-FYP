import axios from "axios"; // Import axios
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
    try {
        const response = await axios.get(`${BASE_URL}/api/agents/`);
        dispatch(getAgents(response.data.agents));
        return response.data;
    } catch (error) {
        if (error.response && error.response.status < 500) {
            return error.response.data;
        }
        return { errors: ["An error occurred. Please try again."] };
    }
};

export const getThisAgent = (agent_id) => async (dispatch) => {
    try {
        const response = await axios.get(`${BASE_URL}/api/agents/${agent_id}`);
        dispatch(getAgent(response.data.agent));
        return response.data;
    } catch (error) {
        if (error.response && error.response.status < 500) {
            return error.response.data;
        }
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