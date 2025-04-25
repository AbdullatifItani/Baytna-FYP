import axios from "axios"; // Import axios
import { BASE_URL } from "./config";

// Actions
const GET_PROPERTIES = "properties/SEARCH_PROPERTIES";
const GET_PROPERTY = "properties/GET_PROPERTY";
const ADD_PROPERTY = "properties/ADD_PROPERTY";
const EDIT_PROPERTY = "properties/EDIT_PROPERTY";
const DELETE_PROPERTY = "properties/DELETE_PROPERTY";

// Action Creators
export const getProperties = (properties) => ({
    type: GET_PROPERTIES,
    properties,
});

const getProperty = (property) => ({
    type: GET_PROPERTY,
    property,
});

const addProperty = (property) => ({
    type: ADD_PROPERTY,
    property,
});

const editProperty = (property) => ({
    type: EDIT_PROPERTY,
    property,
});

const deleteProperty = (propertyId) => ({
    type: DELETE_PROPERTY,
    propertyId,
});

// Thunks
export const searchProperties = (term) => async (dispatch) => {
    try {
        const response = await axios.get(`${BASE_URL}/api/search/${term}`);
        dispatch(getProperties(response.data.properties));
        return response.data;
    } catch (error) {
        if (error.response && error.response.status < 500) {
            return error.response.data;
        }
        return { errors: ["An error occurred. Please try again."] };
    }
};

export const areaProperties = (payload) => async (dispatch) => {
    try {
        const response = await axios.post(`${BASE_URL}/api/search/areas`, payload, {
            headers: { "Content-Type": "application/json" },
        });
        dispatch(getProperties(response.data.properties));
        return response.data;
    } catch (error) {
        if (error.response && error.response.status < 500) {
            return error.response.data;
        }
        return { errors: ["An error occurred. Please try again."] };
    }
};

export const getThisProperty = (property_id) => async (dispatch) => {
    try {
        const response = await axios.get(`${BASE_URL}/api/properties/${property_id}`);
        dispatch(getProperty(response.data.property));
        return response.data;
    } catch (error) {
        if (error.response && error.response.status < 500) {
            return error.response.data;
        }
        return { errors: ["An error occurred. Please try again."] };
    }
};

export const createProperty = (property) => async (dispatch) => {
    try {
        const response = await axios.post(`${BASE_URL}/api/properties/`, property, {
            headers: { "Content-Type": "application/json" },
        });
        dispatch(addProperty(response.data.property));
        return response.data;
    } catch (error) {
        if (error.response && error.response.status < 500) {
            return error.response.data;
        }
        return { errors: ["An error occurred. Please try again."] };
    }
};

export const updateProperty = (property) => async (dispatch) => {
    try {
        const response = await axios.put(`${BASE_URL}/api/properties/${property.id}`, property, {
            headers: { "Content-Type": "application/json" },
        });
        dispatch(editProperty(response.data.property));
        return response.data;
    } catch (error) {
        if (error.response && error.response.status < 500) {
            return error.response.data;
        }
        return { errors: ["An error occurred. Please try again."] };
    }
};

export const removeProperty = (propertyId) => async (dispatch) => {
    try {
        const response = await axios.delete(`${BASE_URL}/api/properties/${propertyId}`);
        dispatch(deleteProperty(propertyId));
        return { message: "Property deleted successfully" };
    } catch (error) {
        if (error.response && error.response.status < 500) {
            return error.response.data;
        }
        return { errors: ["An error occurred. Please try again."] };
    }
};

// Initial State
const initialState = { properties: {} };

// Reducer
export default function reducer(state = initialState, action) {
    let newState;
    switch (action.type) {
        case GET_PROPERTIES:
            newState = {};
            action.properties.forEach((property) => {
                newState[property.id] = property;
            });
            return newState;
        case GET_PROPERTY:
            newState = JSON.parse(JSON.stringify(state));
            newState[action.property.id] = action.property;
            return newState;
        case ADD_PROPERTY:
            newState = {
                ...state,
                properties: state.properties
                    ? [...state.properties, action.property]
                    : [action.property],
            };
            return newState;
        case EDIT_PROPERTY:
            newState = {
                ...state,
                properties: state.properties
                    ? state.properties.map((property) =>
                          property.id === action.property.id ? action.property : property
                      )
                    : [action.property],
            };
            return newState;
        case DELETE_PROPERTY:
            newState = {
                ...state,
                properties: state.properties
                    ? state.properties.filter((property) => property.id !== action.propertyId)
                    : [],
            };
            return newState;
        default:
            return state;
    }
}