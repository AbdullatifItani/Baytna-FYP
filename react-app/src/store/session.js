import { BASE_URL } from "./config";
import axios from 'axios';

// constants
const SET_USER = "session/SET_USER";
const REMOVE_USER = "session/REMOVE_USER";
const UPDATE_USER = "session/UPDATE_USER";
const UPLOAD_PHOTO = "session/UPLOAD_PHOTO";

// Action Creator
const setUser = (user) => ({
    type: SET_USER,
    payload: user,
});

export const updateUser = (user) => ({
    type: UPDATE_USER,
    payload: user,
});

export const uploadPhoto = (url) => ({
    type: UPLOAD_PHOTO,
    url,
});

const removeUser = () => ({
    type: REMOVE_USER,
});

// Thunks
export const authenticate = () => async (dispatch) => {
    try {
        const response = await axios.get(`${BASE_URL}/api/auth/`, {
            headers: {
                "Content-Type": "application/json",
            },
            withCredentials: true,
        });
        if (response.data.errors) {
            return;
        }
        dispatch(setUser(response.data));
    } catch (error) {
        console.error("Error during authentication:", error);
    }
};

export const login = (email, password) => async (dispatch) => {
    try {
        const response = await axios.post(
            `${BASE_URL}/api/auth/login`,
            { email, password },
            {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true,
            }
        );
        dispatch(setUser(response.data));
        return null;
    } catch (error) {
        if (error.response && error.response.status < 500) {
            return error.response.data.errors || ["An error occurred. Please try again."];
        }
        return ["An error occurred. Please try again."];
    }
};

export const logout = () => async (dispatch) => {
    try {
        await axios.get(`${BASE_URL}/api/auth/logout`, {
            headers: {
                "Content-Type": "application/json",
            },
            withCredentials: true,
        });
        dispatch(removeUser());
    } catch (error) {
        console.error("Error during logout:", error);
    }
};

export const signUp = (username, email, password, agent) => async (dispatch) => {
    try {
        const response = await axios.post(
            `${BASE_URL}/api/auth/signup`,
            { username, email, password, agent },
            {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true,
            }
        );
        dispatch(setUser(response.data));
        return null;
    } catch (error) {
        if (error.response && error.response.status < 500) {
            return error.response.data.errors || ["An error occurred. Please try again."];
        }
        return ["An error occurred. Please try again."];
    }
};

export const updateThisUser = (user) => async (dispatch) => {
    try {
        const response = await axios.put(
            `${BASE_URL}/api/auth/`,
            user,
            {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true,
            }
        );
        dispatch(updateUser(response.data.user));
        return response.data;
    } catch (error) {
        if (error.response && error.response.status < 500) {
            return error.response.data || { errors: ["An error occurred. Please try again."] };
        }
        return { errors: ["An error occurred. Please try again."] };
    }
};

export const addServiceArea = (zip) => async (dispatch) => {
    try {
        const response = await axios.post(
            `${BASE_URL}/api/service_areas/`,
            zip,
            {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true,
            }
        );
        dispatch(updateUser(response.data.user));
        return response.data;
    } catch (error) {
        if (error.response && error.response.status < 500) {
            return error.response.data || { errors: ["An error occurred. Please try again."] };
        }
        return { errors: ["An error occurred. Please try again."] };
    }
};

export const removeServiceArea = (zip) => async (dispatch) => {
    try {
        const response = await axios.delete(`${BASE_URL}/api/service_areas/${zip}`, {
            headers: {
                "Content-Type": "application/json",
            },
            withCredentials: true,
        });
        dispatch(updateUser(response.data.user));
        return response.data;
    } catch (error) {
        if (error.response && error.response.status < 500) {
            return error.response.data || { errors: ["An error occurred. Please try again."] };
        }
        return { errors: ["An error occurred. Please try again."] };
    }
};

// Reducer
const initialState = { user: null };

export default function reducer(state = initialState, action) {
    let newState;
    switch (action.type) {
        case SET_USER:
            return { user: action.payload };
        case UPDATE_USER:
            newState = JSON.parse(JSON.stringify(state));
            newState.user = { ...newState.user, ...action.payload };
            return newState;
        case UPLOAD_PHOTO:
            newState = JSON.parse(JSON.stringify(state));
            newState.user = { ...newState.user, photo: action.url.url };
            return newState;
        case REMOVE_USER:
            return { user: null };
        default:
            return state;
    }
}