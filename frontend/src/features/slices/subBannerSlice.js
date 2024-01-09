// ----------------------------------------------------------------------------------------------------

import { createSlice } from "@reduxjs/toolkit";
import { fetchFaqList } from "../actions/faqActions";
import { fetchSubBanner } from "../actions/subBannerActions";

const initialState = {
  isLoading: false,
  isSuccess: false,
  subBannerData: [],
  errorMessage: "",
};

// ---------------------------------------------------------------------------------------

export const subBanner = createSlice({
  name: "subBanner",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch faq List Cases
      .addCase(fetchSubBanner.pending, (state, action) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.errorMessage = "";
      })
      .addCase(fetchSubBanner.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.errorMessage = "";
        state.subBannerData = action.payload.data;
      })
      .addCase(fetchSubBanner.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.errorMessage = action.payload;
      });
  },
});

// -------------------------------------------------------------------------

// Action creators are generated for each case reducer function
export const {} = subBanner.actions;
export default subBanner.reducer;

// ================================================== THE END ==================================================
