import { configureStore } from "@reduxjs/toolkit";
import adminReducer from "./Slices/AdminSlice";
import authReducer from "./Slices/authSlice";
// import favouritesReducer from "./Slices/favouritesSlice";

export const store = configureStore({
  reducer: {
    admin: adminReducer,
    auth: authReducer,
  //   favourites: favouritesReducer,
  },
});
