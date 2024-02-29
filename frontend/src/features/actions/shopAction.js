// -----------------------------------------------------------------------------------------------------

import { createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "../../service/axiosInterceptor";

export const fetchShopByUniqueKey = createAsyncThunk(
  "shop/fetchShopByUniqueKey",
  async ({ uniqueKey }, { rejectWithValue }) => {
    try {
      const { data } = await instance.get(`/shopRegistration/${uniqueKey}`, {
        withCredentials: true,
      });
      return data?.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// ================================================== THE END ==================================================
