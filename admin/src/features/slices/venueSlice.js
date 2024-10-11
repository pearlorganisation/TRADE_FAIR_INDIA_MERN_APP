import { createSlice, current } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import {
  addNewVenue,
  deleteVenue,
  fetchVenuesList,
  updateVenueDetails,
} from "../actions/venueActions";

// ----------------------------------------------------------------------------------------------------

const initialState = {
  isLoading: false,
  isSuccess: false,
  errorMessage: "",
  isvenueDeleted: false,
  venueList: [],
};

// ---------------------------------------------------------------------------------------

export const venueSlice = createSlice({
  name: "venue",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Venues List Cases
      .addCase(fetchVenuesList.pending, (state, action) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.errorMessage = "";
      })
      .addCase(fetchVenuesList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.errorMessage = "";
        state.totalPages = action.payload.totalPage;
        state.venueList = action.payload.data;
      })
      .addCase(fetchVenuesList.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.errorMessage = action.payload;
      })
      // Add New Venue Cases
      .addCase(addNewVenue.pending, (state, action) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.errorMessage = "";
      })
      .addCase(addNewVenue.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.errorMessage = "";
        state.venueList = [action.payload];
        toast.success("Venue Added successfully", {
          position: "top-right",
        });
      })
      .addCase(addNewVenue.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.errorMessage = action.payload;
        toast.error(state?.errorMessage, {
          position: "top-right",
        });
      })

      // Update Shop Details Cases
      .addCase(updateVenueDetails.pending, (state, action) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.errorMessage = "";
      })
      .addCase(updateVenueDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.errorMessage = "";
        state.venueList = [action.payload];
        toast.success("Venue details updated successfully", {
          position: "top-right",
        });
      })
      .addCase(updateVenueDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.errorMessage = action.payload;
        toast.error(state?.errorMessage, {
          position: "top-right",
        });
      })

      //   Delete Venue Cases
      .addCase(deleteVenue.pending, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isvenueDeleted = false;
        state.errorMessage = "";
      })
      .addCase(deleteVenue.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isvenueDeleted = true;
        state.errorMessage = "";
        const filterData = current(state.venueList).filter(
          (item) => item._id !== action?.payload?.id
        );
        state.venueList = filterData;
        toast.success("Venue deleted successfully", {
          position: "top-right",
        });
      })
      .addCase(deleteVenue.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isvenueDeleted = true;
        state.errorMessage = action.payload;
        toast.error(state?.errorMessage, {
          position: "top-right",
        });
      });
  },
});

// -------------------------------------------------------------------------

// Action creators are generated for each case reducer function
export const {} = venueSlice.actions;
export default venueSlice.reducer;

// ================================================== THE END ==================================================
