import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { seatByShowTime } from "../../service/seatbyStApi";

export const createData = createAsyncThunk<any, any, { rejectValue: string }>(
  "sbst/create",
  async (input, { rejectWithValue }) => {
    try {
      const { data } = await seatByShowTime.create(input);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response.data.message);
    }
  }
);
export const getAllSBST = createAsyncThunk<any, void, { rejectValue: string }>(
  "sbst/getAll",
  async (_: any, { rejectWithValue }) => {
    try {
      const { data } = await seatByShowTime.getAll();
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response.data.message);
    }
  }
);
export const getOneSBSTById = createAsyncThunk<
  any,
  any,
  { rejectValue: string }
>("sbst/getOneById", async (input: any, { rejectWithValue }) => {
  try {
    const { data } = await seatByShowTime.getOneByid(input);
    return data;
  } catch (error: any) {
    return rejectWithValue(error.response.data.message);
  }
});
export const updateSBST = createAsyncThunk(
  "sbst/update",
  async (input: any, { rejectWithValue }) => {
    try {
      const { data } = await seatByShowTime.updateSeatByST(input);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response.data.message);
    }
  }
);
type seatByShowTimeState = {
  seatsByST: any[];
  seat: any;
  errorMessage: string | undefined;
};
const initialState: seatByShowTimeState = {
  seatsByST: [],
  seat: {},
  errorMessage: "",
};

const seatByShowTimeSlice = createSlice({
  name: "sbst",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //create
    builder.addCase(createData.fulfilled, (state, { payload }) => {
      state.seatsByST.push(payload);
    });
    builder.addCase(createData.rejected, (state, { payload }) => {
      state.errorMessage = payload;
    });

    //list
    builder.addCase(getAllSBST.fulfilled, (state, { payload }) => {
      state.seatsByST = payload;
    });
    builder.addCase(getAllSBST.rejected, (state, { payload }) => {
      state.errorMessage = payload;
    });
    //getOneByID
    builder.addCase(getOneSBSTById.fulfilled, (state, { payload }) => {
      state.seat = payload;
    });
    builder.addCase(getOneSBSTById.rejected, (state, { payload }) => {
      state.errorMessage = payload;
    });
    // update
    builder.addCase(updateSBST.fulfilled, (state, action) => {
      state.seatsByST = state.seatsByST.map((item: any) => {
        if (item._id == action.payload._id) {
          return action.payload;
        }
        return item;
      });
    });
  },
});
export default seatByShowTimeSlice.reducer;
