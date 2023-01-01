import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { webConfigApi } from "../../service/webConfig";

export const getConfigs = createAsyncThunk<any, void, { rejectValue: string }>(
   "wc/getConfigs",
   async (_, { rejectWithValue }) => {
      try {
         const { data } = await webConfigApi.getAll();
         return data;
      } catch (error: any) {
         return rejectWithValue(error.response.data);
      }
   }
);

export const updateData = createAsyncThunk<any, any, { rejectValue: string }>(
   "wc/updateData",
   async (input, { rejectWithValue }) => {
      try {
         const { data } = await webConfigApi.updateApi(input);
         return data;
      } catch (error: any) {
         return rejectWithValue(error.response.data);
      }
   }
);

export const createData = createAsyncThunk<any, any, { rejectValue: string }>(
   "wc/create",
   async (input, { rejectWithValue }) => {
      try {
         const { data } = await webConfigApi.create(input);
         return data;
      } catch (error: any) {
         console.log(error);
         
         return rejectWithValue(error.response.data.message);
      }
   }
);
type webConfigsliceState = {
   webConfigs: any[];
   loading: boolean,
   errorMessage: string | undefined;
};
const initialState: webConfigsliceState = {
   webConfigs: [],
   loading: false,
   errorMessage: "",
};

const WebConfigSlice = createSlice({
   name: "webConfig",
   initialState,
   reducers: {
   },
   extraReducers: (builder) => {
      //getAll

      builder.addCase(getConfigs.fulfilled, (state, { payload }) => {
         state.webConfigs = payload;
         state.loading = false;
      });
      builder.addCase(getConfigs.rejected, (state, { payload }) => {
         state.errorMessage = payload;
         state.loading = false;
      });
      builder.addCase(getConfigs.pending, (state, { payload }) => {
         state.loading = true;
      });
      
      //create

      builder.addCase(createData.fulfilled, (state, { payload }) => {
         state.webConfigs.push(payload);
      });
      builder.addCase(createData.rejected, (state, { payload }) => {
         state.errorMessage = payload;
      });

      //update

      builder.addCase(updateData.fulfilled, (state, action) => {

         state.webConfigs = state.webConfigs.map((item) =>
            item._id !== action.payload._id ? item : action.payload
         );
      });
      builder.addCase(updateData.rejected, (state, action) => {
         state.errorMessage = action.payload;
      });
   },
});

export default WebConfigSlice.reducer;
