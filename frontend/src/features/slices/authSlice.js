// ----------------------------------------------------------------------------------------------------

import { createSlice } from "@reduxjs/toolkit";
import { fetchCategoryList } from "../actions/categoryAction";
import { emailVerification, signIn, signUp } from "../actions/authAction";
import { toast } from "sonner";

const initialState = {
  isLoading: false,
  isSuccess: false,
  authData: [],
  errorMessage: "",
};

// ---------------------------------------------------------------------------------------

export const authSlice = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    //  user signUp
      .addCase(signUp.pending, (state, action) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.errorMessage = "";
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.errorMessage = "";
        state.authData = action.payload;
        toast.success("Welcome");
      })
      .addCase(signUp.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.errorMessage = action.payload;
        toast.error("Error");

      })

      // user signIn
      .addCase(signIn.pending, (state, action) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.errorMessage = "";
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.errorMessage = "";
        state.authData = action.payload;
        toast.success("Welcome");
      })
      .addCase(signIn.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.errorMessage = action.payload;
        toast.error("Error");

      })

      // user emailVerification

      .addCase(emailVerification.pending, (state, action) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.errorMessage = "";
      })
      .addCase(emailVerification.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.errorMessage = "";
        state.authData = action.payload;
      })
      .addCase(emailVerification.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.errorMessage = action.payload;
        toast.error("Error");

      })

      
  },
});

// -------------------------------------------------------------------------

// Action creators are generated for each case reducer function
export const {} = authSlice.actions;
export default authSlice.reducer;

// ================================================== THE END ==================================================
