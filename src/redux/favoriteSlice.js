import { createSlice } from "@reduxjs/toolkit";

const favoriteSlice = createSlice({
  name: "favorites",
  initialState: {
    items: [],
  },
  reducers: {
    addFavorite: (state, action) => {
      const exists = state.items.find((m) => m.id === action.payload.id);
      if (!exists) state.items.push(action.payload);
    },
    removeFavorite: (state, action) => {
      state.items = state.items.filter((movie) => movie.id !== action.payload);
    },
  },
});

export const { addFavorite, removeFavorite } = favoriteSlice.actions;
export default favoriteSlice.reducer;
