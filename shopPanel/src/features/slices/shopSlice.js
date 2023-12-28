import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { getOwenerShop, getShopById, getVendorShop } from "../actions/shopActions";

const initialState = {
  isLoading: false,
  shopData: null,
  errorMessage: "",
  error: false,
};

const shopSlice = createSlice({
  name: "shop",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getOwenerShop.pending, (state, action) => {
        state.isLoading = true;
        state.shopData = null;
        state.errorMessage = "";
        state.error = false;
      })
      .addCase(getOwenerShop.fulfilled, (state, action) => {
        state.isLoading = false;
        console.log(action.payload)
        state.shopData = action.payload;
        state.errorMessage = "";
      })
      .addCase(getOwenerShop.rejected, (state, action) => {
        state.isLoading = false;
        state.shopData = null;
        state.error = true;
        toast.error(action?.payload,{position:'top-center'})
        state.errorMessage = action.payload;
      })

      .addCase(getVendorShop.pending, (state, action) => {
        state.isLoading = true;
        state.shopData = null;
        state.errorMessage = "";
        state.error = false;
      })
      .addCase(getVendorShop.fulfilled, (state, action) => {
        state.isLoading = false;
        console.log(action.payload)
        state.shopData = action.payload;
        state.errorMessage = "";
      })
      .addCase(getVendorShop.rejected, (state, action) => {
        state.isLoading = false;
        state.shopData = null;
        state.error = true;
        toast.error(action?.payload,{position:'top-center'})
        state.errorMessage = action.payload;
      })


      // getShopById
      .addCase(getShopById.pending, (state, action) => {
        state.isLoading = true;
        state.shopData = null;
        state.errorMessage = "";
        state.error = false;
      })
      .addCase(getShopById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.shopData = action.payload;
        state.errorMessage = "";
        state.error = true;
      })
      .addCase(getShopById.rejected, (state, action) => {
        state.isLoading = false;
        state.shopData = null;
        state.error = true;
        state.errorMessage = action.payload;
      })
  },
});

export default shopSlice.reducer;
