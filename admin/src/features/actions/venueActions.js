import { createAsyncThunk } from "@reduxjs/toolkit";
import { instance } from "../../services/axiosInterceptor";
// -----------------------------------------------------------------------------------------------------

export const fetchVenuesList = createAsyncThunk(
  "venue/fetchVenuesList",
  async ({ search, page, limit }, { rejectWithValue }) => {
    try {
      const { data } = await instance.get(
        `/venue?Search=${search || ""}&Page=${page || 1}&Limit=${limit || 10}`,
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

export const addNewVenue = createAsyncThunk(
  "venue/addNewVenue",
  async ({ payload }, { rejectWithValue }) => {
    try {
      const { data } = await instance.post("/venue", payload, {
        withCredentials: true,
      });
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updateVenueDetails = createAsyncThunk(
  "venue/updateVenueDetails",
  async ({ venueId, payload }, { rejectWithValue }) => {
    try {
      const { data } = await instance.put(`/venue/${venueId}`, payload, {
        withCredentials: true,
      });
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deleteVenue = createAsyncThunk(
  "venue/deleteVenue",
  async ({ venueId }, { rejectWithValue }) => {
    try {
      const { data } = await instance.delete(`venue/${venueId}`, {
        withCredentials: true,
      });
      return { data, id: venueId };
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const fetchIndividualVenueDetails = createAsyncThunk(
  "venue/fetchIndividualVenueDetails",
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
