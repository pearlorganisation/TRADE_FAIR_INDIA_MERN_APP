// -----------------------------------------------------------------------------------------------------

import { createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "../../service/axiosInterceptor";

export const fetchListYourLink = createAsyncThunk(
  "link/fetchListYourLink",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await instance.get("/eventUrl", {
        withCredentials: true,
      });
      return data?.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// ================================================== THE END ==================================================
