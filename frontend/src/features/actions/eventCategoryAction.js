// -----------------------------------------------------------------------------------------------------

import { createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "../../service/axiosInterceptor";

export const fetchEventCategoryList = createAsyncThunk(
  "event/fetchEventCategory",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await instance.get("/eventCategory", {
        withCredentials: true,
      });
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// ================================================== THE END ==================================================
