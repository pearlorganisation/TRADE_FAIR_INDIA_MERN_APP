// ----------------------------------------------------------------------------------------------------

import { createSlice } from "@reduxjs/toolkit";
import { fetchEventList } from "../actions/eventActions";
import { fetchVenue } from "../actions/venueAction";

const initialState = {
  isLoading: false,
  isSuccess: false,
  venueData: [],
  errorMessage: "",
};

// ---------------------------------------------------------------------------------------

export const venueSlice = createSlice({
  name: "venue",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch venue
      .addCase(fetchVenue.pending, (state, action) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.errorMessage = "";
      })
      .addCase(fetchVenue.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.errorMessage = "";
        state.venueData = action?.payload?.data;
      })
      .addCase(fetchVenue.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.errorMessage = action.payload;
      });
  },
});

// -------------------------------------------------------------------------

// Action creators are generated for each case reducer function
export const {} = venueSlice.actions;
export default venueSlice.reducer;

// ================================================== THE END ==================================================
