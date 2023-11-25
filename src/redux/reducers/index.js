import { combineReducers } from 'redux';
import authReducer from './authReducer';
import userReducer from './userReducer';
import bookingReducer from './bookingReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  booking:bookingReducer
});

export default rootReducer;