// ----------------------------------------------------------------------------------------------------

import { createSlice, current } from "@reduxjs/toolkit";
import { fetchFaqList } from "../actions/faqActions";
import { fetchEventById, fetchEventList } from "../actions/eventActions";

const initialState = {
  isLoading: false,
  isSuccess: false,
  eventData: [],
  //on the basis of location
  filteredEventData: [],
  filteredExploreByChoice: [],
  singleEventData: null,
  errorMessage: "",
};

// ---------------------------------------------------------------------------------------

export const eventsSlice = createSlice({
  name: "event",
  initialState,
  reducers: {
    filterEvent: (state, action) => {
      console.log("payload::", action.payload);
      if (action?.payload?.name != "All") {
        state.filteredEventData = current(state.eventData).filter((item) => {
          return item.venue?.City === action.payload?.name;
        });
      } else {
        state.filteredEventData = state?.eventData;
      }
    },
    // filteredData according to explore by choice
    exploreByChoice: (state, action) => {
      if (action?.payload?.category != "All") {
        state.filteredExploreByChoice = current(
          state?.filteredEventData
        )?.filter(
          (item) => item?.category[0].category === action?.payload?.category
        );
      } else {
        state.filteredExploreByChoice = state.filteredEventData;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch faq List Cases
      .addCase(fetchEventList.pending, (state, action) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.errorMessage = "";
      })
      .addCase(fetchEventList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.errorMessage = "";
        state.eventData = action?.payload?.data
          ? action?.payload?.data
          : action?.payload;
      })
      .addCase(fetchEventList.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.errorMessage = action.payload;
      })
      .addCase(fetchEventById.pending, (state, action) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.errorMessage = "";
      })
      .addCase(fetchEventById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.errorMessage = "";
        state.singleEventData = action?.payload?.data
          ? action?.payload?.data
          : action?.payload;
      })
      .addCase(fetchEventById.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.errorMessage = action.payload;
      });
  },
});

// -------------------------------------------------------------------------

// Action creators are generated for each case reducer function
export const { filterEvent, exploreByChoice } = eventsSlice.actions;
export default eventsSlice.reducer;

// ================================================== THE END ==================================================
