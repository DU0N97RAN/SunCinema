import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { foodDetailApi } from "../../service/FoodDetail";

export const createFD = createAsyncThunk(
   "FD/createFD",
   async (item: any, { rejectWithValue }) => {
     try {
       const { data } = await foodDetailApi.createFoodDetail(item);
       return data;
     } catch (error: any) {
       return rejectWithValue(error.response.data);
     }
   }
 );

 type FDState = {
   Fds: any[];
   isFetching:boolean;
   errorMessage: string | undefined;
 };
 const initialState: FDState = {
   Fds: [],
   isFetching: false,
   errorMessage: "",
 };
 
const roomSlice = createSlice({
   name: "rooms",
   initialState,
   reducers: {
   },
   extraReducers: (builder) => {
   
     //create
     builder.addCase(createFD.pending, (state) => {
       state.isFetching = true;
     });
     builder.addCase(createFD.fulfilled, (state, { payload }) => {
       state.isFetching = false;
       state.Fds.push(payload);
     });
     builder.addCase(createFD.rejected, (state, { payload }) => {
       state.isFetching = false;
     });

   },
 });
 
 export default roomSlice.reducer;