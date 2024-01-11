// -----------------------------------------------------------------------------------------------------

import { createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "../../service/axiosInterceptor";

export const fetchEventList = createAsyncThunk(
  "event/fetchEvent",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await instance.get("/event", {
        withCredentials: true,
      });
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);



// ================================================== THE END ==================================================
