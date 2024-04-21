import { configureStore } from '@reduxjs/toolkit';

import modalReducer from './modalSclice';
import userReducer from './userSlice';
import sliderReducer from './sliderSlice';

const store = configureStore({
  reducer: {
    modalState: modalReducer,
    userState: userReducer,
    sliderState: sliderReducer,
  },
});

export default store;
