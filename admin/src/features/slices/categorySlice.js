import { createSlice } from "@reduxjs/toolkit";
import {
  addNewCategory,
  deleteCategory,
  fetchCategoriesList,
  fetchIndividualCategoryDetails,
  updateCategoryDetails,
} from "../actions/categoryActions";
import { toast } from "react-toastify";
// ---------------------------------------------------------------------------------------

const initialState = {
  isLoading: false,
  isSuccess: false,
  // iscategoryUpdateSuccess: false,
  errorMessage: "",
  country: "IN",
  categoriesList: [],
  categoryIndividualList: [],
  deletedData: false,
  isDeleted: false,
  totalPages:1
};

// ---------------------------------------------------------------------------------------

export const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch categories List Cases
      .addCase(fetchCategoriesList.pending, (state, action) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.errorMessage = "";
        state.isDeleted = false;
      })
      .addCase(fetchCategoriesList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.errorMessage = "";
        state.isDeleted = false;
        state.categoriesList = action.payload.data;
        state.totalPages= action.payload.totalPages;
        state.categoryIndividualList = [];
        // state.categoryIndividualList = action.payload;
      })
      .addCase(fetchCategoriesList.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isDeleted = false;
        state.errorMessage = action.payload;
      })
      .addCase(fetchIndividualCategoryDetails.pending, (state, action) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isDeleted = false;
        state.errorMessage = "";
      })
      .addCase(fetchIndividualCategoryDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isDeleted = false;
        state.errorMessage = "";
        state.categoryIndividualList = action.payload;
        // state.categoryIndividualList = action.payload;
      })
      .addCase(fetchIndividualCategoryDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.isDeleted = false;
        state.isSuccess = false;
        state.errorMessage = action.payload;
      })
      .addCase(addNewCategory.pending, (state, action) => {
        state.isLoading = true;
        state.isDeleted = false;
        state.isSuccess = false;
        state.errorMessage = "";
      })
      .addCase(addNewCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isDeleted = false;
        state.errorMessage = "";
        state.categoryIndividualList = action.payload;
        toast.success("Category created successfully");
        // state.categoryIndividualList = action.payload;
      })
      .addCase(addNewCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isDeleted = false;
        state.errorMessage = action.payload;
        toast.error(state?.errorMessage, {
          position: "top-right",
        });
      })

      .addCase(deleteCategory.pending, (state, action) => {
        state.isLoading = true;
        state.isDeleted = false;
        state.isSuccess = false;
        state.errorMessage = "";
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.errorMessage = "";
        // deletedData = !deletedData;
        state.categoryIndividualList = action.payload;
        toast.success("Category Deleted Successfuly");
        state.isDeleted = true;
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.errorMessage = action.payload;
        state.isDeleted = false;
        toast.error(state?.errorMessage, {
          position: "top-right",
        });
      })
      .addCase(updateCategoryDetails.pending, (state, action) => {
        state.isLoading = true;
        state.isDeleted = false;
        state.isSuccess = false;
        // state.iscategoryUpdateSuccess = false;
        state.errorMessage = "";
      })
      .addCase(updateCategoryDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = TextTrackCueList;
        state.errorMessage = "";
        // state.iscategoryUpdateSuccess = true
        // deletedData = !deletedData;
        state.categoryIndividualList = action.payload;
        toast.success("Categoy details updated successfully");
        state.isDeleted = true;
      })
      .addCase(updateCategoryDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        // state.iscategoryUpdateSuccess = false;
        state.errorMessage = action.payload;
        state.isDeleted = false;
        toast.error(state?.errorMessage, {
          position: "top-right",
        });
      });
  },
});

// ---------------------------------------------------------------------------------------

export const {} = categorySlice.actions;
export default categorySlice.reducer;

// ================================================== THE END ==================================================
