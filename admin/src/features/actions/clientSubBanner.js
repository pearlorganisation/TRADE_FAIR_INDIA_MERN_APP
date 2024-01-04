import { createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "../../services/axiosInterceptor";

export const fetchSubBanner = createAsyncThunk(
  "fetchBanner",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await instance.get("/clientSubBanner", payload, {
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

export const createSubBanner = createAsyncThunk(
  "createSubBanner",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await instance.post("/clientSubBanner", payload, {
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

export const deleteSubBanner = createAsyncThunk(
  "deleteSubBanner",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await instance.delete(`/clientSubBanner/${payload}`, {
        withCredentials: true,
      });
      return { data, payload };
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);

export const updateSubBanner = createAsyncThunk(
  "updateSubBanner",
  async ({ id, payload }, { rejectWithValue }) => {
    try {
      const { data } = await instance.patch(`/clientSubBanner/${id}`, payload, {
        withCredentials: true,
      });
      return data;
    } catch (e) {
      return rejectWithValue(e);
    }
  }
);
