import { createSlice } from "@reduxjs/toolkit";
import { State } from "country-state-city";
// ---------------------------------------------------------------------------------------

const initialState = {
  isLoading: false,
  isSuccess: false,
  errorMessage: "",
  country: "IN",
  statesList: [],
};
// ---------------------------------------------------------------------------------------

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    fetchStateBasedOnCountry: (state) => {
      state.statesList = State.getStatesOfCountry("IN");
    },
  },
});
// ---------------------------------------------------------------------------------------

export const { fetchStateBasedOnCountry } = globalSlice.actions;
export default globalSlice.reducer;

// ================================================== THE END ==================================================
