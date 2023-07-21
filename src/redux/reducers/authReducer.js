import { AuthTypes } from "../types";

const initialState = {
  user: null,
  isLogin: false, 
  isLoading: false,
  error: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case AuthTypes.ACTION.LOGIN_REQUEST:
    case AuthTypes.ACTION.SIGNUP_REQUEST:
      return {
        ...state,
        isLoading: true,
        error: null,
      };
    case AuthTypes.ACTION.LOGIN_SUCCESS:
    case AuthTypes.ACTION.SIGNUP_SUCCESS:
      return {
        ...state,
        isLoading: false,
        user: action.payload,
        isLogin: true, // Update isLogin to true upon successful login
        error: null,
      };
    case AuthTypes.ACTION.LOGIN_FAILURE:
    case AuthTypes.ACTION.SIGNUP_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
      case AuthTypes.ACTION.SET_IS_LOGIN:
      return {
        ...state,
        isLogin: action.payload,
      };
    default:
      return state;
  }
};

export default authReducer;
