import { createSlice, current } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import {
  createListYourEventLink,
  fetchListYourEventLink,
  updateListYourEventLink,
} from "../actions/listYourEventLinkAction";

// ----------------------------------------------------------------------------------------------------

const initialState = {
  isLoading: false,
  isSuccess: false,
  errorMessage: "",
  listYourEventLink: [],
};

// ---------------------------------------------------------------------------------------

export const listYourEventSlice = createSlice({
  name: "listYourEventSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch faq List Cases
      .addCase(fetchListYourEventLink.pending, (state, action) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.errorMessage = "";
      })
      .addCase(fetchListYourEventLink.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.errorMessage = "";
        state.listYourEventLink = action.payload;
      })
      .addCase(fetchListYourEventLink.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.errorMessage = action.payload;
      })
      // Add New Venue Cases
      .addCase(createListYourEventLink.pending, (state, action) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.errorMessage = "";
      })
      .addCase(createListYourEventLink.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.errorMessage = "";
        state.listYourEventLink = action.payload;
        toast.success("Link Added successfully", {
          position: "top-right",
        });
      })
      .addCase(createListYourEventLink.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.errorMessage = action.payload;
        toast.error(state?.errorMessage, {
          position: "top-right",
        });
      })
      // update
      .addCase(updateListYourEventLink.pending, (state, action) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.errorMessage = "";
      })
      .addCase(updateListYourEventLink.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.errorMessage = "";
        state.listYourEventLink = action.payload;
        toast.success("Link Added successfully", {
          position: "top-right",
        });
      })
      .addCase(updateListYourEventLink.rejected, (state, action) => {
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
export const {} = listYourEventSlice.actions;
export default listYourEventSlice.reducer;

// ================================================== THE END ==================================================
