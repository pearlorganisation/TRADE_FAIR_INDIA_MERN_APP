// ----------------------------------------------------------------------------------------------------

import { createSlice } from "@reduxjs/toolkit";
import { fetchCategoryList } from "../actions/categoryAction";
import {
  emailVerification,
  forgetPasswordOtpVerification,
  resetPassword,
  sendOTP,
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

  //forget password
  step1: "not-completd", // send otp
  email: null, // store user email
  step2: "not-completd", // otp verifcation
  step3: "not-completd", // reset-password
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
      state.step1 = null;
      state.step2 = null;
      state.step3 = null;
      // state.email = null;
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
        toast.error(`Uh-oh! ${action.payload}`);
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
        toast.error(`Uh-oh! ${action.payload}`);
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
        toast.error(`Uh-oh! ⏳ ${action.payload}`);
      })

      .addCase(userLogout.pending, (state, action) => {
        state.isLoading = true;
        state.errorMessage = "";
      })
      .addCase(userLogout.fulfilled, (state, action) => {
        state.isLoading = false;
        state.errorMessage = "";
        state.isEmailVerified = false;
        state.isAuthenticated = false;
        state.authData = [];
        localStorage.removeItem("persist:TradeFairIndiaClientPanle");
        localStorage.clear();
        sessionStorage.clear();
        toast.success("🎉 Logout successful!");
      })
      .addCase(userLogout.rejected, (state, action) => {
        state.isLoading = false;
        state.errorMessage = action.payload;
        toast.error(`Uh-oh! ${action.payload}`);
      })

      //forget password

      .addCase(sendOTP.pending, (state, action) => {
        state.isLoading = true;
        state.errorMessage = "";
      })
      .addCase(sendOTP.fulfilled, (state, action) => {
        state.isLoading = false;
        state.errorMessage = "";
        state.step1 = action.payload;
        state.email = action.payload?.email;
        toast.success("OTP Sent Successfully!!");
      })
      .addCase(sendOTP.rejected, (state, action) => {
        state.isLoading = false;
        state.errorMessage = action.payload;
        toast.error(`Uh-oh! ⏳ ${action.payload}`);
      })

      .addCase(forgetPasswordOtpVerification.pending, (state, action) => {
        state.isLoading = true;
        state.errorMessage = "";
      })
      .addCase(forgetPasswordOtpVerification.fulfilled, (state, action) => {
        state.isLoading = false;
        state.errorMessage = "";
        state.step2 = action.payload;

        toast.success("OTP Verified Successfully!!");
      })
      .addCase(forgetPasswordOtpVerification.rejected, (state, action) => {
        state.isLoading = false;
        state.errorMessage = action.payload;
        toast.error(`Uh-oh! ⏳ ${action.payload}`);
      })

      .addCase(resetPassword.pending, (state, action) => {
        state.isLoading = true;
        state.errorMessage = "";
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.errorMessage = "";
        state.step3 = action.payload;

        toast.success("Password Reset Successfully!!");
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.errorMessage = action.payload;
        toast.error(`Uh-oh! ⏳ ${action.payload}`);
      });
  },
});

// -------------------------------------------------------------------------

// Action creators are generated for each case reducer function
export const { resetFields } = authSlice.actions;
export default authSlice.reducer;

// ================================================== THE END ==================================================
