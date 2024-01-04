import { createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "../../services/axiosInterceptor";

export const fetchEventBanner = createAsyncThunk(
  "fetchEventBanner",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await instance.get("/eventBanner", payload, {
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

export const createEventBanner = createAsyncThunk(
  "createEventBanner",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await instance.post("/eventBanner", payload, {
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

export const deleteBanner = createAsyncThunk(
  "deleteBanner",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await instance.delete(`/eventBanner/${payload}`, {
        withCredentials: true,
      });
      return { data, payload };
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

export const updateEventBanner = createAsyncThunk(
  "updateEventBanner",
  async ({ id, payload }, { rejectWithValue }) => {
    try {
      const { data } = await instance.patch(`/eventBanner/${id}`, payload, {
        withCredentials: true,
      });
      return data;
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);
