import { BASE_URL } from "./config";

// Actions
const GET_REVIEWS = "reviews/GET_REVIEWS";
const ADD_EDIT_REVIEW = "reviews/ADD_EDIT_REVIEW";
const DELETE_REVIEW = "reviews/DELETE_REVIEW";

// Action Creator
const getReviews = (reviews) => {
	return {
		type: GET_REVIEWS,
		reviews,
	};
};

const addEditReview = (review) => {
	return {
		type: ADD_EDIT_REVIEW,
		review,
	};
};

const deleteReview = (reviewId) => {
	return {
		type: DELETE_REVIEW,
		reviewId,
	};
};

// Thunks
export const getAllReviews = (agentId) => async (dispatch) => {
	const response = await fetch(`${BASE_URL}/api/agents/${agentId}/reviews`);
	const data = await response.json();
	if (response.ok) {
		if (data.errors) {
			return data;
		}
		dispatch(getReviews(data.reviews));
		return data.review;
	} else if (response.status < 500) {
		return data;
	} else {
		return { errors: ["Something went wrong. Please try again"] };
	}
};

export const addReview = (review) => async (dispatch) => {
	const response = await fetch(`${BASE_URL}/api/reviews/`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(review),
	});
	const data = await response.json();
	if (response.ok) {
		if (data.errors) {
			return data;
		}
		dispatch(addEditReview(data.review));
		return data.review;
	} else if (response.status < 500) {
		return data;
	} else {
		return { errors: ["Something went wrong. Please try again"] };
	}
};

export const editReview = (review) => async (dispatch) => {
	const response = await fetch(`${BASE_URL}/api/reviews/${review.id}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(review),
	});
	const data = await response.json();
	if (response.ok) {
		if (data.errors) {
			return data;
		}
		dispatch(addEditReview(data.review));
		return data.review;
	} else if (response.status < 500) {
		return data;
	} else {
		return { errors: ["Something went wrong. Please try again"] };
	}
};

export const deleteThisReview = (reviewId) => async (dispatch) => {
	const response = await fetch(`${BASE_URL}/api/reviews/${reviewId}`, {
		method: "DELETE",
	});
	if (response.ok) {
		const data = await response.json();
		if (data.errors) {
			return data;
		}
		dispatch(deleteReview(reviewId));
		return;
	} else {
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
