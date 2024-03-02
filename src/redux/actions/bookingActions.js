import axios from 'axios';
import { BookingTypes } from '../types';

// Action Creators
export const bookAppointmentRequest = () => ({
  type: BookingTypes.ACTION.BOOK_APPOINTMENT_REQUEST,
});

export const bookAppointmentSuccess = () => ({
  type: BookingTypes.ACTION.BOOK_APPOINTMENT_SUCCESS,
});

export const bookAppointmentFailure = (error) => ({
  type: BookingTypes.ACTION.BOOK_APPOINTMENT_FAILURE,
  payload: error,
});

export const fetchAppointmentsRequest = () => ({
  type: BookingTypes.ACTION.FETCH_APPOINTMENTS_REQUEST,
});

export const fetchAppointmentsSuccess = (appointments) => ({
  type: BookingTypes.ACTION.FETCH_APPOINTMENTS_SUCCESS,
  payload: appointments,
});

export const fetchAppointmentsFailure = (error) => ({
  type: BookingTypes.ACTION.FETCH_APPOINTMENTS_FAILURE,
  payload: error,
});

// Async Action Creators
export const bookAppointment = (userId,barberId, selectedTime,selectedServices) => {
  return async (dispatch) => {
    dispatch(bookAppointmentRequest());
    try {
      // Perform the booking request to your backend API
      await axios.post(`/appointment-api/book-appointment/${userId}`, { barberId, selectedTime ,selectedServices});
      dispatch(bookAppointmentSuccess());
      dispatch(fetchAppointments(userId)); // After booking, fetch updated appointments
    } catch (error) {
      dispatch(bookAppointmentFailure(error.message));
    }
  };
};

export const fetchAppointments = (userId) => {
  return async (dispatch) => {
    dispatch(fetchAppointmentsRequest());
    try {
      const response = await axios.get(`/appointment-api/fetch-appointments/${userId}`);
      dispatch(fetchAppointmentsSuccess(response.data.payload));
    } catch (error) {
      dispatch(fetchAppointmentsFailure(error.message));
    }
  };
};
