// -----------------------------------------------------------------------------------------------------

import { createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "../../service/axiosInterceptor";

export const signUp = createAsyncThunk(
  "auth/signUp",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await instance.post("/auth/signup", payload, {
        withCredentials: true,
      });
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const signIn = createAsyncThunk(
  "auth/signIn",
  async (payload, { rejectWithValue }) => {
    console.log(
      process.env.REACT_APP_API_BASE_URL_DEVELOPMENT,
      "process.env.REACT_APP_API_BASE_URL_DEVELOPMENT"
    );
    try {
      const { data } = await instance.post("/auth/login", payload, {
        withCredentials: true,
      });
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const emailVerification = createAsyncThunk(
  "auth/emailVerification",
  async ({ token, id }, { rejectWithValue }) => {
    try {
      const { data } = await instance.patch(
        `/auth/verifyEmail/${token}/${id}`,
        {
          withCredentials: true,
        }
      );
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const userLogout = createAsyncThunk(
  "auth/userLogout",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await instance.patch("/auth/logout", {
        withCredentials: true,
      });
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

//Forgot password

export const sendOTP = createAsyncThunk(
  "auth/sendOTP",
  async (data, { rejectWithValue }) => {
    try {
      const result = await instance.post(`/auth/sendOTP/`, data, {
        withCredentials: true,
      });
      console.log(result, "result");
      return result?.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  }
);

export const forgetPasswordOtpVerification = createAsyncThunk(
  "auth/forgetPasswordOtpVerification",
  async (data, { rejectWithValue }) => {
    try {
      const result = await instance.post(
        `/auth/forgotPasswordOtpVerification/`,
        data,
        {
          withCredentials: true,
        }
      );
      console.log(result, "result");
      return result?.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  }
);

export const resetPassword = createAsyncThunk(
  "auth/resetPassword",
  async (data, { rejectWithValue }) => {
    try {
      const result = await instance.put(`/auth/resetPassword`, data, {
        withCredentials: true,
      });
      console.log(result, "result");
      return result?.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  }
);

// ================================================== THE END ==================================================
