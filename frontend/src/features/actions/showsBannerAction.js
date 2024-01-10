// -----------------------------------------------------------------------------------------------------

import { createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "../../service/axiosInterceptor";

export const fetchShowsBanner = createAsyncThunk(
  "showsEventBanner/fetchShowsEventBanner",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await instance.get("/eventBanner", {
        withCredentials: true,
      });
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// ================================================== THE END ==================================================
