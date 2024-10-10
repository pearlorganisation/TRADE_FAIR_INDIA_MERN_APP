import { createSlice, current } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import {
  addOrganiser,
  deleteOrganiser,
  fetchIndividualOrganiserDetails,
  fetchOrganiserList,
  updateOrganiserDetails,
} from "../actions/organiserActions";

// ----------------------------------------------------------------------------------------------------

const initialState = {
  isLoading: false,
  isSuccess: false,
  isOrganiserCreationSuccess: false,
  errorMessage: "",
  organiserList: [],
  totalPage:1,

};

export const organiserSlice = createSlice({
  name: "organiser",
  initialState,
  reducers: {
    clearReduxStoreData: (state) => {},
  },
  extraReducers: (builder) => {
    builder
      // Fetch Shops List Cases
      .addCase(fetchOrganiserList.pending, (state, action) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isOrganiserCreationSuccess = false;
        state.errorMessage = "";
      })
      .addCase(fetchOrganiserList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isOrganiserCreationSuccess = false;

        state.errorMessage = "";
        state.organiserList = action.payload.data; 
        state.totalPages= action.payload.totalPages;

      })
      .addCase(fetchOrganiserList.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isOrganiserCreationSuccess = false;

        state.errorMessage = action.payload;
      })
      // Add New Shops Cases
      .addCase(addOrganiser.pending, (state, action) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isOrganiserCreationSuccess = false;

        state.errorMessage = "";
      })
      .addCase(addOrganiser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isOrganiserCreationSuccess = true;

        state.errorMessage = "";
        state.organiserList = [action.payload];
        toast.success("Organiser Added successfully", {
          position: "top-right",
        });
      })
      .addCase(addOrganiser.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isOrganiserCreationSuccess = false;
        state.errorMessage = action.payload;
        toast.error(state?.errorMessage, {
          position: "top-right",
        });
      })

      // Update Shop Details Cases
      .addCase(updateOrganiserDetails.pending, (state, action) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isOrganiserCreationSuccess = false;
        state.errorMessage = "";
      })
      .addCase(updateOrganiserDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isOrganiserCreationSuccess = true;
        state.errorMessage = "";
        state.organiserList = [action.payload];
        toast.success("Organiser details updated successfully", {
          position: "top-right",
        });
      })
      .addCase(updateOrganiserDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isOrganiserCreationSuccess = false;
        state.errorMessage = action.payload;
        toast.error(state?.errorMessage, {
          position: "top-right",
        });
      })

      // Delete Shop Cases
      .addCase(deleteOrganiser.pending, (state, action) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.errorMessage = "";
      })
      .addCase(deleteOrganiser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.errorMessage = "";
        const filterData = current(state.organiserList).filter(
          (item) => item._id !== action.payload.id
        );
        state.organiserList = filterData;
        toast.success("Organiser deleted successfully", {
          position: "top-right",
        });
      })
      .addCase(deleteOrganiser.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.errorMessage = action.payload;
        toast.error(state?.errorMessage, {
          position: "top-right",
        });
      })
      // Fetch Individual Shop Details Cases
      .addCase(fetchIndividualOrganiserDetails.pending, (state, action) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.errorMessage = "";
      })
      .addCase(fetchIndividualOrganiserDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.errorMessage = "";
        toast.success("Organiser details fetched successfully", {
          position: "top-right",
        });
      })
      .addCase(fetchIndividualOrganiserDetails.rejected, (state, action) => {
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
export const { clearReduxStoreData } = organiserSlice.actions;
export default organiserSlice.reducer;

// ================================================== THE END ==================================================
