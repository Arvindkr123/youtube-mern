import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  current_user: null,
  loading: false,
  error: false,
};

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.current_user = action.payload;
    },
    loginFail: (state) => {
      state.loading = false;
      state.error = true;
    },
    logout: (state) => {
      state.current_user = null;
      state.loading = false;
      state.error = false;
    },
  },
});

export const { loginStart, loginSuccess, loginFail, logout } =
  userSlice.actions;
export default userSlice.reducer;
