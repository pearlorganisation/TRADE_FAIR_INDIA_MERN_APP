// -----------------------------------------------------------------------------------------------------

import { createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "../../service/axiosInterceptor";

export const fetchFaqList = createAsyncThunk(
  "faq/fetchFaqList",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await instance.get("/faq", {
        withCredentials: true,
      });
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// ================================================== THE END ==================================================
