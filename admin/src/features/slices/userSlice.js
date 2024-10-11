import { createSlice } from "@reduxjs/toolkit";
import {
  createUser,
  deleteUser,
  fetchUsersList,
  manageUserActivationDeactivation,
  updateUserDetails,
} from "../actions/userActions";
import { toast } from "react-toastify";

// ----------------------------------------------------------------------------------------------------

const initialState = {
  isLoading: false,
  isSuccess: false,
  errorMessage: "",
  usersList: [],
  isUserStatusUpdated: false,
  totalPages: 1,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearReduxStoreData: (state) => {},
  },
  extraReducers: (builder) => {
    builder
      // Fetch Users List Cases
      .addCase(fetchUsersList.pending, (state, action) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.errorMessage = "";
      })
      .addCase(fetchUsersList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.errorMessage = "";
        state.totalPages = action.payload.totalPage;
        state.usersList = action.payload?.data;
      })
      .addCase(fetchUsersList.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;

        state.errorMessage = action.payload;
      })

      // Create User List Cases
      .addCase(createUser.pending, (state, action) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.errorMessage = "";
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.errorMessage = "";
        toast.success("User created successfully", {
          position: "top-right",
        });
      })
      .addCase(createUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.errorMessage = action.payload;
        toast.error(state?.errorMessage, {
          position: "top-right",
        });
      })

      // Update Users Details Cases
      .addCase(updateUserDetails.pending, (state, action) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.errorMessage = "";
      })
      .addCase(updateUserDetails.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.errorMessage = "";
        toast.success("User details updated successfully", {
          position: "top-right",
        });
      })
      .addCase(updateUserDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.errorMessage = action.payload;
        toast.error(state?.errorMessage, {
          position: "top-right",
        });
      })

      // Delete User Cases
      .addCase(deleteUser.pending, (state, action) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.errorMessage = "";
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.errorMessage = "";

        // Removing User From redux's store
        state.usersList = state.usersList.filter(
          (user) => user._id !== action?.payload?.payload
        );

        toast.success("User deleted successfully", {
          position: "top-right",
        });
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.errorMessage = action.payload;

        toast.error(state?.errorMessage, {
          position: "top-right",
        });
      })
      // Update Users Activation Status Cases
      .addCase(manageUserActivationDeactivation.pending, (state, action) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.errorMessage = "";
        state.isUserStatusUpdated = false;
      })
      .addCase(manageUserActivationDeactivation.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.errorMessage = "";
        state.isUserStatusUpdated = true;
        toast.success("User's Activation Status Updated successfully", {
          position: "top-right",
        });
      })
      .addCase(manageUserActivationDeactivation.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.errorMessage = action.payload;
        state.isUserStatusUpdated = false;
        toast.error(state?.errorMessage, {
          position: "top-right",
        });
      });
  },
});

// -------------------------------------------------------------------------

// Action creators are generated for each case reducer function
export const { clearReduxStoreData } = userSlice.actions;
export default userSlice.reducer;

// ================================================== THE END ==================================================
