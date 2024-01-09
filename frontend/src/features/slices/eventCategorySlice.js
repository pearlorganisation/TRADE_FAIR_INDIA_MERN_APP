// ----------------------------------------------------------------------------------------------------

import { createSlice } from "@reduxjs/toolkit";
import { fetchFaqList } from "../actions/faqActions";
import { fetchEventList } from "../actions/eventActions";
import { fetchEventCategoryList } from "../actions/eventCategoryAction";

const initialState = {
  isLoading: false,
  isSuccess: false,
  eventCategory: [],
  errorMessage: "",
};

// ---------------------------------------------------------------------------------------

export const eventCategorySlice = createSlice({
  name: "event",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch faq List Cases
      .addCase(fetchEventCategoryList.pending, (state, action) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.errorMessage = "";
      })
      .addCase(fetchEventCategoryList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.errorMessage = "";
        state.eventCategory = action.payload.data;
      })
      .addCase(fetchEventCategoryList.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.errorMessage = action.payload;
      });
  },
});

// -------------------------------------------------------------------------

// Action creators are generated for each case reducer function
export const {} = eventCategorySlice.actions;
export default eventCategorySlice.reducer;

// ================================================== THE END ==================================================
