import { createSlice } from "@reduxjs/toolkit";

// Persist user across page refresh using sessionStorage
const savedUser = (() => {
  try { return JSON.parse(sessionStorage.getItem("movieapp_user")); } catch { return null; }
})();

const authSlice = createSlice({
  name: "auth",
  initialState: { user: savedUser },
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
      sessionStorage.setItem("movieapp_user", JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.user = null;
      sessionStorage.removeItem("movieapp_user");
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
