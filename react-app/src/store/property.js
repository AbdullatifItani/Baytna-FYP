import { BASE_URL } from "./config";

// Actions
const GET_PROPERTIES = "properties/SEARCH_PROPERTIES";
const GET_PROPERTY = "properties/GET_PROPERTY";
const ADD_PROPERTY = "properties/ADD_PROPERTY";
const EDIT_PROPERTY = "properties/EDIT_PROPERTY";
const DELETE_PROPERTY = "properties/DELETE_PROPERTY";
const GET_USER_PROPERTIES = "properties/GET_USER_PROPERTIES";

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

const getUserProperties = (properties) => ({
    type: GET_USER_PROPERTIES,
    properties,
});

// Thunks
export const searchProperties = (term) => async (dispatch) => {
    const response = await fetch(`${BASE_URL}/api/search/${term}`);
    if (response.ok) {
        const data = await response.json();
        dispatch(getProperties(data.properties));
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

export const areaProperties = (payload) => async (dispatch) => {
    const response = await fetch(`${BASE_URL}/api/search/areas`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    });
    if (response.ok) {
        const data = await response.json();
        dispatch(getProperties(data.properties));
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

export const getThisProperty = (property_id) => async (dispatch) => {
    const response = await fetch(`${BASE_URL}/api/properties/${property_id}`);
    if (response.ok) {
        const data = await response.json();
        dispatch(getProperty(data.property));
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

export const fetchUserProperties = (userId) => async (dispatch) => {
    const response = await fetch(`${BASE_URL}/api/properties/user/${userId}`);
    if (response.ok) {
        const data = await response.json();
        dispatch(getUserProperties(data.properties));
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

export const createProperty = (property) => async (dispatch) => {
    const response = await fetch(`${BASE_URL}/api/properties/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(property),
    });
    const data = await response.json();
    if (response.ok) {
        dispatch(addProperty(data.property));
        return data;
    } else {
        if (data.errors) {
            return data;
        } else {
            return { errors: ["An error occurred. Please try again."] };
        }
    }
};

export const updateProperty = (property) => async (dispatch) => {
    const response = await fetch(`${BASE_URL}/api/properties/${property.id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(property),
    });
    const data = await response.json();
    if (response.ok) {
        dispatch(editProperty(data.property));
        return data;
    } else {
        if (data.errors) {
            return data;
        } else {
            return { errors: ["An error occurred. Please try again."] };
        }
    }
};

export const removeProperty = (propertyId) => async (dispatch) => {
    const response = await fetch(`${BASE_URL}/api/properties/${propertyId}`, {
        method: "DELETE",
    });
    if (response.ok) {
        dispatch(deleteProperty(propertyId));
        return { message: "Property deleted successfully" };
    } else {
        const data = await response.json();
        if (data.errors) {
            return data;
        } else {
            return { errors: ["An error occurred. Please try again."] };
        }
    }
};

// Reducer
const initialState = { properties: null, userProperties: null };

export default function reducer(state = initialState, action) {
    let newState;
    switch (action.type) {
        case GET_PROPERTIES:
            newState = { ...state, properties: {} };
            action.properties.forEach((property) => {
                newState.properties[property.id] = property;
            });
            return newState;
        case GET_PROPERTY:
            newState = JSON.parse(JSON.stringify(state));
            newState.properties[action.property.id] = action.property;
            return newState;
        case GET_USER_PROPERTIES:
            newState = { ...state, userProperties: {} };
            action.properties.forEach((property) => {
                newState.userProperties[property.id] = property;
            });
            return newState;
        case ADD_PROPERTY:
            newState = {
                ...state,
                properties: state.properties ? [...state.properties, action.property] : [action.property],
            };
            return newState;
        case EDIT_PROPERTY:
            newState = {
                ...state,
                properties: state.properties ? state.properties.map((property) =>
                    property.id === action.property.id ? action.property : property
                ) : [action.property],
            };
            return newState;
        case DELETE_PROPERTY:
            newState = {
                ...state,
                properties: state.properties ? state.properties.filter((property) => property.id !== action.propertyId) : [],
            };
            return newState;
        default:
            return state;
    }
}