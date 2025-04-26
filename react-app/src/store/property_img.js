import axios from "axios"; // Import axios
import { BASE_URL } from "./config";

// Actions
const GET_IMAGES = "property_imgs/GET_IMAGES";

// Action Creators
const getImages = (images) => {
    return {
        type: GET_IMAGES,
        images,
    };
};

// Thunks
export const getAllImages = (propertyId) => async (dispatch) => {
    try {
        const response = await axios.get(
            `${BASE_URL}/api/properties/${propertyId}/images`,
            {
                withCredentials: true, // Include credentials (cookies)
            }
        );
        if (response.status === 200) {
            dispatch(getImages(response.data.images));
            return response.data;
        }
    } catch (error) {
        if (error.response && error.response.status < 500) {
            return error.response.data;
        }
        return { errors: ["An error occurred. Please try again."] };
    }
};

// Reducer
const initialState = { images: null };

export default function reducer(state = initialState, action) {
    let newState;
    switch (action.type) {
        case GET_IMAGES:
            newState = {};
            action.images.forEach((image) => {
                newState[image.id] = image;
            });
            return newState;
        default:
            return state;
    }
}