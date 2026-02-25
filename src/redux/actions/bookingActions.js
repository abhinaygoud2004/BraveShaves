import api from '../../api/axios';
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
export const bookAppointment = (bookingData, userId) => {
  return async (dispatch) => {
    dispatch(bookAppointmentRequest());

    try {
      await api.post(`/appointments/`, bookingData);

      dispatch(bookAppointmentSuccess());

      await dispatch(fetchAppointments(userId));

      return true;  // 👈 important

    } catch (error) {
      dispatch(bookAppointmentFailure(error.message));
      return false;
    }
  };
};

export const fetchAppointments = (userId) => {
  return async (dispatch) => {
    dispatch(fetchAppointmentsRequest());
    try {
      const response = await api.get(`/appointments/user`);
      dispatch(fetchAppointmentsSuccess(response.data));
    } catch (error) {
      dispatch(fetchAppointmentsFailure(error.message));
    }
  };
};
