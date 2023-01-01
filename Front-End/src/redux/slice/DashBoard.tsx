import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { DashBoard } from "../../service/dashboard";

export const getdashBoard = createAsyncThunk(
  "dashboard/get",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await DashBoard.getAll();
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);
const initialState: any = {
  dashboard: [],
};
const DashBoardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getdashBoard.fulfilled, (state, action) => {
      state.dashboard = action.payload;
    });
  },
});

export default DashBoardSlice.reducer;
