import { createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "../../services/axiosInterceptor";

// Get Organuser
export const fetchOrganiserList = createAsyncThunk(
  "organiser/fetchOrganiserList",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await instance.get(`/organiser?limit=${payload?.limit}&page=${payload?.page}`, {
        withCredentials: true,
      });
      return data?.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);






// Create Organiser
export const addOrganiser = createAsyncThunk(
  "organiser/addOrganiser",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await instance.post("/organiser", payload, {
        withCredentials: true,
      });
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

//   Update Organiser
export const updateOrganiserDetails = createAsyncThunk(
  "organiser/updateOrganiserDetails",
  async ({ organiserId, payload }, { rejectWithValue }) => {
    try {
      const { data } = await instance.patch(
        `/organiser/${organiserId}`,
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

//   Delete Organiser
export const deleteOrganiser = createAsyncThunk(
  "organiser/deleteOrganiser",
  async ({ organiserId }, { rejectWithValue }) => {
    try {
      const { data } = await instance.delete(`/organiser/${organiserId}`, {
        withCredentials: true,
      });
      return {
        data,
        id: organiserId,
      };
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

//Single Organiser Deyails
export const fetchIndividualOrganiserDetails = createAsyncThunk(
  "organiser/fetchIndividualOrganiserDetails",
  async (payload, { rejectWithValue }) => {
    try {
      const { data } = await instance.get(`/organiser/${payload}`, payload, {
        withCredentials: true,
      });
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
