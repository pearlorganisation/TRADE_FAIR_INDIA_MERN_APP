// ----------------------------------------------------------------------------------------------------

import { createSlice } from "@reduxjs/toolkit";
import { fetchFaqList } from "../actions/faqActions";
import { fetchEventById, fetchEventList } from "../actions/eventActions";

const initialState = {
  isLoading: false,
  isSuccess: false,
  eventData: [],
  errorMessage: "",
};

// ---------------------------------------------------------------------------------------

export const eventsSlice = createSlice({
  name: "event",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch faq List Cases
      .addCase(fetchEventList.pending, (state, action) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.errorMessage = "";
      })
      .addCase(fetchEventList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.errorMessage = "";
        state.eventData = action.payload.data;
      })
      .addCase(fetchEventList.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.errorMessage = action.payload;
      })

  },
});

// -------------------------------------------------------------------------

// Action creators are generated for each case reducer function
export const {} = eventsSlice.actions;
export default eventsSlice.reducer;

// ================================================== THE END ==================================================
