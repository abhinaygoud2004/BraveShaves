import axios from 'axios';
const apiKey = process.env.REACT_APP_API_KEY;
const baseUrl = process.env.REACT_APP_BASE_URL;


// Action types
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export const SIGNUP_REQUEST = 'SIGNUP_REQUEST';
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
export const SIGNUP_FAILURE = 'SIGNUP_FAILURE';

export const SET_IS_LOGIN = 'SET_IS_LOGIN';


// Action creators
export const setIsLogin = (isLogin) => ({
  type: SET_IS_LOGIN,
  payload: isLogin,
});


export const loginRequest = () => ({
  type: LOGIN_REQUEST,
});

export const loginSuccess = (user) => ({
  type: LOGIN_SUCCESS,
  payload: user,
});

export const loginFailure = (error) => ({
  type: LOGIN_FAILURE,
  payload: error,
});

export const signupRequest = () => ({
  type: SIGNUP_REQUEST,
});

export const signupSuccess = (user) => ({
  type: SIGNUP_SUCCESS,
  payload: user,
});

export const signupFailure = (error) => ({
  type: SIGNUP_FAILURE,
  payload: error,
});

// Async action creators
export const login = (credentials) => {
  return async (dispatch) => {
    dispatch(loginRequest());

    try {
      const response = await axios.post('http://localhost:4000/users', credentials);
      const user = response.data;
      dispatch(loginSuccess(user));
      dispatch(setIsLogin(true))
    } catch (error) {
      dispatch(loginFailure(error.message));
      console.log(error)
    }
  };
};

export const signup = (userData) => {
  return async (dispatch) => {
    dispatch(signupRequest());

    try {
      const response = await axios.post('/api/signup', userData);
      const user = response.data;
      dispatch(signupSuccess(user));
    } catch (error) {
      dispatch(signupFailure(error.message));
    }
  };
};
