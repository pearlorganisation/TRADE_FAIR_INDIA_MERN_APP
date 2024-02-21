import { createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "../../service/axiosInterceptor";

// shop---- shop action for getting vendor specific shop

export const postEnquiry = createAsyncThunk(
  "/postEnquiry",
  async ({ payload, shopId }, { rejectWithValue }) => {
    console.log("working");
    try {
      const {data} = await instance.post(`/enquiry/${shopId}`, payload);
      console.log(data);
      return data;
    } catch (err) {
      console.log("err::", err);
      return rejectWithValue(err.message);
    }
  }
);
