import { createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "../../services/axiosInterceptor";
// -----------------------------------------------------------------------------------------------------

export const fetchUsersList = createAsyncThunk(
  "user/fetchUsersList",
  async ({ search, page }, { rejectWithValue }) => {
    try {
      const { data } = await instance.get(
        `/users?Search=${search || ""}&Page=${page || 1}`,
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

export const createUser = createAsyncThunk(
  "user/createUser",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await instance.post("/users", payload, {
        withCredentials: true,
      });
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updateUserDetails = createAsyncThunk(
  "user/updateUserDetails",
  async ({ userId, payload }, { rejectWithValue }) => {
    try {
      const { data } = await instance.patch(`/users/${userId}`, payload, {
        withCredentials: true,
      });
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deleteUser = createAsyncThunk(
  "user/deleteUser",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await instance.delete(`/users/${payload}`, payload, {
        withCredentials: true,
      });
      return { data, payload };
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const fetchIndividualUserDetails = createAsyncThunk(
  "user/fetchIndividualUserDetails",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await instance.get(`/users/${payload}`, payload, {
        withCredentials: true,
      });
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const manageUserActivationDeactivation = createAsyncThunk(
  "user/manageUserActivationDeactivation",
  async ({ userId, status }, { rejectWithValue }) => {
    try {
      const { data } = await instance.patch(
        `/users/status/${userId}`,
        { isUserActivate: status },
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

// ================================================== THE END ==================================================
