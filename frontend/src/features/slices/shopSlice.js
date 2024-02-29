// ----------------------------------------------------------------------------------------------------

import { createSlice } from "@reduxjs/toolkit";
import { fetchEventList } from "../actions/eventActions";
import { fetchVenue } from "../actions/venueAction";
import { fetchShopByUniqueKey } from "../actions/shopAction";

const initialState = {
  isLoading: false,
  isSuccess: false,
  shopData: [],
  errorMessage: "",
};

// ---------------------------------------------------------------------------------------

export const shopSlice = createSlice({
  name: "shop",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch shop
      .addCase(fetchShopByUniqueKey.pending, (state, action) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.errorMessage = "";
      })
      .addCase(fetchShopByUniqueKey.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.errorMessage = "";
        state.shopData = action?.payload;
      })
      .addCase(fetchShopByUniqueKey.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.errorMessage = action.payload;
      });
  },
});

// -------------------------------------------------------------------------

// Action creators are generated for each case reducer function
export const {} = shopSlice.actions;
export default shopSlice.reducer;

// ================================================== THE END ==================================================
