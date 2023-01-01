import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { voucherApi } from "../../service/voucherApi";

export const getAlVc = createAsyncThunk<any, void, { rejectValue: string }>(
   "vc/getAlVc",
   async (_, { rejectWithValue }) => {
      try {
         const { data } = await voucherApi.getAll();
         return data;
      } catch (error: any) {
         return rejectWithValue(error.response.data);
      }
   }
);
export const removeData = createAsyncThunk<any, any, { rejectValue: string }
>("vc/removeData", async (id, { rejectWithValue }) => {
   try {
      const { data } = await voucherApi.removeApi(id);
      return data.room;
   } catch (error: any) {
      return rejectWithValue(error.response.data);
   }
});
export const updateData = createAsyncThunk<any, any, { rejectValue: string }>(
   "vc/updateData",
   async (input, { rejectWithValue }) => {
      try {
         const { data } = await voucherApi.updateApi(input);
         return data;
      } catch (error: any) {
         return rejectWithValue(error.response.data);
      }
   }
);

export const createData = createAsyncThunk<any, any, { rejectValue: string }>(
   "vc/create",
   async (input, { rejectWithValue }) => {
      try {
         const { data } = await voucherApi.create(input);
         return data;
      } catch (error: any) {
         return rejectWithValue(error.response.data.message);
      }
   }
);
type VoucherSliceState = {
   vouchers: any[];
   errorMessage: string | undefined;
   discountVoucher:any
};
const initialState: VoucherSliceState = {
   vouchers: [],
   errorMessage: "",
   discountVoucher: 0
};

const VoucherSlice = createSlice({
   name: "vouchers",
   initialState,
   reducers: {
      saveVoucherDiscount(state, payload) {
         state.discountVoucher = payload
       },
   },
   extraReducers: (builder) => {
      //getAll

      builder.addCase(getAlVc.fulfilled, (state, { payload }) => {
         state.vouchers = payload;
      });
      builder.addCase(getAlVc.rejected, (state, { payload }) => {
         state.errorMessage = payload;
      });

      // delete

      builder.addCase(removeData.fulfilled, (state, action) => {

         state.vouchers = state.vouchers.filter((item) => item._id !== action.meta.arg);
      });
      builder.addCase(removeData.rejected, (state, { payload }) => {
         state.errorMessage = payload;
      });

      //create

      builder.addCase(createData.fulfilled, (state, { payload }) => {
         state.vouchers.push(payload);
      });
      builder.addCase(createData.rejected, (state, { payload }) => {
         state.errorMessage = payload;
      });

      //update

      builder.addCase(updateData.fulfilled, (state, action) => {

         state.vouchers = state.vouchers.map((item) =>
            item._id !== action.payload._id ? item : action.payload
         );
      });
      builder.addCase(updateData.rejected, (state, action) => {
         state.errorMessage = action.payload;
      });
   },
});
export const { saveVoucherDiscount } = VoucherSlice.actions
export default VoucherSlice.reducer;
