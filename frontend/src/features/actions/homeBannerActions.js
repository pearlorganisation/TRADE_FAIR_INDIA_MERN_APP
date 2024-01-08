// -----------------------------------------------------------------------------------------------------

import { createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "../../service/axiosInterceptor";

export const fetchHomeBanner = createAsyncThunk(
  "homeBanner/fetchBanner",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await instance.get("/clientBanner", {
        withCredentials: true,
      });
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// ================================================== THE END ==================================================
