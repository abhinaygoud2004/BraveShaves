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
    case BookingTypes.ACTION.BOOK_APPOINTMENT_REQUEST:
    case BookingTypes.ACTION.FETCH_APPOINTMENTS_REQUEST:
      return { ...state, bookingLoading: true, appointmentsLoading: true, bookingError: null, appointmentsError: null };
    case BookingTypes.ACTION.BOOK_APPOINTMENT_SUCCESS:
      return { ...state, bookingLoading: false, bookingError: null };
    case BookingTypes.ACTION.BOOK_APPOINTMENT_FAILURE:
      return { ...state, bookingLoading: false, bookingError: action.payload };
    case BookingTypes.ACTION.FETCH_APPOINTMENTS_SUCCESS:
      return { ...state, appointmentsLoading: false, appointments: action.payload, appointmentsError: null };
    case BookingTypes.ACTION.FETCH_APPOINTMENTS_FAILURE:
      return { ...state, appointmentsLoading: false, appointmentsError: action.payload };
    default:
      return state;
  }
};

export default bookingReducer;
