import { createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "../../services/axiosInterceptor";
// -----------------------------------------------------------------------------------------------------

export const fetchPermissionsList = createAsyncThunk(
  "permission/fetchPermissionsList",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await instance.get("/permission", {
        withCredentials: true,
      });
      return data?.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export const createPermission = createAsyncThunk(
  "permission/createPermission",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await instance.post("/permission", payload, {
        withCredentials: true,
      });
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updatePermission = createAsyncThunk(
  "permission/updatePermission",
  async ({ permissionId, payload }, { rejectWithValue }) => {
    try {
      const { data } = await instance.patch(
        `/permission/${permissionId}`,
        payload,
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

export const deletePermission = createAsyncThunk(
  "permission/deletePermission",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await instance.delete(
        `/permission/${payload}`,
        payload,
        {
          withCredentials: true,
        }
      );
      return { data, payload };
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const fetchIndividualPermissionDetails = createAsyncThunk(
  "permission/fetchIndividualPermissionDetails",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await instance.get(`/permission/${payload}`, payload, {
        withCredentials: true,
      });
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// ================================================== THE END ==================================================
