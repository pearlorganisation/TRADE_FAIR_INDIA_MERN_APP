import { createSlice, current } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

import {
  addNewEvent,
  deleteEvent,
  fetchEventList,
  updateEventDetails,
} from "../actions/eventAction";

// ----------------------------------------------------------------------------------------------------

const initialState = {
  isLoading: false,
  isSuccess: false,
  errorMessage: "",
  eventsList: [],
};

export const eventSlice = createSlice({
  name: "event",
  initialState,
  reducers: {
    clearReduxStoreData: (state) => {},
  },
  extraReducers: (builder) => {
    builder
      // Fetch Events List Cases
      .addCase(fetchEventList.pending, (state, action) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.errorMessage = "";
      })
      .addCase(fetchEventList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.errorMessage = "";
        state.eventsList = action.payload;
      })
      .addCase(fetchEventList.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.errorMessage = action.payload;
      })
      // Add New Event Cases
      .addCase(addNewEvent.pending, (state, action) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.errorMessage = "";
      })
      .addCase(addNewEvent.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.errorMessage = "";
        state.eventsList = action.payload;
        toast.success("Event Added successfully", {
          position: "top-right",
        });
      })
      .addCase(addNewEvent.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.errorMessage = action.payload;
        toast.error(state?.errorMessage, {
          position: "top-right",
        });
      })

      // Update Shop Details Cases
      .addCase(updateEventDetails.pending, (state, action) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.errorMessage = "";
      })
      .addCase(updateEventDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.errorMessage = "";
        state.eventsList = action.payload;

        toast.success("Event details updated successfully", {
          position: "top-right",
        });
      })
      .addCase(updateEventDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.errorMessage = action.payload;
        toast.error(state?.errorMessage, {
          position: "top-right",
        });
      })

      //   Delete Shop Cases
      .addCase(deleteEvent.pending, (state, action) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.errorMessage = "";
      })
      .addCase(deleteEvent.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.errorMessage = "";
        const filterData = current(state.eventsList).filter(
          (item) => item._id != action.payload.id
        );
        state.eventsList = filterData;
        toast.success("Event deleted successfully", {
          position: "top-right",
        });
      })
      .addCase(deleteEvent.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.errorMessage = action.payload;
        toast.error(state?.errorMessage, {
          position: "top-right",
        });
      });
  },
});

// -------------------------------------------------------------------------

// Action creators are generated for each case reducer function
export const { clearReduxStoreData } = eventSlice.actions;
export default eventSlice.reducer;

// ================================================== THE END ==================================================
