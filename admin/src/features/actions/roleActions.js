import { createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "../../services/axiosInterceptor";
// -----------------------------------------------------------------------------------------------------

export const fetchRolesList = createAsyncThunk(
  "role/fetchRolesList",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await instance.get("/role", {
        withCredentials: true,
      });
      return data?.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export const createRole = createAsyncThunk(
  "role/createRole",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await instance.post("/role", payload, {
        withCredentials: true,
      });
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updateRole = createAsyncThunk(
  "role/updateRole",
  async ({ roleId, payload }, { rejectWithValue }) => {
    try {
      const { data } = await instance.patch(`/role/${roleId}`, payload, {
        withCredentials: true,
      });
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deleteRole = createAsyncThunk(
  "role/deleteRole",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await instance.delete(`/role/${payload}`, payload, {
        withCredentials: true,
      });
      return { data, payload };
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const fetchIndividualRoleDetails = createAsyncThunk(
  "role/fetchIndividualRoleDetails",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await instance.get(`/role/${payload}`, payload, {
        withCredentials: true,
      });
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// ================================================== THE END ==================================================
