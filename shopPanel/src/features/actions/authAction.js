import { createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "../../services/axiosInterceptor";

// login -- login action to call the login api
export const loginVendor = createAsyncThunk(
  "loginVendor",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await instance.post("/vendor/Login", payload, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response?.data?.user;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export const loginOwner = createAsyncThunk(
  "/owner/login/",
  async (payload, { rejectWithValue }) => {
    try {
      const {data} = await instance.post("/owner/login/", payload, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });
      return data?.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// logout -- logout action to call the logout api
export const logout = createAsyncThunk(
  "auth/logout",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await instance.post("/auth/logout", payload, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response?.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// Forgot Password Functionality
export const ownerForgotPasswordOTP = createAsyncThunk(
  "owner/ownerSendOtp",
  async ( payload, { rejectWithValue }) => {
    try {
      const response = await instance.post("/owner/ownerSendOtp", payload, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response?.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const ownerOTPVerification = createAsyncThunk(
  "owner/ownerVerifyOtp",
  async ( payload, { rejectWithValue }) => {
    try {
      const response = await instance.post("/owner/ownerVerifyOtp", payload, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response?.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const ownerResetPassword = createAsyncThunk(
  "owner/ownerResetPassword",
  async ( payload, { rejectWithValue }) => {
    try {
      const response = await instance.patch("/owner/ownerResetPassword", payload, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response?.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
