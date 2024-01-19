import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import {
  createEventBanner,
  deleteBanner,
  fetchEventBanner,
  updateBanner,
  updateEventBanner,
} from "../actions/eventBannerAction";

const initialState = {
  isLoading: false,
  isSuccess: false,
  isBannerUpdated: false,
  errorMessage: "",
  deleteData: false,
  isDeleted: false,
  isBannerCreationSuccess: false,
  eventBannerList: [],
};

export const EventBannerSlice = createSlice({
  name: "eventBanner",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch event banner
      .addCase(fetchEventBanner.pending, (state, action) => {
        state.isLoading = true;
        state.isBannerUpdated = false;
        state.isBannerCreationSuccess = false;
        state.isSuccess = false;
        state.errorMessage = "";
        state.isDeleted = false;
      })
      .addCase(fetchEventBanner.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isBannerUpdated = false;
        state.isSuccess = true;
        state.isBannerCreationSuccess = false;
        state.errorMessage = "";
        state.isDeleted = false;
        state.eventBannerList = action.payload;
      })
      .addCase(fetchEventBanner.rejected, (state, action) => {
        state.isLoading = false;
        state.isBannerUpdated = false;
        state.isBannerCreationSuccess = false;
        state.isSuccess = false;
        state.isDeleted = false;
        state.errorMessage = action?.payload;
      })
      // Create event banner List Cases
      .addCase(createEventBanner.pending, (state, action) => {
        state.isLoading = true;
        state.isBannerUpdated = false;
        state.isSuccess = false;
        state.errorMessage = "";
      })
      .addCase(createEventBanner.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isBannerUpdated = false;
        state.isSuccess = true;
        state.isBannerCreationSuccess = true;
        state.errorMessage = "";
        toast.success("Event banner created successfully", {
          position: "top-right",
        });
      })
      .addCase(createEventBanner.rejected, (state, action) => {
        state.isLoading = false;
        state.isBannerUpdated = false;
        state.isBannerCreationSuccess = false;
        state.isSuccess = false;
        state.errorMessage = action.payload;
        toast.error(state?.errorMessage, {
          position: "top-right",
        });
      })
      // Update event banner Details Cases
      .addCase(updateEventBanner.pending, (state, action) => {
        state.isLoading = true;
        state.isBannerUpdated = false;
        state.isBannerCreationSuccess = false;
        state.isSuccess = false;
        state.errorMessage = "";
      })
      .addCase(updateEventBanner.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isBannerUpdated = true;
        state.isBannerCreationSuccess = false;
        state.isSuccess = true;
        state.errorMessage = "";
        toast.success("Event banner updated successfully", {
          position: "top-right",
        });
      })
      .addCase(updateEventBanner.rejected, (state, action) => {
        state.isLoading = false;
        state.isBannerUpdated = false;
        state.isBannerCreationSuccess = false;
        state.isSuccess = false;
        state.errorMessage = action.payload;
        toast.error(state?.errorMessage, {
          position: "top-right",
        });
      })
      // Delete event banner Cases
      .addCase(deleteBanner.pending, (state, action) => {
        state.isLoading = true;
        state.isBannerUpdated = false;
        state.isBannerCreationSuccess = false;
        state.isSuccess = false;
        state.errorMessage = "";
      })
      .addCase(deleteBanner.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isBannerUpdated = false;
        state.isBannerCreationSuccess = false;
        state.isSuccess = true;
        state.errorMessage = "";

        // Removing event banner details  From redux's store
        state.eventBannerList = state.eventBannerList.filter(
          (eventBanner) => eventBanner._id !== action?.payload?.payload
        );

        toast.success("Event banner deleted successfully", {
          position: "top-right",
        });
      })
      .addCase(deleteBanner.rejected, (state, action) => {
        state.isLoading = false;
        state.isBannerUpdated = false;
        state.isSuccess = false;
        state.isBannerCreationSuccess = false;
        state.errorMessage = action.payload;
        toast.error(state?.errorMessage, {
          position: "top-right",
        });
      });
  },
});

export const {} = EventBannerSlice.actions;
export default EventBannerSlice.reducer;
