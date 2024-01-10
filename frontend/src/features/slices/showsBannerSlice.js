// ----------------------------------------------------------------------------------------------------

import { createSlice } from "@reduxjs/toolkit";
import { fetchShowsBanner } from "../actions/showsBannerAction";

const initialState = {
  isLoading: false,
  isSuccess: false,
  showsBannerData: [],
  errorMessage: "",
};

// ---------------------------------------------------------------------------------------

export const showsBannerSlice = createSlice({
  name: "showsBanner",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch faq List Cases
      .addCase(fetchShowsBanner.pending, (state, action) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.errorMessage = "";
      })
      .addCase(fetchShowsBanner.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.errorMessage = "";
        state.showsBannerData = action.payload.data;
      })
      .addCase(fetchShowsBanner.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.errorMessage = action.payload;
      });
  },
});

// -------------------------------------------------------------------------

// Action creators are generated for each case reducer function
export const {} = showsBannerSlice.actions;
export default showsBannerSlice.reducer;

// ================================================== THE END ==================================================
