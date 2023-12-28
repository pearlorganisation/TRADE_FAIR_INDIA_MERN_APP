import { createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "../../services/axiosInterceptor";

// shop---- shop action for getting vendor specific shop

// get owner shop
export const getOwenerShop = createAsyncThunk(
  "/owner/shop",
  async ({email}, { rejectWithValue }) => {
    try {
      const { data } = await instance.get(`/owner/shop/${email}`);

      return data?.Data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
// get vendor shop
export const getVendorShop = createAsyncThunk(
  "/vendor/shop",
  async ({id}, { rejectWithValue }) => {
    try {
      const {data} = await instance.get(`/vendor/shop/${id}`);
      console.log(data)

      return data?.Data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

// get shop by id
export const getShopById = createAsyncThunk(
  "/getShopById",
  async (shopId, { rejectWithValue }) => {
    try {
      const {
        data: { data },
      } = await instance.get(`/shopRegistration/${shopId}`);

      return data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
