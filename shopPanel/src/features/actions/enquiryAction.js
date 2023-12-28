import { createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "../../services/axiosInterceptor";

// shop---- shop action for getting vendor specific shop

export const postEnquiry = createAsyncThunk(
  "/postEnquiry",
  async ({ payload, shopId }, { rejectWithValue }) => {
    try {
      const { data } = await instance.post(`/enquiry/${shopId}`,payload);
      return data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
