import api from "../../api/axios";
import {AuthTypes} from '../types'

// Action creators
export const setIsLogin = (isLogin) => ({
  type: AuthTypes.ACTION.SET_IS_LOGIN,
  payload: isLogin,
});


export const loginRequest = () => ({
  type: AuthTypes.ACTION.LOGIN_REQUEST,
});

export const loginSuccess = (userId) => ({
  type: AuthTypes.ACTION.LOGIN_SUCCESS,
  payload: userId,
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
      const response = await api.post('/user-api/login', credentials);

      if (response.data.message === "success") {
        dispatch(setIsLogin(true));
        dispatch(loginSuccess(response.data.userId));

        localStorage.setItem("token", response.data.token);
        localStorage.setItem("userId", response.data.userId);
      } else {
        dispatch(loginFailure(response.data.message));
      }

    } catch (error) {
      // Axios error handling
      if (error.response) {
        // Backend sent error response
        console.error("Login API Error:", error.response.data);
        console.error("Status Code:", error.response.status);

        dispatch(loginFailure(error.response.data.message || "Login failed"));
      } else if (error.request) {
        // Request sent but no response
        console.error("No response from server:", error.request);
        dispatch(loginFailure("Server not responding"));
      } else {
        // Something else went wrong
        console.error("Unexpected Error:", error.message);
        dispatch(loginFailure(error.message));
      }
    }
  };
};


export const signup = (userData) => {
  return async (dispatch) => {
    dispatch(signupRequest());

    try {
      const response = await api.post('/user-api/register', userData,{
        headers: {
          'Content-Type': 'application/json', // Set the content type to JSON
        },});
      // dispatch(signupSuccess(userData));
     
    } catch (error) {
      dispatch(signupFailure(error.message));
    }
  };
};
