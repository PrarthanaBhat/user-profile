import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  step: 0,
  isSubmitted: false,
  basicInfo: {},
  workExperience: {},
  education: [],
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    updateBasicInfo: (state, action) => {
      state.basicInfo = { ...state.basicInfo, ...action.payload };
    },
    updateWorkExperience: (state, action) => {
      state.workExperience = { ...state.workExperience, ...action.payload };
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
  setSubmitted,
} = profileSlice.actions;

export default profileSlice.reducer;
