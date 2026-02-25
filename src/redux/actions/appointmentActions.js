// redux/appointments/appointmentActions.js

import {AppointmentTypes} from "../types";
import api from "../../api/axios";



// ==============================
// 🔹 CREATE APPOINTMENT
// ==============================
export const createAppointment = (data) => async (dispatch, getState) => {
  try {
    dispatch({ type: AppointmentTypes.ACTION.CREATE_APPOINTMENT_REQUEST });

    const response = await api.post(
      '/appointments/',
      data
    );

    dispatch({
      type: AppointmentTypes.ACTION.CREATE_APPOINTMENT_SUCCESS,
      payload: response.data,
    });

  } catch (error) {
    dispatch({
      type: AppointmentTypes.ACTION.CREATE_APPOINTMENT_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
  }
};


// ==============================
// 🔹 GET USER APPOINTMENTS
// ==============================
export const getUserAppointments = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: AppointmentTypes.ACTION.GET_USER_APPOINTMENTS_REQUEST,
    });

    const response = await api.get(
      `/appointments/user`,
    );

    dispatch({
      type: AppointmentTypes.ACTION.GET_USER_APPOINTMENTS_SUCCESS,
      payload: response.data,
    });

  } catch (error) {
    dispatch({
      type: AppointmentTypes.ACTION.GET_USER_APPOINTMENTS_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
  }
};


// ==============================
// 🔹 GET BARBER APPOINTMENTS
// ==============================
export const getBarberAppointments = (barberId) => async (dispatch) => {
  try {
    dispatch({
      type: AppointmentTypes.ACTION.GET_BARBER_APPOINTMENTS_REQUEST,
    });

    const response = await api.get(
      `/appointments/barber/${barberId}`
    );

    dispatch({
      type: AppointmentTypes.ACTION.GET_BARBER_APPOINTMENTS_SUCCESS,
      payload: response.data,
    });

  } catch (error) {
    dispatch({
      type: AppointmentTypes.ACTION.GET_BARBER_APPOINTMENTS_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
  }
};


// ==============================
// 🔹 CANCEL APPOINTMENT
// ==============================
export const cancelAppointment = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: AppointmentTypes.ACTION.CANCEL_APPOINTMENT_REQUEST,
    });

    await api.delete(
      `/appointments/${id}`
    );

    dispatch({
      type: AppointmentTypes.ACTION.CANCEL_APPOINTMENT_SUCCESS,
      payload: id,
    });

  } catch (error) {
    dispatch({
      type: AppointmentTypes.ACTION.CANCEL_APPOINTMENT_FAILURE,
      payload: error.response?.data?.message || error.message,
    });
  }
};