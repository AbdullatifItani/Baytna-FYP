import axios from "axios";
import { BASE_URL } from "./config";

// Actions
const GET_CHANNELS = "channels/GET_CHANNELS";
const ADD_CHANNEL = "channels/ADD_CHANNEL";
const ADD_CHAT = "channels/ADD_CHAT";
const DELETE_CHAT = "channels/DELETE_CHAT";

// Action Creator
export const getChannels = (channels) => {
    return {
        type: GET_CHANNELS,
        channels,
    };
};

const addChannel = (channel) => {
    return {
        type: ADD_CHANNEL,
        channel,
    };
};

export const addChat = (payload) => {
    return {
        type: ADD_CHAT,
        payload,
    };
};

export const deleteChat = (payload) => {
    return {
        type: DELETE_CHAT,
        payload,
    };
};

// Thunks
export const addThisChannel = (channel) => async (dispatch) => {
    try {
        const response = await axios.post(`${BASE_URL}/api/channels/`, channel, {
            headers: { "Content-Type": "application/json" },
            withCredentials: true, // Include cookies for authentication
        });
        if (response.data.errors) {
            return response.data;
        }
        dispatch(addChannel(response.data.channel));
        return response.data.channel;
    } catch (error) {
        if (error.response && error.response.status < 500) {
            return error.response.data;
        }
        return { errors: ["Something went wrong. Please try again"] };
    }
};

// Reducers
const initialState = { channels: null };

export default function reducer(state = initialState, action) {
    let newState;
    switch (action.type) {
        case GET_CHANNELS:
            newState = {};
            action.channels.forEach((channel) => {
                newState[channel.id] = channel;
            });
            return newState;
        case ADD_CHANNEL:
            newState = JSON.parse(JSON.stringify(state));
            newState[action.channel.id] = action.channel;
            return newState;
        case ADD_CHAT:
            newState = JSON.parse(JSON.stringify(state));
            newState[action.payload.channel_id].chat_ids.push(action.payload.chat_id);
            return newState;
        case DELETE_CHAT:
            newState = JSON.parse(JSON.stringify(state));
            newState[action.payload.channel_id].chat_ids = newState[
                action.payload.channel_id
            ].chat_ids.filter((id) => id !== action.payload.chat_id);
            return newState;
        default:
            return state;
    }
}