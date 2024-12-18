// -----------------------------------------------------------------------------------------------------

import { createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "../../service/axiosInterceptor";

export const fetchSubBanner = createAsyncThunk(
  "subBanner/fetchSubBanner",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await instance.get("/clientSubBanner", {
        withCredentials: true,
      });
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// ================================================== THE END ==================================================
