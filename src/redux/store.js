import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import rootReducer from './reducers';

const middleware = process.env.NODE_ENV === 'development'
  ? getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    })
  : getDefaultMiddleware();

const store = configureStore({
  reducer: rootReducer,
  middleware,
});

export default store;