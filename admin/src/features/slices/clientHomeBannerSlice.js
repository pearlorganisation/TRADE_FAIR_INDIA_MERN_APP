import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import {
  createHomeBanner,
  deleteHomeBanner,
  fetchHomeBanner,
  updateHomeBanner,
} from "../actions/clientHomeBanner";

const initialState = {
  isLoading: false,
  isSuccess: false,
  errorMessage: "",
  deleteData: false,
  isHomeBannerUpdated: false,
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
      .addCase(fetchHomeBanner.pending, (state, action) => {
        state.isLoading = true;
        state.isBannerCreationSuccess = false;
        state.isHomeBannerUpdated = false;
        state.isSuccess = false;
        state.errorMessage = "";
        state.isDeleted = false;
      })
      .addCase(fetchHomeBanner.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isBannerCreationSuccess = false;
        state.errorMessage = "";
        state.isDeleted = false;
        state.clientBannerList = action.payload;
      })
      .addCase(fetchHomeBanner.rejected, (state, action) => {
        state.isLoading = false;
        state.isBannerCreationSuccess = false;
        state.isSuccess = false;
        state.isDeleted = false;
        state.errorMessage = action?.payload;
        toast.error(action?.payload, { position: "top-center" });
      })
      // Create sub banner List Cases
      .addCase(createHomeBanner.pending, (state, action) => {
        state.isLoading = true;
        // state.deleteDataisBannerCreationSuccess = false;
        state.isSuccess = false;
        state.errorMessage = "";
      })
      .addCase(createHomeBanner.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isBannerCreationSuccess = true;
        state.errorMessage = "";
        toast.success("Banner created successfully", {
          position: "top-right",
        });
      })
      .addCase(createHomeBanner.rejected, (state, action) => {
        state.isLoading = false;
        state.isBannerCreationSuccess = false;
        state.isSuccess = false;
        state.errorMessage = action.payload;
        toast.error(state?.errorMessage, {
          position: "top-right",
        });
      })
      // Update client banner Details Cases
      .addCase(updateHomeBanner.pending, (state, action) => {
        state.isLoading = true;
        state.isBannerCreationSuccess = false;
        state.isSuccess = false;
        state.errorMessage = "";
      })
      .addCase(updateHomeBanner.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isBannerCreationSuccess = false;
        state.isSuccess = true;
        state.errorMessage = "";
        state.isHomeBannerUpdated = true;
        toast.success("Banner updated successfully", {
          position: "top-right",
        });
      })
      .addCase(updateHomeBanner.rejected, (state, action) => {
        state.isLoading = false;
        state.isBannerCreationSuccess = false;
        state.isSuccess = false;
        state.errorMessage = action.payload;
        toast.error(state?.errorMessage, {
          position: "top-right",
        });
      })
      // Delete Role Cases
      .addCase(deleteHomeBanner.pending, (state, action) => {
        state.isLoading = true;
        state.isBannerCreationSuccess = false;
        state.isSuccess = false;
        state.errorMessage = "";
      })
      .addCase(deleteHomeBanner.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isBannerCreationSuccess = false;
        state.isSuccess = true;
        state.errorMessage = "";

        // Removing  banner details  From redux's store
        state.clientBannerList = state.clientBannerList.filter(
          (banner) => banner._id !== action?.payload?.payload
        );

        toast.success("Banner deleted successfully0", {
          position: "top-right",
        });
      })
      .addCase(deleteHomeBanner.rejected, (state, action) => {
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
