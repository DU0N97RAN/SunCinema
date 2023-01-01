import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { TicketApi } from "../../service/ticket";

export const getTicket = createAsyncThunk<any, void, { rejectValue: string }>(
  "tickets/getTicket",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await TicketApi.getAll();
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const removeTicket = createAsyncThunk(
  "tickets/removeTicket",
  async (id: any, { rejectWithValue }) => {
    try {
      const { data } = await TicketApi.removeTiket(id);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const updateTiket = createAsyncThunk<any, any, { rejectValue: string }>(
  "tickets/updateTicket",
  async (tiket, { rejectWithValue }) => {
    try {
      const { data } = await TicketApi.updateTiket(tiket);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const createTicket = createAsyncThunk<any, any, { rejectValue: string }>(
  "tickets/createTicket",
  async (tiket, { rejectWithValue }) => {
    try {
      const { data } = await TicketApi.createTiket(tiket);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const getticketDetailById = createAsyncThunk<any, any, { rejectValue: string }>(
  "tickets/getticketDetailById",
  async (tiket, { rejectWithValue }) => {
    try {
      const { data } = await TicketApi.getticketDetailById(tiket);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);
type TicketState = {
  tickets: any[];
  ticket:any;
  isFetching: boolean;
  isSucess: boolean;
  isErr: boolean;
  errorMessage: string | undefined;
};
const initialState: TicketState = {
  tickets: [],
  ticket:{},
  isFetching: false,
  isSucess: false,
  isErr: false,
  errorMessage: "",
};

const tiketSlice = createSlice({
  name: "tickets",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //getAll
    builder.addCase(getTicket.pending, (state) => {
      state.isFetching = true;
    });
    builder.addCase(getTicket.fulfilled, (state, { payload }) => {
      state.tickets = payload;
      state.isFetching = false;
    });

    // delete
    builder.addCase(removeTicket.fulfilled, (state, action) => {
      state.isErr = false;
      state.isFetching = false;
      state.isSucess = true;
      state.tickets = state.tickets.filter(
        (item: any) => item._id !== action.payload.ticket._id
      );
    });
    builder.addCase(removeTicket.rejected, (state, action) => {
      state.isErr = true;
      state.isFetching = false;
      state.isSucess = false;
    });
    builder.addCase(removeTicket.pending, (state, action) => {
      state.isFetching = true;
      state.isSucess = false;
      state.isErr = false;
    });

    //create
    builder.addCase(createTicket.pending, (state) => {
      state.isFetching = true;
      state.isSucess = false;
      state.isErr = false;
    });
    builder.addCase(createTicket.fulfilled, (state, { payload }) => {
      state.isFetching = false;
      state.isSucess = true;
      state.isErr = false;
      state.tickets.push(payload);
    });
    builder.addCase(createTicket.rejected, (state, { payload }) => {
      state.isFetching = false;
      state.isSucess = false;
      state.isErr = true;
      state.errorMessage = payload;
    });

    //update
    builder.addCase(updateTiket.fulfilled, (state, action) => {
      state.isErr = false;
      state.isFetching = false;
      state.isSucess = true;

      state.tickets = state.tickets.map((item: any) => {
        if (item._id !== action.payload._id) {
          return item;
        }
        return action.payload;
      });
    });
    builder.addCase(updateTiket.pending, (state) => {
      state.isFetching = true;
    });
    builder.addCase(updateTiket.rejected, (state, action) => {
      state.isFetching = false;
      state.errorMessage = action.payload;
    });

    //getticketDetailById
    builder.addCase(getticketDetailById.pending, (state) => {
      state.isFetching = true;
    });  
    builder.addCase(getticketDetailById.fulfilled, (state, { payload }) => {
      state.ticket = payload;
      state.isFetching = false;
    });
  },
});
export default tiketSlice.reducer;
