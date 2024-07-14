import { configureStore } from "@reduxjs/toolkit";
// import searchReducer from "./Slices/searchSlice";
// import cardFilmSliceReducer from "./Slices/cardFilmSlice";
// import favouritesReducer from "./Slices/favouritesSlice";

export const store = configureStore({
  reducer: {
  //   search: searchReducer,
  //   card: cardFilmSliceReducer,
  //   favourites: favouritesReducer,
  },
});
