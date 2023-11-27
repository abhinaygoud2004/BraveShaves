// BarberReducer.js

import { BarberTypes } from "../types";

const initialState = {
  barberData: null,
  loading: false,
  error: null,
};

const barberReducer = (state = initialState, action) => {
  switch (action.type) {
    case BarberTypes.ACTION.GET_BARBER_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case BarberTypes.ACTION.GET_BARBER_SUCCESS:
      return {
        ...state,
        loading: false,
        barberData: action.payload,
        error: null,
      };
    case BarberTypes.ACTION.GET_BARBER_FAILURE:
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
