// -----------------------------------------------------------------------------------------------------

import { createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "../../service/axiosInterceptor";

export const fetchCategoryList = createAsyncThunk(
  "category/fetchCategory",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await instance.get("/category", {
        withCredentials: true,
      });
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// ================================================== THE END ==================================================
