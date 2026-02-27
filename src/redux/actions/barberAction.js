// BarberActions.js

import { BarberTypes } from '../types';
import api from '../../api/axios';

// Action creators
export const getBarberRequest = () => ({
  type: BarberTypes.ACTION.GET_BARBER_REQUEST,
});

export const getBarberSuccess = (barber) => ({
  type: BarberTypes.ACTION.GET_BARBER_SUCCESS,
  payload: barber,
});

export const getSingleBarberSuccess = (barber) => ({
  type: BarberTypes.ACTION.GET_SINGLE_BARBER_SUCCESS,
  payload: barber, // single barber object
});

export const getBarberFailure = (error) => ({
  type: BarberTypes.ACTION.GET_BARBER_FAILURE,
  payload: error,
});

// Async action creator to fetch barber data by barberId
export const getBarberById = (barberId) => {
  return async (dispatch) => {
    dispatch(getBarberRequest());

    try {
      const response = await api.get(`/barbers/${barberId}`);
      const barber = response.data; // Assuming your API returns barber data
      dispatch(getSingleBarberSuccess(barber));
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
      const response = await api.get('/barbers/');
      const barbers = response.data; 
      dispatch(getBarberSuccess(barbers));
    } catch (error) {
      dispatch(getBarberFailure(error.message));
    }
  };
};
