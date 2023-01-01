import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { MovieTypeApi } from "../../service/movieTypeApi";

export const createMovieType = createAsyncThunk(
  "movieType/add",
  async (item: any, { rejectWithValue }) => {
    try {
      const { data } = await MovieTypeApi.create(item);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getMovieType = createAsyncThunk(
  "movieType/list",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await MovieTypeApi.getAll();
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const removeMovieTypeItem = createAsyncThunk(
  "movieType/remove",
  async (id: any, { rejectWithValue }) => {
    try {
      const { data } = await MovieTypeApi.remove(id);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const UpdateMovieType = createAsyncThunk(
  "movieType/edit",
  async (items: any, { rejectWithValue }) => {
    try {
      const { data } = await MovieTypeApi.edit(items);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState: any = {
  movieType: [],
  isFetching: false,
  isSucess: false,
  isErr: false,
};
const movieTypeSlice = createSlice({
  name: "movieType",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // create
    builder.addCase(createMovieType.pending, (state, action) => {
      state.isErr = false;
      state.isFetching = true;
      state.isSucess = false;
    });
    builder.addCase(createMovieType.fulfilled, (state, action) => {
      state.isErr = false;
      state.isFetching = false;
      state.isSucess = true;
      state.movieType.push(action.payload);
    });
    builder.addCase(createMovieType.rejected, (state, action) => {
      state.isErr = true;
      state.isFetching = false;
      state.isSucess = false;
    });
    // list
    builder.addCase(getMovieType.pending, (state, action) => {
      state.isErr = false;
      state.isFetching = true;
      state.isSucess = false;
    });
    builder.addCase(getMovieType.fulfilled, (state, action) => {
      state.isErr = false;
      state.isFetching = false;
      state.isSucess = true;
      state.movieType = action.payload;
    });
    builder.addCase(getMovieType.rejected, (state, action) => {
      state.isErr = true;
      state.isFetching = false;
      state.isSucess = false;
    });
    // remove
    builder.addCase(removeMovieTypeItem.fulfilled, (state, action) => {
      state.isErr = false;
      state.isFetching = false;
      state.isSucess = true;
      state.movieType = state.movieType.filter(
        (x: any) => x._id !== action.payload._id
      );
    });
    builder.addCase(UpdateMovieType.rejected, (state, action) => {
      state.isErr = true;
      state.isFetching = false;
      state.isSucess = false;
    });
    // update
    builder.addCase(UpdateMovieType.fulfilled, (state, action) => {
      state.isErr = false;
      state.isFetching = false;
      state.isSucess = true;
      state.movieType = state.movieType.map((item: any) => {
        if (item._id !== action.payload._id) {
          return item;
        }
        return action.payload;
      });
    });
  },
});

export default movieTypeSlice.reducer;
