import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { SeatApi } from "../../service/seatsApi";

export const updateSeatThunk = createAsyncThunk<
  any,
  any,
  { rejectValue: string }
>("seat/update", async (input, { rejectWithValue }) => {
  try {
    const { data } = await SeatApi.updateSeat(input);
    return data;
  } catch (error: any) {
    return rejectWithValue(error.response.data);
  }
});

export const getAllSeats = createAsyncThunk<any, any, { rejectValue: string }>(
  "seat/list",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await SeatApi.getAllSeats();
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);
type RoomState = {
  seats: any[];
  isFetching: boolean;
  isSucess: boolean;
  isErr: boolean;
  errorMessage: string | undefined;
  arrSeats: any[];
};
const initialState: RoomState = {
  seats: [],
  arrSeats: [],
  isFetching: false,
  isSucess: false,
  isErr: false,
  errorMessage: "",
};

const seatsSlice = createSlice({
  name: "seats",
  initialState,
  reducers: {
    addSeats(state, action) {
      let exitsSeats = state.arrSeats.find(
        (item: any) => item._id === action.payload._id
      );
      if (exitsSeats) {
        state.arrSeats = state.arrSeats.filter(
          (item: any) => item._id !== action.payload._id
        );
      } else {
        state.arrSeats.push(action.payload);
      }
    },
    removeArrSeats(state) {
      state.arrSeats = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllSeats.pending, (state, action) => {
      state.isErr = false;
      state.isFetching = true;
      state.isSucess = false;
    });
    builder.addCase(getAllSeats.fulfilled, (state, action) => {
      state.isErr = false;
      state.isFetching = false;
      state.isSucess = true;
      state.seats = action.payload;
    });
    builder.addCase(getAllSeats.rejected, (state, action) => {
      state.isErr = true;
      state.isFetching = false;
      state.isSucess = false;
    });
    //update
    builder.addCase(updateSeatThunk.pending, (state) => {
      state.isFetching = true;
    });
    builder.addCase(updateSeatThunk.fulfilled, (state, action) => {
      state.isFetching = false;
      state.isSucess = true;
      state.seats = state.seats.map((item) => item._id !== action.payload._id ? item : action.payload);
    });
    builder.addCase(updateSeatThunk.rejected, (state, action) => {
      state.isFetching = false;
      state.errorMessage = action.payload;
    });
  },
});
export const { addSeats, removeArrSeats } = seatsSlice.actions;
export default seatsSlice.reducer;
