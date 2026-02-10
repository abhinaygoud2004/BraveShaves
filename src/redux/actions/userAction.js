import {UserTypes} from '../types'
import api from '../../api/axios';

// Action creators
export const getUserRequest = () => ({
  type: UserTypes.ACTION.GET_USER_REQUEST,
});

export const getUserSuccess = (user) => ({
  type: UserTypes.ACTION.GET_USER_SUCCESS,
  payload: user,
});

export const getUserFailure = (error) => ({
  type: UserTypes.ACTION.GET_USER_FAILURE,
  payload: error,
});

// Async action creator to fetch user data by userId
export const getUserData = (userId) => {
  return async (dispatch) => {
    dispatch(getUserRequest());

    try {
      const response = await api.get(`/user-api/user/${userId}`);
      const user = response.data; // Assuming your API returns user data
      dispatch(getUserSuccess(user));
    } catch (error) {
      dispatch(getUserFailure(error.message));
    }
  };
};
