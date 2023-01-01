import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { showTimetApi } from "../../service/showTime";

export const getAlSt = createAsyncThunk<any, any, { rejectValue: string }>(
   "st/getAlSt",
   async (options, { rejectWithValue }) => {
      try {
         const { data } = await showTimetApi.getAll(options);
         return data;
      } catch (error: any) {
         return rejectWithValue(error.response.data);
      }
   }
);
export const removeData = createAsyncThunk<any, any, { rejectValue: string }
>("st/removeData", async (id, { rejectWithValue }) => {
   try {
      const { data } = await showTimetApi.removeApi(id);
      return data.room;
   } catch (error: any) {
      return rejectWithValue(error.response.data);
   }
});
export const updateData = createAsyncThunk<any, any, { rejectValue: string }>(
   "st/updateData",
   async (input, { rejectWithValue }) => {
      try {
         const { data } = await showTimetApi.updateApi(input);
         return data;
      } catch (error: any) {
         return rejectWithValue(error.response.data);
      }
   }
);

export const createData = createAsyncThunk<any, any, { rejectValue: string }>(
   "st/create",
   async (input, { rejectWithValue }) => {
      try {
         const { data } = await showTimetApi.create(input);
         return data;
      } catch (error: any) {
         return rejectWithValue(error.response.data);
      }
   }
);
type showTimeState = {
   stList: any[];
   errorMessage: string | undefined;
};
const initialState: showTimeState = {
   stList: [],
   errorMessage: "",
};

const ShowTimeSlice = createSlice({
   name: "st",
   initialState,
   reducers: {
   },
   extraReducers: (builder) => {
      //getAll

      builder.addCase(getAlSt.fulfilled, (state, { payload }) => {
         state.stList = payload;
      });
      builder.addCase(getAlSt.rejected, (state, { payload }) => {
         state.errorMessage = payload;
      });

      // delete

      builder.addCase(removeData.fulfilled, (state, action) => {

         state.stList = state.stList.filter((item) => item._id !== action.meta.arg);
      });
      builder.addCase(removeData.rejected, (state, { payload }) => {
         state.errorMessage = payload;
      });

      //create

      builder.addCase(createData.fulfilled, (state, { payload }) => {
         state.stList.push(payload);
      });
      builder.addCase(createData.rejected, (state, { payload }) => {
         state.errorMessage = payload;
      });

      //update

      builder.addCase(updateData.fulfilled, (state, action) => {
       
      });
      builder.addCase(updateData.rejected, (state, action) => {
         state.errorMessage = action.payload;
      });
   },
});
export default ShowTimeSlice.reducer;
