import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  doctors: [],
  patients: [],
  appointments: [],
};

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    setDoctors: (state, action: PayloadAction<[]>) => {
      state.doctors = action.payload;
      //   console.log("all doctors state", state.doctors);
    },
    setPatients: (state, action: PayloadAction<[]>) => {
      state.patients = action.payload;
      //   console.log("all patients state", state.patients);
    },
    setAppointments: (state, action: PayloadAction<[]>) => {
      state.appointments = action.payload;
    },
  },
});

export const { setDoctors, setPatients, setAppointments } = dataSlice.actions;
export default dataSlice.reducer;
