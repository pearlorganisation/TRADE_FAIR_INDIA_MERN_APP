import { createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "../../services/axiosInterceptor";
// -----------------------------------------------------------------------------------------------------

export const fetchEventCategory = createAsyncThunk(
  "fetchEventCategory",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await instance.get("/eventCategory", {
        withCredentials: true,
      });
      return data?.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export const createEventCategory = createAsyncThunk(
  "createEventCategory",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await instance.post("/eventCategory", payload, {
        withCredentials: true,
      });
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updateEventCategory = createAsyncThunk(
  "eventCategory",
  async ({ id, payload }, { rejectWithValue }) => {
    try {
      const { data } = await instance.patch(`/eventCategory/${id}`, payload, {
        withCredentials: true,
      });
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deleteEventCategory = createAsyncThunk(
  "deleteEventCategory",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await instance.delete(
        `/eventCategory/${payload}`,
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
