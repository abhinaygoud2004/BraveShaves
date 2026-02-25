import { BookingTypes } from '../types';

const initialState = {
  bookingLoading: false,
  bookingError: null,
  appointmentsLoading: false,
  appointments: [],
  appointmentsError: null,
};

const bookingReducer = (state = initialState, action) => {
  switch (action.type) {

    // 🔹 Booking
    case BookingTypes.ACTION.BOOK_APPOINTMENT_REQUEST:
      return {
        ...state,
        bookingLoading: true,
        bookingError: null,
      };

    case BookingTypes.ACTION.BOOK_APPOINTMENT_SUCCESS:
      return {
        ...state,
        bookingLoading: false,
        bookingError: null,

        // 🔥 Add new appointment immediately
        appointments: [
          action.payload,
          ...state.appointments,
        ],
      };

    case BookingTypes.ACTION.BOOK_APPOINTMENT_FAILURE:
      return {
        ...state,
        bookingLoading: false,
        bookingError: action.payload,
      };

    // 🔹 Fetch Appointments
    case BookingTypes.ACTION.FETCH_APPOINTMENTS_REQUEST:
      return {
        ...state,
        appointmentsLoading: true,
        appointmentsError: null,
      };

    case BookingTypes.ACTION.FETCH_APPOINTMENTS_SUCCESS:
      return {
        ...state,
        appointmentsLoading: false,
        appointments: action.payload,
        appointmentsError: null,
      };

    case BookingTypes.ACTION.FETCH_APPOINTMENTS_FAILURE:
      return {
        ...state,
        appointmentsLoading: false,
        appointmentsError: action.payload,
      };

    default:
      return state;
  }
};

export default bookingReducer;