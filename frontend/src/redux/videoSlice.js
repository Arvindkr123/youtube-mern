import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  error: false,
};

const videoSlice = createSlice({
  name: "video",
  initialState,
  reducers: {
    
  }
});

export const {} = videoSlice.actions;
export default videoSlice.reducer;
