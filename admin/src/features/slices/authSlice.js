// ---------------------------------------Imports--------------------------------------------
import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
// *******************************************************************************************
import {
  login,
  logout,
  sendOtp,
  verifyOtp,
  resetPassword,
} from "../actions/authActions";
// -------------------------------------------------------------------------------------------

// initialState -- initial state of authentication
const initialState = {
  isLogInSuccess: false,
  isLogoutSuccess: false,
  isLoading: false,
  isUserLoggedIn: false,
  loggedInUserData: null,
  errorMessage: "",
  isOtpVerified: false,
  isOtpMailSent: false,
  isPasswordReset: false,
};

// -------------------------------------- Slices------------------------------------------------
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetFields: (state, action) => {
      state.isPasswordReset = false;
      state.isOtpMailSent = false;
      state.isOtpVerified = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login lifecycle methods
      .addCase(login.pending, (state, action) => {
        state.isLoading = true;
        state.isLogInSuccess = false;
        state.errorMessage = "";
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.loggedInUserData = action.payload;
        state.isLogoutSuccess = false;
        state.isUserLoggedIn = true;
        state.isLogInSuccess = true;
        toast.success(`Welcome ${action?.payload?.name}`, {
          position: "top-center",
        });
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isLogInSuccess = false;
        state.isUserLoggedIn = false;
        state.errorMessage = action.payload;
        toast.error(action.payload, { position: "top-center" });
      })

      // Logout lifecycle methods
      .addCase(logout.pending, (state, action) => {
        state.isLoading = true;
        state.isLogoutSuccess = false;
        state.errorMessage = "";
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isLogInSuccess = false;
        state.isLogoutSuccess = true;
        state.loggedInUserData = null;
        state.isUserLoggedIn = false;
        localStorage.clear();
        sessionStorage.clear();
        toast.success("Logout Successfully", {
          position: "top-center",
        });
      })
      .addCase(logout.rejected, (state, action) => {
        state.isLoading = false;
        state.isLogoutSuccess = false;
        state.errorMessage = action.payload;
        toast.error(state?.errorMessage, {
          position: "top-right",
        });
      })

      // sendOtp Lifecycle methods
      .addCase(sendOtp.pending, (state, action) => {
        state.isLoading = true;
        state.isOtpMailSent = false;
        state.errorMessage = "";
      })
      .addCase(sendOtp.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isLogInSuccess = false;
        state.isLogoutSuccess = false;
        state.loggedInUserData = null;
        state.isUserLoggedIn = false;
        state.isOtpVerified = false;
        state.isOtpMailSent = true;
        state.isPasswordReset = false;
        state.errorMessage = "";
        toast.success(
          <div>
            OTP Sent successfully on {action?.payload?.email}
            <br />
            Please check mail
          </div>,
          {
            position: "top-center",
          }
        );
      })
      .addCase(sendOtp.rejected, (state, action) => {
        state.isLoading = false;
        state.isOtpMailSent = false;
        state.errorMessage = action.payload;
        toast.error("User Does not exist", {
          position: "top-center",
        });
      })
      // verifyOtp Lifecycle methods
      .addCase(verifyOtp.pending, (state, action) => {
        state.isLoading = true;
        state.isOtpVerified = false;
        state.errorMessage = "";
      })
      .addCase(verifyOtp.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isLogInSuccess = false;
        state.isLogoutSuccess = false;
        state.loggedInUserData = null;
        state.isUserLoggedIn = false;
        state.isOtpVerified = true;
        state.isOtpMailSent = false;
        state.isPasswordReset = false;
        state.errorMessage = "";
      })
      .addCase(verifyOtp.rejected, (state, action) => {
        state.isLoading = false;
        state.isOtpVerified = false;
        state.errorMessage = action.payload;
        toast.error(state?.errorMessage || "OTP is invalid", {
          position: "top-right",
        });
      })
      // resetPassword Lifecycle methods
      .addCase(resetPassword.pending, (state, action) => {
        state.isLoading = true;
        state.isPasswordReset = false;
        state.errorMessage = "";
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isLogInSuccess = false;
        state.isLogoutSuccess = false;
        state.loggedInUserData = null;
        state.isUserLoggedIn = false;
        state.isOtpVerified = false;
        state.isOtpMailSent = false;
        state.isPasswordReset = true;
        state.errorMessage = "";
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.isPasswordReset = false;
        state.errorMessage = action.payload;
      });
  },
});

// ===========================================Exports==================================================
export default authSlice.reducer;
export const { resetFields } = authSlice.actions;
