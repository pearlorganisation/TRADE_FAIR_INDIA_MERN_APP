// -----------------------------------------------------------------------------------------------------

import { createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "../../service/axiosInterceptor";

export const fetchVenue = createAsyncThunk(
  "venue/fetchVenue",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await instance.get("/venue", {
        withCredentials: true,
      });
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// ================================================== THE END ==================================================
