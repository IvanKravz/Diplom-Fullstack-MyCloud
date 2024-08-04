import { configureStore } from "@reduxjs/toolkit";
import adminReducer from "./Slices/AdminSlice";
import authReducer from "./Slices/authSlice";
import fileReducer from "./Slices/FileSlice";

export const store = configureStore({
  reducer: {
    admin: adminReducer,
    auth: authReducer,
    file: fileReducer,
  },
});
