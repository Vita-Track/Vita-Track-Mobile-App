import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: Doctor = {
  firstName: "",
  lastName: "",
  gender: "",
  dateOfBirth: "",
  email: "",
  phoneNumber: "",
  specialization: "",
  qualification: "",
  experienceYears: "",
  licenseNumber: "",
  clinicLocation: "",
};
const doctorSlice = createSlice({
  name: "doctor",
  initialState,
  reducers: {
    setDoctor: (state, action: PayloadAction<Doctor>) => {
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.gender = action.payload.gender;
      state.dateOfBirth = action.payload.dateOfBirth;
      state.email = action.payload.email;
      state.phoneNumber = action.payload.phoneNumber;
      state.specialization = action.payload.specialization;
      state.qualification = action.payload.qualification;
      state.experienceYears = action.payload.experienceYears;
      state.licenseNumber = action.payload.licenseNumber;
      state.clinicLocation = action.payload.clinicLocation;
    },
  },
});

export const { setDoctor } = doctorSlice.actions;
export default doctorSlice.reducer;
