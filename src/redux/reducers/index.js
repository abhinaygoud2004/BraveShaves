import { combineReducers } from 'redux';
import authReducer from './authReducer';
import userReducer from './userReducer';
import bookingReducer from './bookingReducer';
import barberReducer from './barberReducer'
import shopReducer from './shopReducer'
import serviceReducer from './serviceReducer'
import appointmentReducer from './appointmentReducer'

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  booking:bookingReducer,
  barber:barberReducer,
  shop:shopReducer,
  service:serviceReducer,
  appointment:appointmentReducer,
});

export default rootReducer;