import axios from "axios"; // Import axios
import { BASE_URL } from "./config";

// Actions
const GET_APPOINTMENTS = "appointments/GET_APPOINTMENTS";
const ADD_EDIT_APPOINTMENT = "appointments/ADD_EDIT_APPOINTMENT";
const DELETE_APPOINTMENT = "appointments/DELETE_APPOINTMENT";

// Action Creators
const getAppointments = (appointments) => {
    return {
        type: GET_APPOINTMENTS,
        appointments,
    };
};

const addEditAppointment = (appointment) => {
    return {
        type: ADD_EDIT_APPOINTMENT,
        appointment,
    };
};

const deleteAppointment = (appointmentId) => {
    return {
        type: DELETE_APPOINTMENT,
        appointmentId,
    };
};

// Thunks
export const getAllAppointments = () => async (dispatch) => {
    try {
        const response = await axios.get(`${BASE_URL}/api/appointments/`, {
            withCredentials: true, // Include credentials (cookies)
        });
        dispatch(getAppointments(response.data.appointments));
        return response.data;
    } catch (error) {
        if (error.response && error.response.status < 500) {
            return error.response.data;
        }
        return { errors: ["Something went wrong. Please try again"] };
    }
};

export const addAppointment = (appointment) => async (dispatch) => {
    try {
        const response = await axios.post(`${BASE_URL}/api/appointments/`, appointment, {
            headers: {
                "Content-Type": "application/json",
            },
            withCredentials: true, // Include credentials (cookies)
        });
        if (response.data.errors) {
            return response.data;
        }
        dispatch(addEditAppointment(response.data.appointment));
        return response.data.appointment;
    } catch (error) {
        if (error.response && error.response.status < 500) {
            return error.response.data;
        }
        return { errors: ["Something went wrong. Please try again"] };
    }
};

export const editAppointment = (appointment) => async (dispatch) => {
    try {
        const response = await axios.put(
            `${BASE_URL}/api/appointments/${appointment.id}`,
            appointment,
            {
                headers: {
                    "Content-Type": "application/json",
                },
                withCredentials: true, // Include credentials (cookies)
            }
        );
        if (response.data.errors) {
            return response.data;
        }
        dispatch(addEditAppointment(response.data.appointment));
        return response.data;
    } catch (error) {
        if (error.response && error.response.status < 500) {
            return error.response.data;
        }
        return { errors: ["Something went wrong. Please try again"] };
    }
};

export const deleteThisAppointment = (appointmentId) => async (dispatch) => {
    try {
        const response = await axios.delete(`${BASE_URL}/api/appointments/${appointmentId}`, {
            withCredentials: true, // Include credentials (cookies)
        });
        if (response.data.errors) {
            return response.data;
        }
        dispatch(deleteAppointment(appointmentId));
        return response.data;
    } catch (error) {
        if (error.response && error.response.status < 500) {
            return error.response.data;
        }
        return { errors: ["Something went wrong. Please try again"] };
    }
};

// Reducers
const initialState = { appointments: null };

export default function reducer(state = initialState, action) {
    let newState;
    switch (action.type) {
        case GET_APPOINTMENTS:
            newState = {};
            action.appointments.forEach((appt) => {
                newState[appt.id] = appt;
            });
            return newState;
        case ADD_EDIT_APPOINTMENT:
            newState = JSON.parse(JSON.stringify(state));
            newState[action.appointment.id] = action.appointment;
            return newState;
        case DELETE_APPOINTMENT:
            newState = JSON.parse(JSON.stringify(state));
            delete newState[action.appointmentId];
            return newState;
        default:
            return state;
    }
}