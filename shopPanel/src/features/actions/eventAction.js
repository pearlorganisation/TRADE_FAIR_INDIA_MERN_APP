import { createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "../../services/axiosInterceptor";

// get event by uniqueID
export const getEventByUniqueKey = createAsyncThunk(
  "/getEventByUniqueKey",
  async (uniqueKeyOfEvent, { rejectWithValue }) => {
    try {
      const {
        data: { data },
      } = await instance.get(`/event/${uniqueKeyOfEvent}`);
      console.log("data:::",data)

      return data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
