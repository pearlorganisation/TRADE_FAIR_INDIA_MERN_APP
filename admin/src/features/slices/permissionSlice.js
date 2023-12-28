import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import {
  createPermission,
  deletePermission,
  fetchPermissionsList,
  updatePermission,
} from "../actions/permissionActions";

// ----------------------------------------------------------------------------------------------------

const initialState = {
  isLoading: false,
  isSuccess: false,
  errorMessage: "",
  permissionsList: [],
};

export const permissionSlice = createSlice({
  name: "permission",
  initialState,
  reducers: {
    clearReduxStoreData: (state) => {},
  },
  extraReducers: (builder) => {
    builder
      // Fetch Permissions List Cases
      .addCase(fetchPermissionsList.pending, (state, action) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.errorMessage = "";
      })
      .addCase(fetchPermissionsList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.errorMessage = "";
        state.permissionsList = action.payload;
      })
      .addCase(fetchPermissionsList.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.errorMessage = action.payload;
      })

      // Create Permission List Cases
      .addCase(createPermission.pending, (state, action) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.errorMessage = "";
      })
      .addCase(createPermission.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.errorMessage = "";
        toast.success("Permission created successfully", {
          position: "top-right",
        });
      })
      .addCase(createPermission.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.errorMessage = action.payload;
        toast.error(state?.errorMessage, {
          position: "top-right",
        });
      })

      // Update Roles Details Cases
      .addCase(updatePermission.pending, (state, action) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.errorMessage = "";
      })
      .addCase(updatePermission.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.errorMessage = "";
        toast.success("Permission updated successfully", {
          position: "top-right",
        });
      })
      .addCase(updatePermission.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.errorMessage = action.payload;
        toast.error(state?.errorMessage, {
          position: "top-right",
        });
      })

      // Delete Permission Cases
      .addCase(deletePermission.pending, (state, action) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.errorMessage = "";
      })
      .addCase(deletePermission.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.errorMessage = "";

        // Removing Permission From redux's store
        state.permissionsList = state.permissionsList.filter(
          (permission) => permission._id !== action?.payload?.payload
        );

        toast.success("Permission deleted successfully", {
          position: "top-right",
        });
      })
      .addCase(deletePermission.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.errorMessage = action.payload;
        toast.error(state?.errorMessage, {
          position: "top-right",
        });
      });
  },
});

// -------------------------------------------------------------------------

// Action creators are generated for each case reducer function
export const { clearReduxStoreData } = permissionSlice.actions;
export default permissionSlice.reducer;

// ================================================== THE END ==================================================
