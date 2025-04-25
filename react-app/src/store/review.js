import axios from "axios"; // Import axios
import { BASE_URL } from "./config";

// Actions
const GET_REVIEWS = "reviews/GET_REVIEWS";
const ADD_EDIT_REVIEW = "reviews/ADD_EDIT_REVIEW";
const DELETE_REVIEW = "reviews/DELETE_REVIEW";

// Action Creators
const getReviews = (reviews) => ({
    type: GET_REVIEWS,
    reviews,
});

const addEditReview = (review) => ({
    type: ADD_EDIT_REVIEW,
    review,
});

const deleteReview = (reviewId) => ({
    type: DELETE_REVIEW,
    reviewId,
});

// Thunks
export const getAllReviews = (agentId) => async (dispatch) => {
    try {
        const response = await axios.get(`${BASE_URL}/api/agents/${agentId}/reviews`);
        if (response.status === 200) {
            dispatch(getReviews(response.data.reviews));
            return response.data;
        }
    } catch (error) {
        if (error.response && error.response.status < 500) {
            return error.response.data;
        }
        return { errors: ["Something went wrong. Please try again"] };
    }
};

export const addReview = (review) => async (dispatch) => {
    try {
        const response = await axios.post(`${BASE_URL}/api/reviews/`, review, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (response.status === 200) {
            dispatch(addEditReview(response.data.review));
            return response.data.review;
        }
    } catch (error) {
        if (error.response && error.response.status < 500) {
            return error.response.data;
        }
        return { errors: ["Something went wrong. Please try again"] };
    }
};

export const editReview = (review) => async (dispatch) => {
    try {
        const response = await axios.put(`${BASE_URL}/api/reviews/${review.id}`, review, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (response.status === 200) {
            dispatch(addEditReview(response.data.review));
            return response.data.review;
        }
    } catch (error) {
        if (error.response && error.response.status < 500) {
            return error.response.data;
        }
        return { errors: ["Something went wrong. Please try again"] };
    }
};

export const deleteThisReview = (reviewId) => async (dispatch) => {
    try {
        const response = await axios.delete(`${BASE_URL}/api/reviews/${reviewId}`);
        if (response.status === 200) {
            dispatch(deleteReview(reviewId));
            return;
        }
    } catch (error) {
        if (error.response && error.response.status < 500) {
            return error.response.data;
        }
        return { errors: ["Something went wrong. Please try again"] };
    }
};

// Reducers
const initialState = { reviews: null };
export default function reducer(state = initialState, action) {
    let newState;
    switch (action.type) {
        case GET_REVIEWS:
            newState = {};
            action.reviews.forEach((review) => {
                newState[review.id] = review;
            });
            return newState;
        case ADD_EDIT_REVIEW:
            newState = JSON.parse(JSON.stringify(state));
            newState[action.review.id] = action.review;
            return newState;
        case DELETE_REVIEW:
            newState = JSON.parse(JSON.stringify(state));
            delete newState[action.reviewId];
            return newState;
        default:
            return state;
    }
}