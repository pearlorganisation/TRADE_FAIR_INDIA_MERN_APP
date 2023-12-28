import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import {
  createRole,
  deleteRole,
  fetchRolesList,
  updateRole,
} from "../actions/roleActions";

// ----------------------------------------------------------------------------------------------------

const initialState = {
  isLoading: false,
  isSuccess: false,
  errorMessage: "",
  rolesList: [],
};

export const roleSlice = createSlice({
  name: "role",
  initialState,
  reducers: {
    clearReduxStoreData: (state) => {},
  },
  extraReducers: (builder) => {
    builder
      // Fetch Roles List Cases
      .addCase(fetchRolesList.pending, (state, action) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.errorMessage = "";
      })
      .addCase(fetchRolesList.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.errorMessage = "";
        state.rolesList = action.payload;
      })
      .addCase(fetchRolesList.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.errorMessage = action.payload;
      })
      // Create Role List Cases
      .addCase(createRole.pending, (state, action) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.errorMessage = "";
      })
      .addCase(createRole.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.errorMessage = "";
        toast.success("Role created successfully", {
          position: "top-right",
        });
      })
      .addCase(createRole.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.errorMessage = action.payload;
        toast.error(state?.errorMessage, {
          position: "top-right",
        });
      })

      // Update Roles Details Cases
      .addCase(updateRole.pending, (state, action) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.errorMessage = "";
      })
      .addCase(updateRole.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.errorMessage = "";
        toast.success("Role updated successfully", {
          position: "top-right",
        });
      })
      .addCase(updateRole.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.errorMessage = action.payload;
        toast.error(state?.errorMessage, {
          position: "top-right",
        });
      })

      // Delete Role Cases
      .addCase(deleteRole.pending, (state, action) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.errorMessage = "";
      })
      .addCase(deleteRole.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.errorMessage = "";

        // Removing Role From redux's store
        state.rolesList = state.rolesList.filter(
          (role) => role._id !== action?.payload?.payload
        );

        toast.success("Role deleted successfully", {
          position: "top-right",
        });
      })
      .addCase(deleteRole.rejected, (state, action) => {
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
export const { clearReduxStoreData } = roleSlice.actions;
export default roleSlice.reducer;

// ================================================== THE END ==================================================
