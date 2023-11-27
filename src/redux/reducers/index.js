import { combineReducers } from 'redux';
import authReducer from './authReducer';
import userReducer from './userReducer';
import bookingReducer from './bookingReducer';
import barberReducer from './barberReducer'

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  booking:bookingReducer,
  barber:barberReducer
});

export default rootReducer;