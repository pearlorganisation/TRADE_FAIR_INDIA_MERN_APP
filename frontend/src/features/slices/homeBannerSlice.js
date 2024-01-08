// ----------------------------------------------------------------------------------------------------

import { createSlice } from "@reduxjs/toolkit";
import { fetchFaqList } from "../actions/faqActions";
import { fetchHomeBanner } from "../actions/homeBannerActions";

const initialState = {
  isLoading: false,
  isSuccess: false,
  homeBannerData: [],
  errorMessage: "",
};

// ---------------------------------------------------------------------------------------

export const homeBannerSlice = createSlice({
  name: "homeBanner",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchHomeBanner.pending, (state, action) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.errorMessage = "";
      })
      .addCase(fetchHomeBanner.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.errorMessage = "";
        state.homeBannerData = action.payload.data;
      })
      .addCase(fetchHomeBanner.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.errorMessage = action.payload;
      });
  },
});

// -------------------------------------------------------------------------

// Action creators are generated for each case reducer function
export const {} = homeBannerSlice.actions;
export default homeBannerSlice.reducer;

// ================================================== THE END ==================================================
