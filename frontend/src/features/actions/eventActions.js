// -----------------------------------------------------------------------------------------------------

import { createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "../../service/axiosInterceptor";

export const fetchEventList = createAsyncThunk(
  "event/fetchEvent",
  async (cityName, { rejectWithValue }) => {
    try {
      const { data } = await instance.get("/event", {
        withCredentials: true,
      });
      console.log("cityName::: ", cityName);
      console.log("data::: ", data?.data);

      const actualData = { ...data };
      const filteredData =
        Array.isArray(data?.data) &&
        data?.data?.length > 0 &&
        data?.data?.filter((val) => val?.venue?.City === cityName);
      console.log("filteredData:: ", filteredData);
      return filteredData ? filteredData : actualData;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// ================================================== THE END ==================================================
