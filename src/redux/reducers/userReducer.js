// userReducer.js
import { UserTypes } from "../types";

const initialState = {
  userData: null,
  loading: false,
  error: null,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case UserTypes.ACTION.GET_USER_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case UserTypes.ACTION.GET_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        userData: action.payload,
        error: null,
      };
    case UserTypes.ACTION.GET_USER_FAILURE:
      return {
        ...state,
        loading: false,
        userData: null,
        error: action.payload,
      };
    // Add more user-related actions and cases here if needed

    default:
      return state;
  }
};

export default userReducer;
