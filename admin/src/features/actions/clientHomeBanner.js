import { createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "../../services/axiosInterceptor";

export const fetchHomeBanner = createAsyncThunk(
  "fetchBanner",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await instance.get("/clientBanner", payload, {
        withCredentials: true,
        headers: {
          "content-type": "application/x-www-form-urlencoded;charset=utf-8",
        },
      });
      return data?.data;
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

export const createHomeBanner = createAsyncThunk(
  "createBanner",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await instance.post("/clientBanner", payload, {
        withCredentials: true,
        headers: {
          "content-type": "application/x-www-form-urlencoded;charset=utf-8",
        },
      });
      return data;
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

export const deleteHomeBanner = createAsyncThunk(
  "deleteHomeBanner",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await instance.delete(`/clientBanner/${payload}`, {
        withCredentials: true,
      });
      return { data, payload };
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

export const updateHomeBanner = createAsyncThunk(
  "updateBanner",
  async ({ id, payload }, { rejectWithValue }) => {
    try {
      const { data } = await instance.patch(`/clientBanner/${id}`, payload, {
        withCredentials: true,
      });
      return data;
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);
