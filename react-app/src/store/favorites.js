import axios from "axios"; // Import axios
import { BASE_URL } from "./config";

// Actions
const GET_FAVORITES = "favorites/GET_FAVORITES";
const ADD_FAVORITE = "favorites/ADD_FAVORITE";
const REMOVE_FAVORITE = "favorites/REMOVE_FAVORITE";

// Action Creators
export const getFavorites = (favorites) => ({
    type: GET_FAVORITES,
    favorites,
});

export const addFavorite = (propertyId) => ({
    type: ADD_FAVORITE,
    propertyId,
});

export const removeFavorite = (propertyId) => ({
    type: REMOVE_FAVORITE,
    propertyId,
});

// Thunks
export const fetchFavorites = () => async (dispatch) => {
    try {
        const response = await axios.get(`${BASE_URL}/api/favorites/`, {
            withCredentials: true, // Include credentials (cookies)
        });
        if (response.status === 200) {
            dispatch(getFavorites(response.data.favorites));
        }
    } catch (error) {
        console.error("Error fetching favorites:", error);
    }
};

export const addFavoriteProperty = (propertyId) => async (dispatch) => {
    try {
        const response = await axios.post(
            `${BASE_URL}/api/favorites/${propertyId}`,
            {},
            {
                withCredentials: true, // Include credentials (cookies)
            }
        );
        if (response.status === 200) {
            dispatch(addFavorite(propertyId));
        }
    } catch (error) {
        console.error("Error adding favorite:", error);
    }
};

export const removeFavoriteProperty = (propertyId) => async (dispatch) => {
    try {
        const response = await axios.delete(`${BASE_URL}/api/favorites/${propertyId}`, {
            withCredentials: true, // Include credentials (cookies)
        });
        if (response.status === 200) {
            dispatch(removeFavorite(propertyId));
        }
    } catch (error) {
        console.error("Error removing favorite:", error);
    }
};

// Initial State
const initialState = {
    favorites: [],
};

// Reducer
export default function favoritesReducer(state = initialState, action) {
    switch (action.type) {
        case GET_FAVORITES:
            return { ...state, favorites: action.favorites };
        case ADD_FAVORITE:
            return { ...state, favorites: [...state.favorites, action.propertyId] };
        case REMOVE_FAVORITE:
            return {
                ...state,
                favorites: state.favorites.filter((id) => id !== action.propertyId),
            };
        default:
            return state;
    }
}