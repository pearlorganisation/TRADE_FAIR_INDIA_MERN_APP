import { createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "../../services/axiosInterceptor";
// -----------------------------------------------------------------------------------------------------

export const fetchEventList = createAsyncThunk(
  "event/fetchEventList",
  async ({ search, page }, { rejectWithValue }) => {
    try {
      const { data } = await instance.get(
        `/event?Search=${search || ""}&Page=${page || 1}`,
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

export const addNewEvent = createAsyncThunk(
  "event/addNewEvent",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await instance.post("/event", payload, {
        withCredentials: true,
        headers: {
          "Content-type": "multipart/form-data",
        },
      });
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updateEventDetails = createAsyncThunk(
  "event/updateEventDetails",
  async ({ eventId, payload }, { rejectWithValue }) => {
    try {
      const { data } = await instance.put(`/event/${eventId}`, payload, {
        withCredentials: true,
      });
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deleteEvent = createAsyncThunk(
  "event/deleteEvent",
  async ({ eventId }, { rejectWithValue }) => {
    try {
      const { data } = await instance.delete(`event/${eventId}`, {
        withCredentials: true,
      });
      return { data, id: eventId };
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// ================================================== THE END ==================================================
