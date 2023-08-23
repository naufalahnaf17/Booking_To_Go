import {createSlice} from '@reduxjs/toolkit';

export const guestSlice = createSlice({
  name: 'guest',
  initialState: [],
  reducers: {
    addGuest: (state, action) => {
      const {id, panggilan, nama} = action.payload;
      state.push({id, panggilan, nama});
    },
    deleteGuest: (state,action) => {
      state.length = 0
    }
  },
});

export const {addGuest,deleteGuest} = guestSlice.actions;
export default guestSlice.reducer;
