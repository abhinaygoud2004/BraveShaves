// BarberReducer.js

import { BarberTypes } from "../types";

const initialState = {
  barberData: null,
  selectedBarber: null,
  loading: false,
  error: null,
};

const barberReducer = (state = initialState, action) => {
  switch (action.type) {
    case BarberTypes.ACTION.GET_BARBER_REQUEST:
    case BarberTypes.ACTION.GET_SINGLE_BARBER_REQUEST:
      return { ...state, loading: true, error: null };
    case BarberTypes.ACTION.GET_BARBER_SUCCESS:
      return { ...state, loading: false, barberData: action.payload };

    case BarberTypes.ACTION.GET_SINGLE_BARBER_SUCCESS:
      return { ...state, loading: false, selectedBarber: action.payload };
    case BarberTypes.ACTION.GET_BARBER_FAILURE:
    case BarberTypes.ACTION.GET_SINGLE_BARBER_FAILURE:
      return {
        ...state,
        loading: false,
        barberData: null,
        error: action.payload,
      };
    // Add more barber-related actions and cases here if needed

    default:
      return state;
  }
};

export default barberReducer;
