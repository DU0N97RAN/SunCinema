import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { filmFormatApi } from "../../service/formatApi";

export const getAllData = createAsyncThunk<any, void, { rejectValue: string }>(
   "format/getAllData",
   async (_, { rejectWithValue }) => {
      try {
         const { data } = await filmFormatApi.getAll();
         return data;
      } catch (error: any) {
         return rejectWithValue(error.response.data);
      }
   }
);
export const removeData = createAsyncThunk<any, any, { rejectValue: string }
>("format/removeData", async (id, { rejectWithValue }) => {
   try {
      const { data } = await filmFormatApi.removeApi(id);
      return data.room;
   } catch (error: any) {
      return rejectWithValue(error.response.data);
   }
});
export const updateData = createAsyncThunk<any, any, { rejectValue: string }>(
   "format/updateData",
   async (input, { rejectWithValue }) => {
      try {
         const { data } = await filmFormatApi.updateApi(input);
         return data;
      } catch (error: any) {
         return rejectWithValue(error.response.data);
      }
   }
);

export const createData = createAsyncThunk<any, any, { rejectValue: string }>(
   "format/createfilmFormats",
   async (input, { rejectWithValue }) => {
      try {
         const {data} = await filmFormatApi.create(input);
         return data;
      } catch (error: any) {
         return rejectWithValue(error.response.data);
      }
   }
);
type filmFormatstate = {
   filmFormats: any[];
   isFetching: boolean;
   isSucess: boolean;
   isErr: boolean;
   errorMessage: string | undefined;
};
const initialState: filmFormatstate = {
   filmFormats: [],
   isFetching: false,
   isSucess: false,
   isErr: false,
   errorMessage: "",
};

const FormatSlice = createSlice({
   name: "format",
   initialState,
   reducers: {
   },
   extraReducers: (builder) => {
      //getAll
      builder.addCase(getAllData.pending, (state) => {
         state.isFetching = true;
      });
      builder.addCase(getAllData.fulfilled, (state, { payload }) => {
         state.filmFormats = payload;
         state.isFetching = false;
      });
      builder.addCase(getAllData.rejected, (state, { payload }) => {
         state.isFetching = false;
         state.errorMessage = payload;
      });

      // delete
      builder.addCase(removeData.pending, (state) => {
         state.isFetching = true;
         state.isErr = false;
         state.isSucess = false;
      });
      builder.addCase(removeData.fulfilled, (state, action) => {
         state.isFetching = false;
         state.isErr = false;
         state.isSucess = true;
         state.filmFormats = state.filmFormats.filter((item) => item._id !== action.meta.arg);
      });
      builder.addCase(removeData.rejected, (state, { payload }) => {
         state.isErr = true;
         state.isFetching = false;
         state.isSucess = false;
         state.errorMessage = payload;
      });

      //create
      builder.addCase(createData.pending, (state) => {
         state.isFetching = true;
         state.isSucess = false;
         state.isErr = false;
      });
      builder.addCase(createData.fulfilled, (state, { payload }) => {
         state.isFetching = false;
         state.isSucess = true;
         state.isErr = false;
         state.filmFormats.push(payload);
      });
      builder.addCase(createData.rejected, (state, { payload }) => {
         state.isFetching = false;
         state.isSucess = false;
         state.isErr = true;
         state.errorMessage = payload;
      });

      //update
      builder.addCase(updateData.pending, (state) => {
         state.isFetching = true;
      });
      builder.addCase(updateData.fulfilled, (state, action) => {
         state.isFetching = false;
         state.isSucess = true;
         state.filmFormats = state.filmFormats.map((item) =>
            item._id !== action.payload._id ? item : action.payload
         );
      });
      builder.addCase(updateData.rejected, (state, action) => {
         state.isFetching = false;
         state.errorMessage = action.payload;
      });
   },
});

export default FormatSlice.reducer;
