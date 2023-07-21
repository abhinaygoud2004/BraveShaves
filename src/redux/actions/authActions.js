import axios from 'axios';
import {AuthTypes} from '../types'

// Action creators
export const setIsLogin = (isLogin) => ({
  type: AuthTypes.ACTION.SET_IS_LOGIN,
  payload: isLogin,
});


export const loginRequest = () => ({
  type: AuthTypes.ACTION.LOGIN_REQUEST,
});

export const loginSuccess = (user) => ({
  type: AuthTypes.ACTION.LOGIN_SUCCESS,
  payload: user,
});

export const loginFailure = (error) => ({
  type: AuthTypes.ACTION.LOGIN_FAILURE,
  payload: error,
});

export const signupRequest = () => ({
  type: AuthTypes.ACTION.SIGNUP_REQUEST,
});

export const signupSuccess = (user) => ({
  type: AuthTypes.ACTION.SIGNUP_SUCCESS,
  payload: user,
});

export const signupFailure = (error) => ({
  type: AuthTypes.ACTION.SIGNUP_FAILURE,
  payload: error,
});

// Async action creators
export const login = (credentials) => {
  return async (dispatch) => {
    dispatch(loginRequest());

    try {
      const response = await axios.post('http://localhost:4000/user-api/login', credentials);
      const user = response.data;
      if(response.data.message==="success"){
        dispatch(setIsLogin(true))
        dispatch(loginSuccess(user));
        localStorage.setItem("token",response.data.token)
      }
    } catch (error) {
      dispatch(loginFailure(error.message));
    }
  };
};

export const signup = (userData) => {
  return async (dispatch) => {
    dispatch(signupRequest());

    try {
      const response = await axios.post('http://localhost:4000/user-api/register', userData,{
        headers: {
          'Content-Type': 'application/json', // Set the content type to JSON
        },});
      // dispatch(signupSuccess(userData));
     
    } catch (error) {
      dispatch(signupFailure(error.message));
    }
  };
};
