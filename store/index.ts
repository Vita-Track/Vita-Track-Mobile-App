import { configureStore } from "@reduxjs/toolkit";
import doctorReducer from "./doctor-store";
import dataReducer from "./data";
const store = configureStore({
  reducer: {
    doctor: doctorReducer,
    data: dataReducer,
  },
});

export default store;
