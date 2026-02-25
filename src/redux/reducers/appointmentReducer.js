// redux/appointments/appointmentReducer.js

import {AppointmentTypes} from "../types";

const initialState = {
  appointments: [],
  createdAppointmentId: null,
  loading: false,
  error: null,
};

const appointmentReducer = (state = initialState, action) => {
  switch (action.type) {

    // ==============================
    // REQUEST CASES
    // ==============================
    case AppointmentTypes.ACTION.CREATE_APPOINTMENT_REQUEST:
    case AppointmentTypes.ACTION.GET_USER_APPOINTMENTS_REQUEST:
    case AppointmentTypes.ACTION.GET_BARBER_APPOINTMENTS_REQUEST:
    case AppointmentTypes.ACTION.CANCEL_APPOINTMENT_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };

    // ==============================
    // CREATE SUCCESS
    // ==============================
    case AppointmentTypes.ACTION.CREATE_APPOINTMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        createdAppointmentId: action.payload.appointmentId,
      };

    // ==============================
    // FETCH SUCCESS
    // ==============================
    case AppointmentTypes.ACTION.GET_USER_APPOINTMENTS_SUCCESS:
    case AppointmentTypes.ACTION.GET_BARBER_APPOINTMENTS_SUCCESS:
      return {
        ...state,
        loading: false,
        appointments: action.payload,
      };

    // ==============================
    // CANCEL SUCCESS
    // ==============================
    case AppointmentTypes.ACTION.CANCEL_APPOINTMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        appointments: state.appointments.filter(
          (appointment) => appointment._id !== action.payload
        ),
      };

    // ==============================
    // FAILURE CASES
    // ==============================
    case AppointmentTypes.ACTION.CREATE_APPOINTMENT_FAILURE:
    case AppointmentTypes.ACTION.GET_USER_APPOINTMENTS_FAILURE:
    case AppointmentTypes.ACTION.GET_BARBER_APPOINTMENTS_FAILURE:
    case AppointmentTypes.ACTION.CANCEL_APPOINTMENT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default appointmentReducer;