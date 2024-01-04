import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import {
  createBanner,
  deleteBanner,
  fetchBanner,
  updateBanner,
} from "../actions/clientHomeBanner";

const initialState = {
  isLoading: false,
  isSuccess: false,
  errorMessage: "",
  deleteData: false,
  isDeleted: false,
  isBannerCreationSuccess: false,
  clientBannerList: [],
};

export const clientBannerSlice = createSlice({
  name: "clientBanner",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch client sub banner
      .addCase(fetchBanner.pending, (state, action) => {
        state.isLoading = true;
        state.isBannerCreationSuccess = false;
        state.isSuccess = false;
        state.errorMessage = "";
        state.isDeleted = false;
      })
      .addCase(fetchBanner.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isBannerCreationSuccess = false;
        state.errorMessage = "";
        state.isDeleted = false;
        state.clientBannerList = action.payload;
      })
      .addCase(fetchBanner.rejected, (state, action) => {
        state.isLoading = false;
        state.isBannerCreationSuccess = false;
        state.isSuccess = false;
        state.isDeleted = false;
        state.errorMessage = action?.payload;
      })
      // Create sub banner List Cases
      .addCase(createBanner.pending, (state, action) => {
        state.isLoading = true;
        // state.deleteDataisBannerCreationSuccess = false;
        state.isSuccess = false;
        state.errorMessage = "";
      })
      .addCase(createBanner.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isBannerCreationSuccess = true;
        state.errorMessage = "";
        toast.success("Sub banner created successfully", {
          position: "top-right",
        });
      })
      .addCase(createBanner.rejected, (state, action) => {
        state.isLoading = false;
        state.isBannerCreationSuccess = false;
        state.isSuccess = false;
        state.errorMessage = action.payload;
        toast.error(state?.errorMessage, {
          position: "top-right",
        });
      })
      // Update client sub banner Details Cases
      .addCase(updateBanner.pending, (state, action) => {
        state.isLoading = true;
        state.isBannerCreationSuccess = false;
        state.isSuccess = false;
        state.errorMessage = "";
      })
      .addCase(updateBanner.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isBannerCreationSuccess = false;
        state.isSuccess = true;
        state.errorMessage = "";
        toast.success("Sub banner updated successfully", {
          position: "top-right",
        });
      })
      .addCase(updateBanner.rejected, (state, action) => {
        state.isLoading = false;
        state.isBannerCreationSuccess = false;
        state.isSuccess = false;
        state.errorMessage = action.payload;
        toast.error(state?.errorMessage, {
          position: "top-right",
        });
      })
      // Delete Role Cases
      .addCase(deleteBanner.pending, (state, action) => {
        state.isLoading = true;
        state.isBannerCreationSuccess = false;
        state.isSuccess = false;
        state.errorMessage = "";
      })
      .addCase(deleteBanner.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isBannerCreationSuccess = false;
        state.isSuccess = true;
        state.errorMessage = "";

        // Removing sub banner details  From redux's store
        state.clientBannerList = state.clientBannerList.filter(
          (subBanner) => subBanner._id !== action?.payload?.payload
        );

        toast.success("Sub banner deleted successfully", {
          position: "top-right",
        });
      })
      .addCase(deleteBanner.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isBannerCreationSuccess = false;
        state.errorMessage = action.payload;
        toast.error(state?.errorMessage, {
          position: "top-right",
        });
      });
  },
});

export const {} = clientBannerSlice.actions;
export default clientBannerSlice.reducer;
