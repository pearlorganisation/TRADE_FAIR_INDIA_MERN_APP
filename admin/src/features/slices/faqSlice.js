import { createSlice, current } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import {
  addNewVenue,
  deleteVenue,
  fetchVenuesList,
  updateVenueDetails,
} from "../actions/venueActions";
import { addNewFaq, deleteFaq, fetchFaqList, updateFaqDetails } from "../actions/faqActions";

// ----------------------------------------------------------------------------------------------------

const initialState = {
  isLoading: false,
  isSuccess: false,
  errorMessage: "",
  faqData: [],
};

// ---------------------------------------------------------------------------------------

export const faqSlice = createSlice({
  name: "faq",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch faq List Cases
      .addCase(fetchFaqList.pending, (state, action) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.errorMessage = "";
      })
      .addCase(fetchFaqList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.errorMessage = "";
        state.faqData = action.payload.data;
      })
      .addCase(fetchFaqList.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.errorMessage = action.payload;
      })
      // Add New Venue Cases
      .addCase(addNewFaq.pending, (state, action) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.errorMessage = "";
      })
      .addCase(addNewFaq.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.errorMessage = "";
        state.faqData = action.payload;
        toast.success("Faq Added successfully", {
          position: "top-right",
        });
      })
      .addCase(addNewFaq.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.errorMessage = action.payload;
        toast.error(state?.errorMessage, {
          position: "top-right",
        });
      })

      // Update Shop Details Cases
      .addCase(updateFaqDetails.pending, (state, action) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.errorMessage = "";
      })
      .addCase(updateFaqDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.errorMessage = "";
        state.faqData = [action.payload];
        toast.success("Faq details updated successfully", {
          position: "top-right",
        });
      })
      .addCase(updateFaqDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.errorMessage = action.payload;
        toast.error(state?.errorMessage, {
          position: "top-right",
        });
      })

      //   Delete Venue Cases
      .addCase(deleteFaq.pending, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isvenueDeleted = false;
        state.errorMessage = "";
      })
      .addCase(deleteFaq.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.errorMessage = "";
        const filterData = current(state.faqData).filter(
          (item) => item._id !== action?.payload?.id
        );
        state.faqData = filterData;
        toast.success("Faq Deleted successfully", {
          position: "top-right",
        });
      })
      .addCase(deleteFaq.rejected, (state, action) => {
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
export const {} = faqSlice.actions;
export default faqSlice.reducer;

// ================================================== THE END ==================================================
