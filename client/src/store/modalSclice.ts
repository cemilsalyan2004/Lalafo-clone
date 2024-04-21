import { createSlice } from '@reduxjs/toolkit';

const modalSlice = createSlice({
  name: 'modal',
  initialState: { modal: false },
  reducers: {
    displayModal: (state) => {
      state.modal = true;
    },
    closeModal: (state) => {
      state.modal = false;
    },
  },
});

export const { displayModal, closeModal } = modalSlice.actions;
export default modalSlice.reducer;
