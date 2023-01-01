import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { TicketApi } from "../../service/ticket";
import { TicketDetailApi } from "../../service/ticketDetail";

export const getTicketDetails = createAsyncThunk<
  any,
  void,
  { rejectValue: string }
>("TicketDetail/getTicket", async (_, { rejectWithValue }) => {
  try {
    const { data } = await TicketDetailApi.getAll();
    return data;
  } catch (error: any) {
    return rejectWithValue(error.response.data);
  }
});
export const removeTicketDetail = createAsyncThunk(
  "TicketDetail/removeTicket",
  async (id: any, { rejectWithValue }) => {
    try {
      const { data } = await TicketDetailApi.removeTiketDetail(id);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const updateTiketDetail = createAsyncThunk<
  any,
  any,
  { rejectValue: string }
>("TicketDetail/updateTicket", async (ticket, { rejectWithValue }) => {
  try {
    const { data } = await TicketDetailApi.updateTiketDetail(ticket);
    return data;
  } catch (error: any) {
    return rejectWithValue(error.response.data);
  }
});

export const createTicketDetail = createAsyncThunk<
  any,
  any,
  { rejectValue: string }
>("TicketDetail/createTicket", async (ticket, { rejectWithValue }) => {
  try {
    const { data } = await TicketDetailApi.createTiketDetail(ticket);
    return data;
  } catch (error: any) {
    return rejectWithValue(error.response.data);
  }
});
export const ticketDetailByShowTime = createAsyncThunk(
  "TicketDetail/getTicketByShowTime",
  async (id: any, { rejectWithValue }) => {
    try {
      const { data } = await TicketDetailApi.getTicketDetailByShowTime(id);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);
const initialState: any = {
  ticketDetails: [],
  ticketByShowTime: [],
};

const tiketDetailSlice = createSlice({
  name: "ticketDetail",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //getAll
    builder.addCase(getTicketDetails.fulfilled, (state, { payload }) => {
      state.ticketDetails = payload;
    });

    // delete
    builder.addCase(removeTicketDetail.fulfilled, (state, action) => {
      state.isErr = false;
      state.isFetching = false;
      state.isSucess = true;
      state.ticketDetails = state.ticketDetails.filter(
        (item: any) => item._id !== action.payload
      );
    });
    //create
    builder.addCase(createTicketDetail.fulfilled, (state, { payload }) => {
      state.ticketDetails.push(payload);
    });

    //update
    builder.addCase(updateTiketDetail.fulfilled, (state, action) => {
      state.ticketDetails = state.ticketDetails.map((item: any) => {
        if (item._id !== action.payload._id) {
          return item;
        }
        return action.payload;
      });
    });
    // ticket by showtime
    builder.addCase(ticketDetailByShowTime.fulfilled, (state, { payload }) => {
      state.ticketByShowTime = payload;
    });
  },
});
export default tiketDetailSlice.reducer;
