import { createSlice } from "@reduxjs/toolkit";
import {
  addNewShop,
  fetchShopsList,
  fetchIndividualShopDetails,
  updateShopDetails,
  deleteShop,
} from "../actions/shopActions";
import { toast } from "react-toastify";

// ---------------------------------------------------------------------------------------

const initialState = {
  isLoading: false,
  isSuccess: false,
  errorMessage: "",
  shopsList: [],
  totalPages: 1,
};

// ---------------------------------------------------------------------------------------

export const shopSlice = createSlice({
  name: "shop",
  initialState,
  reducers: {
    clearReduxStoreData: (state) => {},
  },
  extraReducers: (builder) => {
    builder
      // Fetch Shops List Cases
      .addCase(fetchShopsList.pending, (state, action) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.errorMessage = "";
      })
      .addCase(fetchShopsList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.errorMessage = "";
        state.shopsList = action.payload?.data;
        state.totalPages = action.payload?.totalPage;
      })
      .addCase(fetchShopsList.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.errorMessage = action.payload;
      })
      // Add New Shops Cases
      .addCase(addNewShop.pending, (state, action) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.errorMessage = "";
      })
      .addCase(addNewShop.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.errorMessage = "";
        toast.success("Shop Added successfully", {
          position: "top-right",
        });
      })
      .addCase(addNewShop.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.errorMessage = action.payload;
        toast.error(state?.errorMessage, {
          position: "top-right",
        });
      })

      // Update Shop Details Cases
      .addCase(updateShopDetails.pending, (state, action) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.errorMessage = "";
      })
      .addCase(updateShopDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.errorMessage = "";
        toast.success("Shop details updated successfully", {
          position: "top-right",
        });
      })
      .addCase(updateShopDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.errorMessage = action.payload;
        toast.error(state?.errorMessage, {
          position: "top-right",
        });
      })

      // Delete Shop Cases
      .addCase(deleteShop.pending, (state, action) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.errorMessage = "";
      })
      .addCase(deleteShop.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.errorMessage = "";

        // Removing Shop From redux's store
        state.shopsList = state.shopsList.filter(
          (shop) => shop._id !== action?.payload?.payload
        );

        toast.success("Shop deleted successfully", {
          position: "top-right",
        });
      })
      .addCase(deleteShop.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.errorMessage = action.payload;
        toast.error(state?.errorMessage, {
          position: "top-right",
        });
      })
      // Fetch Individual Shop Details Cases
      .addCase(fetchIndividualShopDetails.pending, (state, action) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.errorMessage = "";
      })
      .addCase(fetchIndividualShopDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.errorMessage = "";
        toast.success("Shop details fetched successfully", {
          position: "top-right",
        });
      })
      .addCase(fetchIndividualShopDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.errorMessage = action.payload;
        toast.error(state?.errorMessage, {
          position: "top-right",
        });
      });
  },
});

// ---------------------------------------------------------------------------------------

// Action creators are generated for each case reducer function
export const { clearReduxStoreData } = shopSlice.actions;
export default shopSlice.reducer;

// ================================================== THE END ==================================================
