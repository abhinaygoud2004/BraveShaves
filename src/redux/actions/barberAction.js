// BarberActions.js

import { BarberTypes } from '../types';
import axios from 'axios';

// Action creators
export const getBarberRequest = () => ({
  type: BarberTypes.ACTION.GET_BARBER_REQUEST,
});

export const getBarberSuccess = (barber) => ({
  type: BarberTypes.ACTION.GET_BARBER_SUCCESS,
  payload: barber.payload,
});

export const getBarberFailure = (error) => ({
  type: BarberTypes.ACTION.GET_BARBER_FAILURE,
  payload: error,
});

// Async action creator to fetch barber data by barberId
export const getBarberData = (barberId) => {
  return async (dispatch) => {
    dispatch(getBarberRequest());

    try {
      const response = await axios.get(`http://localhost:4000/barber-api/get-barber/${barberId}`);
      const barber = response.data; // Assuming your API returns barber data
      console.log(barber)
      dispatch(getBarberSuccess(barber));
    } catch (error) {
      dispatch(getBarberFailure(error.message));
    }
  };
};

// Async action creator to get all barbers
export const getAllBarbers = () => {
  return async (dispatch) => {
    dispatch(getBarberRequest());

    try {
      const response = await axios.get('http://localhost:4000/barber-api/get-allBarbers');
      const barbers = response.data; // Assuming your API returns an array of barbers
      dispatch(getBarberSuccess(barbers));
    } catch (error) {
      dispatch(getBarberFailure(error.message));
    }
  };
};
