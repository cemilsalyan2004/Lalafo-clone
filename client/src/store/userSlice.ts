import { createSlice } from '@reduxjs/toolkit';

export interface initialUserState {
  _id?: string;
  userName?: string;
  email?: string;
  createdAt?: Date;
  image?: string;
}

const initialState: initialUserState = {};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addUser: (state, action) => {
      state._id = action.payload._id;
      state.userName = action.payload.userName;
      state.email = action.payload.email;
      state.createdAt = action.payload.createdAt;
      state.image = action.payload.image;
    },
  },
});

export const { addUser } = userSlice.actions;
export default userSlice.reducer;
