import { createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "../../services/axiosInterceptor";
// -----------------------------------------------------------------------------------------------------

export const fetchFaqList = createAsyncThunk(
  "faq/fetchFaqList",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await instance.get("/faq", payload, {
        withCredentials: true,
      });
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const addNewFaq = createAsyncThunk(
  "faq/addNewFaq",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await instance.post("/faq", payload, {
        withCredentials: true,
      });
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updateFaqDetails = createAsyncThunk(
  "faq/updateFaqDetails",
  async ({ faqId, payload }, { rejectWithValue }) => {
    try {
      const { data } = await instance.put(`/faq/${faqId}`, payload, {
        withCredentials: true,
      });
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deleteFaq = createAsyncThunk(
  "faq/deleteFaq",
  async (faqId , { rejectWithValue }) => {
    try {
      const { data } = await instance.delete(`faq/${faqId}`, {
        withCredentials: true,
      });
      return { data, id: faqId };
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

// ================================================== THE END ==================================================
