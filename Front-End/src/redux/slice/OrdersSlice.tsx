import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { orderApi } from "../../service/orders";

export const createOrder = createAsyncThunk(
  "order/add",
  async (item: any, { rejectWithValue }) => {
    try {
      const { data } = await orderApi.create(item);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const createPaymeny = createAsyncThunk(
  "order/createPaymeny",
  async (item: any, { rejectWithValue }) => {
    try {
      const { data } = await orderApi.createPayment(item);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const getAllOrders = createAsyncThunk(
  "order/getAllOrders",
  async (_: any, { rejectWithValue }) => {
    try {
      const { data } = await orderApi.getAllOrder();
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const getOneOrder = createAsyncThunk(
  "order/getOneOrder",
  async (input: any, { rejectWithValue }) => {
    try {
      const { data } = await orderApi.getOne(input);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const getByShortId = createAsyncThunk(
  "order/getByShortId",
  async (input: any, { rejectWithValue }) => {
    try {
      const { data } = await orderApi.getByShortId(input);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const updateOrder = createAsyncThunk(
  "order/updateOrder",
  async (input: any, { rejectWithValue }) => {
    try {
      const { data } = await orderApi.updateOrder(input);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  },
);

export const getDashboardData = createAsyncThunk(
  "order/getDashboardData",
  async (_: any, { rejectWithValue }) => {
    try {
      const { data } = await orderApi.getDashBoardData();
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const exportTicketThunk = createAsyncThunk(
  "order/exportTicketThunk",
  async (input: any, { rejectWithValue }) => {
    try {
      const { data } = await orderApi.exportOrderTicket(input);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);
const initialState: any = {
  orders: [],
  order: {},
  exportData: {},
  loading: false,
  msg: ""
};
const OrderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // create
    builder.addCase(createOrder.fulfilled, (state, action) => {
      state.orders.push(action.payload);
    });
    //list
    builder.addCase(getAllOrders.fulfilled, (state, action) => {
      state.orders = action.payload;
    });
    builder.addCase(getOneOrder.fulfilled, (state, action) => {
      state.order = action.payload;
    });
    builder.addCase(createPaymeny.fulfilled, (state, action) => {
      state.orders.push(action.payload);
    });
    builder.addCase(getByShortId.fulfilled, (state, action) => {
      state.order = action.payload;
    });
    builder.addCase(updateOrder.fulfilled, (state, action) => {
      state.orders = state.orders.filter((item: any) => item._id !== action?.payload._id);
    });
    builder.addCase(getDashboardData.fulfilled, (state, action) => {
      state.dataPayload = action.payload;
    });
    builder.addCase(exportTicketThunk.fulfilled, (state, { payload }) => {
      state.orders = state.orders.map((item: any) =>  item._id !== payload._id ? item : payload)
    })
    builder.addCase(exportTicketThunk.rejected, (state, { payload }) => {
      state.msg = payload
    })
    builder.addCase(exportTicketThunk.pending, (state, { payload }) => {
      state.loading = true
    })
  },
});

export default OrderSlice.reducer;
