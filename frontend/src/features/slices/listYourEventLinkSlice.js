// ----------------------------------------------------------------------------------------------------

import { createSlice } from "@reduxjs/toolkit";
import { fetchListYourLink } from "../actions/listYourEventLinkAction";

const initialState = {
  isLoading: false,
  isSuccess: false,
  listYourLink: [],
  errorMessage: "",
};

// ---------------------------------------------------------------------------------------

export const listYourEventSlice = createSlice({
  name: "listYourEventLink",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch faq List Cases
      .addCase(fetchListYourLink.pending, (state, action) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.errorMessage = "";
      })
      .addCase(fetchListYourLink.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.errorMessage = "";
        state.listYourLink = action.payload;
      })
      .addCase(fetchListYourLink.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.errorMessage = action.payload;
      });
  },
});

// -------------------------------------------------------------------------

// Action creators are generated for each case reducer function
export const {} = listYourEventSlice.actions;
export default listYourEventSlice.reducer;

// ================================================== THE END ==================================================
