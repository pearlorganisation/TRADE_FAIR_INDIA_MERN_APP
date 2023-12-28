// ---------------------------------------Imports--------------------------------------------
import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

// *******************************************************************************************
import {
  loginOwner,
  loginVendor,
  logout,
  ownerForgotPasswordOTP,
  ownerOTPVerification,
  ownerResetPassword,
} from "../actions/authAction";

// -------------------------------------------------------------------------------------------

// initialState -- initial state of authentication
const initialState = {
  isLoading: false,
  isUserLoggedIn: false,
  loggedInUserData: null,
  role: null,
  isLogoutSuccess:false,

  // forgot password
  isOTPSent: false,
  isOTPVerified: false,
  isPasswordUpdated:false,
  userEmail:'',
  errorMessage: "",
};

// -------------------------------------- Slices------------------------------------------------
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetFields: (state, action) => {
      state.isLoading = false;
      state.isUserLoggedIn = false;
      state.loggedInUserData = null;
      state.errorMessage = "";
    },
    resestForgotPasswordStates: (state, action) => {
      state.isOTPSent = false;
      state.isOTPVerified = false;
      state.loggedInUserData = null;
      state.isPasswordUpdated = false;
      state.userEmail = '';
    },
  },
  extraReducers: (builder) => {
    builder
      // Login vendor lifecycle methods
      .addCase(loginVendor.pending, (state, action) => {
        state.isLoading = true;
        state.isLogInSuccess = false;
        state.errorMessage = "";
      })
      .addCase(loginVendor.fulfilled, (state, action) => {
        state.isLoading = false;
        console.log(action.payload, "helloolool");
        state.loggedInUserData = action.payload;
        state.isUserLoggedIn = true;
        state.isLogInSuccess = true;
        state.role = "vendor";
        toast.success(`Welcome ${action?.payload?.name}`, {
          position: "top-center",
        });
      })
      .addCase(loginVendor.rejected, (state, action) => {
        state.isLoading = false;
        state.isLogInSuccess = false;
        state.isUserLoggedIn = false;
        state.errorMessage = action.payload;
        toast.error(action.payload, { position: "top-center" });
      })

      // Login owner lifecycle methods
      .addCase(loginOwner.pending, (state, action) => {
        state.isLoading = true;
        state.isLogInSuccess = false;
        state.errorMessage = "";
      })
      .addCase(loginOwner.fulfilled, (state, action) => {
        state.isLoading = false;
        console.log(action.payload, "helloolool");
        state.loggedInUserData = action.payload;
        state.isUserLoggedIn = true;
        state.isLogInSuccess = true;
        state.isLogoutSuccess=false;
        state.role = "owner";

        toast.success(`Welcome ${action?.payload?.email}`, {
          position: "top-center",
        });
      })
      .addCase(loginOwner.rejected, (state, action) => {
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
        localStorage.removeItem("persist:shopPanelRoot");
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
        toast.error("Logout Failed", {
          position: "top-right",
        });
      })

      //Forgot Password Functionality
      .addCase(ownerForgotPasswordOTP.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(ownerForgotPasswordOTP.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isOTPSent = true;
        state.userEmail = action?.payload?.email
        state.loggedInUserData = action.payload;
        toast.success("OTP Sent Successfully", { position: "top-center" });
      })
      .addCase(ownerForgotPasswordOTP.rejected, (state, action) => {
        state.isLoading = false;
        toast.error(action.payload, { position: "top-center" });
        state.errorMessage = action.payload;
      })

      .addCase(ownerOTPVerification.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(ownerOTPVerification.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isOTPVerified = true;
        state.loggedInUserData = action.payload;
      })
      .addCase(ownerOTPVerification.rejected, (state, action) => {
        state.isLoading = false;
        toast.error(action.payload, { position: "top-center" });
        state.errorMessage = action.payload;
      })

      .addCase(ownerResetPassword.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(ownerResetPassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.loggedInUserData = action.payload;
        state.isPasswordUpdated = true;
        toast.success(
          action?.payload?.message || "Password Successfully Reset",
          { position: "top-center" }
        );
      })
      .addCase(ownerResetPassword.rejected, (state, action) => {
        state.isLoading = false;
        toast.error(action.payload, { position: "top-center" });
        state.errorMessage = action.payload;
      });
  },
});

// ===========================================Exports==================================================
export default authSlice.reducer;
export const { resetFields,resestForgotPasswordStates } = authSlice.actions;
