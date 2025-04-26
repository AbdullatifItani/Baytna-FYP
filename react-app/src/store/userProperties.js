import axios from "axios"; // Import axios
import { BASE_URL } from "./config";

// Actions
const GET_USER_PROPERTIES = "properties/GET_USER_PROPERTIES";

// Action Creators
const getUserProperties = (properties) => ({
    type: GET_USER_PROPERTIES,
    properties,
});

// Thunks
export const fetchUserProperties = (userId) => async (dispatch) => {
    try {
        const response = await axios.get(`${BASE_URL}/api/properties/user/${userId}`, {
            withCredentials: true, // Include credentials (cookies)
        });
        if (response.status === 200) {
            dispatch(getUserProperties(response.data.properties));
            return response.data;
        }
    } catch (error) {
        if (error.response && error.response.status < 500) {
            return error.response.data;
        }
        return { errors: ["An error occurred. Please try again."] };
    }
};

// Initial states
const initialState = { userProperties: {} };

// Reducer
export default function reducer(state = initialState, action) {
    let newState;
    switch (action.type) {
        case GET_USER_PROPERTIES:
            newState = {};
            action.properties.forEach((property) => {
                newState[property.id] = property;
            });
            return newState;
        default:
            return state;
    }
}