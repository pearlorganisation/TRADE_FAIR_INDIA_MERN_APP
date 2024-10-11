import { createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "../../services/axiosInterceptor";
import { toast } from "react-toastify";
// -----------------------------------------------------------------------------------------------------

export const fetchShopsList = createAsyncThunk(
  "shop/fetchShopsList",
  async ({ search, page }, { rejectWithValue }) => {
    try {
      const { data } = await instance.get(
        `/shopRegistration?Search=${search || ""}&Page=${page || 1}`,
        {
          withCredentials: true,
        }
      );

      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export const addNewShop = createAsyncThunk(
  "shop/addNewShop",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await instance.post("/shopRegistration", payload, {
        withCredentials: true,
        headers: {
          "Content-type": "multipart/form-data",
        },
      });

      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updateShopDetails = createAsyncThunk(
  "shop/updateShopDetails",
  async ({ shopId, payload }, { rejectWithValue }) => {
    try {
      const { data } = await instance.patch(
        `/shopRegistration/${shopId}`,
        payload,
        {
          withCredentials: true,
          headers: {
            "Content-type": "multipart/form-data",
          },
        }
      );
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deleteShop = createAsyncThunk(
  "shop/deleteShop",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await instance.delete(
        `/shopRegistration/${payload}`,
        payload,
        {
          withCredentials: true,
        }
      );
      return { data, payload };
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const fetchIndividualShopDetails = createAsyncThunk(
  "shop/fetchIndividualShopDetails",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await instance.get(
        `/shopRegistration/${payload}`,
        payload,
        {
          withCredentials: true,
        }
      );
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// ================================================== THE END ==================================================
