import {configureStore} from '@reduxjs/toolkit';
import guestSlice from './guestSlice';

export const store = configureStore({
  reducer: {
    guest: guestSlice,
  },
});
