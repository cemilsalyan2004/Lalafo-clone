import { createSlice } from '@reduxjs/toolkit';

export interface initialSliderState {
  shown: boolean;
}

const initialState: initialSliderState = {
  shown: false,
};

const sliderSlice = createSlice({
  name: 'slider',
  initialState,
  reducers: {
    showSlider: (state) => {
      state.shown = true;
    },
    hideSlider: (state) => {
      state.shown = false;
    },
  },
});

export const { showSlider, hideSlider } = sliderSlice.actions;
export default sliderSlice.reducer;
