import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import {
  createSubBanner,
  deleteSubBanner,
  fetchSubBanner,
  updateSubBanner,
} from "../actions/clientSubBanner";

const initialState = {
  isLoading: false,
  isSuccess: false,
  errorMessage: "",
  isSubBannerUpdated: false,
  deleteData: false,
  isDeleted: false,
  isSubBannerCreationSuccess: false,
  clientSubBannerList: [],
};

export const clientSubBannerSlice = createSlice({
  name: "clientSubBanner",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch client sub banner
      .addCase(fetchSubBanner.pending, (state, action) => {
        state.isLoading = true;
        state.isSubBannerCreationSuccess = false;
        state.isSuccess = false;
        state.errorMessage = "";
        state.isDeleted = false;
      })
      .addCase(fetchSubBanner.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isSubBannerCreationSuccess = false;
        state.errorMessage = "";
        state.isDeleted = false;

        state.clientSubBannerList = action.payload;
      })
      .addCase(fetchSubBanner.rejected, (state, action) => {
        state.isLoading = false;
        state.isSubBannerCreationSuccess = false;
        state.isSuccess = false;
        state.isDeleted = false;
        state.errorMessage = action?.payload;
      })
      // Create sub banner List Cases
      .addCase(createSubBanner.pending, (state, action) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.errorMessage = "";
      })
      .addCase(createSubBanner.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isSubBannerCreationSuccess = true;
        state.errorMessage = "";
        toast.success("Sub banner created successfully", {
          position: "top-right",
        });
      })
      .addCase(createSubBanner.rejected, (state, action) => {
        state.isLoading = false;
        state.isSubBannerCreationSuccess = false;
        state.isSuccess = false;
        state.errorMessage = action.payload;
        toast.error(state?.errorMessage, {
          position: "top-right",
        });
      })
      // Update client sub banner Details Cases
      .addCase(updateSubBanner.pending, (state, action) => {
        state.isLoading = true;
        state.isSubBannerCreationSuccess = false;
        state.isSubBannerUpdated = false;
        state.isSuccess = false;
        state.errorMessage = "";
      })
      .addCase(updateSubBanner.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSubBannerCreationSuccess = false;
        state.isSuccess = true;
        state.errorMessage = "";
        state.clientSubBannerList = action.payload;
        state.isSubBannerUpdated = true;
        toast.success("Sub banner updated successfully", {
          position: "top-right",
        });
      })
      .addCase(updateSubBanner.rejected, (state, action) => {
        state.isLoading = false;
        state.isSubBannerCreationSuccess = false;
        state.isSuccess = false;
        state.errorMessage = action.payload;
        toast.error(state?.errorMessage, {
          position: "top-right",
        });
      })
      // Delete Role Cases
      .addCase(deleteSubBanner.pending, (state, action) => {
        state.isLoading = true;
        state.isSubBannerCreationSuccess = false;
        state.isSuccess = false;
        state.errorMessage = "";
      })
      .addCase(deleteSubBanner.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSubBannerCreationSuccess = false;
        state.isSuccess = true;
        state.errorMessage = "";

        // Removing sub banner details  From redux's store
        state.clientSubBannerList = state.clientSubBannerList.filter(
          (subBanner) => subBanner._id !== action?.payload?.payload
        );

        toast.success("Sub banner deleted successfully", {
          position: "top-right",
        });
      })
      .addCase(deleteSubBanner.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isSubBannerCreationSuccess = false;
        state.errorMessage = action.payload;
        toast.error(state?.errorMessage, {
          position: "top-right",
        });
      });
  },
});

export const {} = clientSubBannerSlice.actions;
export default clientSubBannerSlice.reducer;
