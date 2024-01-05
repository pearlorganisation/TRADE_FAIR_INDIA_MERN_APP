import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import {
  createEventCategory,
  deleteEventCategory,
  fetchEventCategory,
  updateEventCategory,
} from "../actions/eventCategory";

// ----------------------------------------------------------------------------------------------------

const initialState = {
  isLoading: false,
  isEventCategoryCreated: false,
  isSuccess: false,
  errorMessage: "",
  eventCategoryList: [],
};

export const eventCategorySlice = createSlice({
  name: "eventCategory",
  initialState,
  reducers: {
    clearReduxStoreData: (state) => {},
  },
  extraReducers: (builder) => {
    builder
      // Fetch Event  List Cases
      .addCase(fetchEventCategory.pending, (state, action) => {
        state.isLoading = true;
        state.isEventCategoryCreated = false;
        state.isSuccess = false;
        state.errorMessage = "";
      })
      .addCase(fetchEventCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isEventCategoryCreated = false;
        state.isSuccess = true;
        state.errorMessage = "";
        state.eventCategoryList = action.payload;
      })
      .addCase(fetchEventCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isEventCategoryCreated = false;
        state.isSuccess = false;
        state.errorMessage = action.payload;
      })
      // Create event category List Cases
      .addCase(createEventCategory.pending, (state, action) => {
        state.isLoading = true;
        state.isEventCategoryCreated = false;
        state.isSuccess = false;
        state.errorMessage = "";
      })
      .addCase(createEventCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isEventCategoryCreated = true;
        state.isSuccess = true;
        state.errorMessage = "";
        toast.success("Event category created successfully", {
          position: "top-right",
        });
      })
      .addCase(createEventCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isEventCategoryCreated = false;
        state.isSuccess = false;
        state.errorMessage = action.payload;
        toast.error(state?.errorMessage, {
          position: "top-right",
        });
      })

      // Update event ctegory  Details Cases
      .addCase(updateEventCategory.pending, (state, action) => {
        state.isLoading = true;
        state.isEventCategoryCreated = false;
        state.isSuccess = false;
        state.errorMessage = "";
      })
      .addCase(updateEventCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isEventCategoryCreated = false;
        state.isSuccess = true;
        state.errorMessage = "";
        toast.success("Event category updated successfully", {
          position: "top-right",
        });
      })
      .addCase(updateEventCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isEventCategoryCreated = false;
        state.isSuccess = false;
        state.errorMessage = action.payload;
        toast.error(state?.errorMessage, {
          position: "top-right",
        });
      })

      // Delete event category Cases
      .addCase(deleteEventCategory.pending, (state, action) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isEventCategoryCreated = false;
        state.errorMessage = "";
      })
      .addCase(deleteEventCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isEventCategoryCreated = false;
        state.isSuccess = true;
        state.errorMessage = "";

        // Removing event category From redux's store
        state.eventCategoryList = state.eventCategoryList.filter(
          (eventCategory) => eventCategory._id !== action?.payload?.payload
        );

        toast.success("Event category deleted successfully", {
          position: "top-right",
        });
      })
      .addCase(deleteEventCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isEventCategoryCreated = false;
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
export const { clearReduxStoreData } = eventCategorySlice.actions;
export default eventCategorySlice.reducer;

// ================================================== THE END ==================================================
