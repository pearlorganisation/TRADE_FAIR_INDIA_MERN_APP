import { createSlice } from "@reduxjs/toolkit";
import { postEnquiry } from "../actions/enquiryAction";
import { toast } from "react-toastify";

const initialState = {
  isLoading: false,
  enquiryData: null,
  isError: null,
};

const enquirySlice = createSlice({
    name:'enquiry',
    initialState,
    reducers:{ resetFields: (state, action) => {
        state.isLoading = false;
        state.enquiryData = null;
        state.isError = null;
      },},
    extraReducers: (builder)=>{
        builder
        .addCase(postEnquiry.pending,(state,action)=>{
            state.isLoading = true;
        })
        .addCase(postEnquiry.fulfilled,(state,action)=>{
            state.isLoading = false;
            state.enquiryData = action.payload
            toast.success("Enquiry Successfully Submitted",{position:'top-center'})
        })
        .addCase(postEnquiry.rejected,(state,action)=>{
            state.isLoading = false;
            state.isError = action.payload;
            toast.error(action.payload,{position:'top-center'})
        })
    }
})

export default enquirySlice.reducer
export const { resetFields } = enquirySlice.actions;