import { createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "../../services/axiosInterceptor";

// -----------------------------------------------------------------------------------------------------

export const fetchCategoriesList = createAsyncThunk(
  "category/fetchCategoriesList",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await instance.get("/category", payload, {
        withCredentials: true,
        headers: {
          "content-type": "application/x-www-form-urlencoded;charset=utf-8",
        },
      });
      return data?.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deleteCategory = createAsyncThunk(
  "category/deleteCategoriesList",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await instance.delete(`/category/${id}`, {
        withCredentials: true,
      });
      return { id: id, data };
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const addNewCategory = createAsyncThunk(
  "category/addCategoriesList",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await instance.post("/category", payload, {
        withCredentials: true,
      });
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const fetchIndividualCategoryDetails = createAsyncThunk(
  "shop/fetchIndividualCategoryDetails",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await instance.get(`/category/${payload}`, payload, {
        withCredentials: true,
      });
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updateCategoryDetails = createAsyncThunk(
  "shop/updateCategoryDetails",
  async ({ id, newData }, { rejectWithValue }) => {
    try {
      const { data } = await instance.patch(`/category/${id}`, newData, {
        withCredentials: true,
      });
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
// ================================================== THE END ==================================================
