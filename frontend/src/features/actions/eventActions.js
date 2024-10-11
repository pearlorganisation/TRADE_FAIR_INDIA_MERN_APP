// -----------------------------------------------------------------------------------------------------

import { createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "../../service/axiosInterceptor";

export const fetchEventList = createAsyncThunk(
  "event/fetchEvent",
  async (cityName, { rejectWithValue }) => {
    try {
      const { data } = await instance.get("/event?Limit=infinite", {
        withCredentials: true,
      });
      console.log("cityName::: ", cityName);
      console.log("data::: ", data?.data);

      const actualData = { ...data };
      return actualData;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const fetchEventById = createAsyncThunk(
  "event/fetchEventById",
  async ({ eventId }, { rejectWithValue }) => {
    try {
      const { data } = await instance.get(`/event/${eventId}`, {
        withCredentials: true,
      });

      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// ================================================== THE END ==================================================
