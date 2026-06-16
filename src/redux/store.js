import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import favoriteReducer from "./favoriteSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    favorites: favoriteReducer,
  },
});

export default store;