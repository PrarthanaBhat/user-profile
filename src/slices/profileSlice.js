// src/slices/profileSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  step: 0,
  isSubmitted: false,
  basicInfo: {},
  workExperience: {},
  education: {},
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    updateBasicInfo: (state, action) => {
      state.basicInfo = action.payload;
    },
    updateWorkExperience: (state, action) => {
      state.workExperience = action.payload;
    },
    updateEducation: (state, action) => {
      state.education = action.payload;
    },
    nextStep: (state) => {
      state.step += 1;
    },
    prevStep: (state) => {
      state.step -= 1;
    },
    resetProfile: () => initialState,

     setSubmitted: (state) => {
      state.isSubmitted = true;
    },
  },
});

export const {
  updateBasicInfo,
  updateWorkExperience,
  updateEducation,
  nextStep,
  prevStep,
  resetProfile,
  setSubmitted,
} = profileSlice.actions;

export default profileSlice.reducer;
