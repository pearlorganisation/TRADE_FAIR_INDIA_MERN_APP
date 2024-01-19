// ----------------------------------------------------------------------------------------------------

import { createSlice } from "@reduxjs/toolkit";
import { fetchCategoryList } from "../actions/categoryAction";
import {
  emailVerification,
  signIn,
  signUp,
  userLogout,
} from "../actions/authAction";
import { toast } from "sonner";

const initialState = {
  isLoading: false,
  isAuthenticated: false,
  isEmailVerified: false,
  authData: [],
  errorMessage: "",
};

// ---------------------------------------------------------------------------------------

export const authSlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    resetFields: (state, action) => {
      state.isLoading = false;
      state.isAuthenticated = false;
      state.isEmailVerified = false;
      state.authData = [];
      state.errorMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder
      //  user signUp
      .addCase(signUp.pending, (state, action) => {
        state.isLoading = true;
        state.errorMessage = "";
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.isLoading = false;
        state.errorMessage = "";
        state.authData = action.payload;
        toast.success("Verification email sent! 💌 Check inbox.");
      })
      .addCase(signUp.rejected, (state, action) => {
        state.isLoading = false;
        state.errorMessage = action.payload;
        toast.error("Error");
      })

      // user signIn
      .addCase(signIn.pending, (state, action) => {
        state.isLoading = true;
        state.isAuthenticated = false;
        state.errorMessage = "";
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.errorMessage = "";
        state.authData = action.payload;
        toast.success("Welcome");
      })
      .addCase(signIn.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.errorMessage = action.payload;
        toast.error("Error");
      })

      // user emailVerification

      .addCase(emailVerification.pending, (state, action) => {
        state.isLoading = true;
        state.errorMessage = "";
      })
      .addCase(emailVerification.fulfilled, (state, action) => {
        state.isLoading = false;
        state.errorMessage = "";
        state.isEmailVerified = true;
        state.authData = action.payload;
        toast.success("Success! 🎉 Email verified.");
      })
      .addCase(emailVerification.rejected, (state, action) => {
        state.isLoading = false;
        state.errorMessage = action.payload;
        toast.error("Uh-oh! ⏳ Email verification link expired.");
      })

      .addCase(userLogout.pending, (state, action) => {
        state.isLoading = true;
        state.errorMessage = "";
      })
      .addCase(userLogout.fulfilled, (state, action) => {
        state.isLoading = false;
        state.errorMessage = "";
        state.isEmailVerified = true;
        state.authData = action.payload;
        toast.success("Success! 🎉 Email verified.");
      })
      .addCase(userLogout.rejected, (state, action) => {
        state.isLoading = false;
        state.errorMessage = action.payload;
        toast.error("Uh-oh! ⏳ Email verification link expired.");
      });
  },
});

// -------------------------------------------------------------------------

// Action creators are generated for each case reducer function
export const {} = authSlice.actions;
export default authSlice.reducer;

// ================================================== THE END ==================================================
