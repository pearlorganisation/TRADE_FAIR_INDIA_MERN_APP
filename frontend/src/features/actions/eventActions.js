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
        data?.data?.filter(
          (val) =>
            val?.venue?.City?.toString()?.toLowerCase() ===
            cityName?.toString()?.toLowerCase()
        );
      console.log("filteredData:: ", filteredData);
      return Array.isArray(filteredData) && filteredData?.length > 0
        ? filteredData
        : actualData;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// ================================================== THE END ==================================================
