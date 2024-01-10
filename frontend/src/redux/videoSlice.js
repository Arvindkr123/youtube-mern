import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentVideo: null,
  loading: false,
  error: false,
};

const videoSlice = createSlice({
  name: "video",
  initialState: initialState,
  reducers: {
    fetchStartVideo: (state) => {
      state.loading = true;
    },
    fetchSuccessVideo: (state, action) => {
      state.loading = false;
      state.currentVideo = action.payload;
    },
    fetchFailVideo: (state) => {
      state.error = true;
      state.loading = false;
    },
    likeVideo: (state, action) => {
      if (!state.currentVideo.likes.includes(action.payload)) {
        // if you have not like then like the video
        state.currentVideo.likes.push(action.payload);
        // and remove the id from dislike
        state.currentVideo.dislikes.splice(
          state.currentVideo.dislikes.findIndex(
            (userId) => userId === action.payload
          ),
          1
        );
      }
    },
    dislikeVideo: (state, action) => {
      if (!state.currentVideo.dislikes.includes(action.payload)) {
        // then dislike the video
        state.currentVideo.dislikes.push(action.payload);
        // or remove the id from likes array
        state.currentVideo.likes.splice(
          state.currentVideo.likes.findIndex(
            (userId) => userId === action.payload
          ),
          1
        );
      }
    },
  },
});

export const {
  fetchStartVideo,
  fetchSuccessVideo,
  fetchFailVideo,
  likeVideo,
  dislikeVideo,
} = videoSlice.actions;
export default videoSlice.reducer;
