import { createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "../../services/axiosInterceptor";
// -----------------------------------------------------------------------------------------------------

export const fetchListYourEventLink = createAsyncThunk(
  "link/fetchListYourEventLink",
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
export const createListYourEventLink = createAsyncThunk(
  "link/createListYourEventLink",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await instance.post("/eventUrl", payload, {
        withCredentials: true,
      });
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// ================================================== THE END ==================================================
