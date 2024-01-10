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
    subscription: (state, action) => {
      if (state.current_user.others.subscribedUsers.includes(action.payload)) {
        state.current_user.others.subscribedUsers.splice(
          state.current_user.others.subscribedUsers.findIndex(
            (userId) => userId === action.payload
          ),
          1
        );
      } else {
        state.current_user.others.subscribedUsers.push(action.payload);
      }
    },
  },
});

export const { loginStart, loginSuccess, loginFail, logout, subscription } =
  userSlice.actions;
export default userSlice.reducer;
