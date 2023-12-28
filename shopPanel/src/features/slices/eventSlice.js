import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { getEventByUniqueKey } from "../actions/eventAction";

const initialState = {
  isLoading: false,
  eventData: null,
  errorMessage: "",
  error: false,
};

const eventSlice = createSlice({
  name: "event",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getEventByUniqueKey.pending, (state, action) => {
        state.isLoading = true;
        state.eventData = null;
        state.errorMessage = "";
        state.error = false;
      })
      .addCase(getEventByUniqueKey.fulfilled, (state, action) => {
        state.isLoading = false;
        console.log(action.payload)
        state.eventData = action.payload;
        state.errorMessage = "";
      })
      .addCase(getEventByUniqueKey.rejected, (state, action) => {
        state.isLoading = false;
        state.eventData = null;
        state.error = true;
        toast.error(action?.payload,{position:'top-center'})
        state.errorMessage = action.payload;
      })

    
  },
});

export default eventSlice.reducer;
