// ----------------------------------------------------------------------------------------------------

import { createSlice } from "@reduxjs/toolkit";
import { fetchFaqList } from "../actions/faqActions";

const initialState = {
  isLoading: false,
  isSuccess: false,
  faqData: [],
  errorMessage: "",
};

// ---------------------------------------------------------------------------------------

export const faqSlice = createSlice({
  name: "faq",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch faq List Cases
      .addCase(fetchFaqList.pending, (state, action) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.errorMessage = "";
      })
      .addCase(fetchFaqList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.errorMessage = "";
        state.faqData = action.payload.data;
      })
      .addCase(fetchFaqList.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.errorMessage = action.payload;
      });
  },
});

// -------------------------------------------------------------------------

// Action creators are generated for each case reducer function
export const {} = faqSlice.actions;
export default faqSlice.reducer;

// ================================================== THE END ==================================================
