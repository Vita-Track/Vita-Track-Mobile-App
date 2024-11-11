import { configureStore } from "@reduxjs/toolkit";
import doctorReducer from "./doctor-store";
const store = configureStore({
  reducer: {
    doctor: doctorReducer,
  },
});

export default store;
