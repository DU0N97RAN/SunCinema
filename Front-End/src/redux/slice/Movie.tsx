import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { MovieApi } from "../../service/MovieApi";

export const createMovie = createAsyncThunk(
  "movie/MovieCreate",
  async (item: any, { rejectWithValue }) => {
    try {
      const { data } = await MovieApi.create(item);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getMovie = createAsyncThunk(
  "movie/list",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await MovieApi.getAll();
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const removeMovieItem = createAsyncThunk(
  "movie/remove",
  async (id: any, { rejectWithValue }) => {
    try {
      const { data } = await MovieApi.remove(id);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const UpdateMovie = createAsyncThunk(
  "movie/edit",
  async (items: any, { rejectWithValue }) => {
    try {
      const { data } = await MovieApi.edit(items);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const getOneMovie = createAsyncThunk(
  "movie/getOneMovie",
  async (slug: any, { rejectWithValue }) => {
    try {
      const { data } = await MovieApi.getOne(slug);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const searchMovie = createAsyncThunk(
  "movie/searchMovie",
  async (key: any, { rejectWithValue }) => {
    try {
      const { data } = await MovieApi.search(key);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);
//  const movieState = {
//   movie: any[];
//   isFetching: boolean;
//   isSucess: boolean;
//   errMess: boolean;
// };
const initialState: any = {
  movie: [],
  oneMovie: [],
  errMess: false,
  movieSearch: [],
};
const movieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // create
    builder.addCase(createMovie.pending, (state, action) => {
      state.errMess = false;
      //   state.isFetching = true;
      //   state.isSucess = false;
    });
    builder.addCase(createMovie.fulfilled, (state, action) => {
      //   state.errMess = false;
      //   state.isFetching = false;
      //   state.isSucess = true;
      state.movie.push(action.payload);
    });
    builder.addCase(createMovie.rejected, (state, action) => {
      state.errMess = action.payload;
      //   state.isFetching = false;
      //   state.isSucess = false;
    });
    // list
    builder.addCase(getMovie.pending, (state, action) => {
      state.errMess = action.payload;
      //   state.isFetching = true;
      //   state.isSucess = false;
    });
    builder.addCase(getMovie.fulfilled, (state, action) => {
      state.movie = action.payload;
    });
    builder.addCase(getMovie.rejected, (state, action) => {
      state.errMess = true;
      //   state.isFetching = false;
      //   state.isSucess = false;
    });
    // remove
    builder.addCase(removeMovieItem.fulfilled, (state, action) => {
      state.errMess = action.payload;
      //   state.isFetching = false;
      //   state.isSucess = true;
      state.movie = state.movie.filter(
        (x: any) => x._id !== action.payload._id
      );
    });
    builder.addCase(UpdateMovie.rejected, (state, action) => {
      state.errMess = true;
      //   state.isFetching = false;
      //   state.isSucess = false;
    });
    // update
    builder.addCase(UpdateMovie.fulfilled, (state, action) => {
      state.errMess = action.payload;
      //   state.isFetching = false;
      //   state.isSucess = true;
      state.movie = state.movie.map((item: any) => {
        if (item._id !== action.payload._id) {
          return item;
        }
        return action.payload;
      });
    });
    builder.addCase(getOneMovie.pending, (state, action) => {
      state.errMess = false;
      state.isFetching = true;
      state.isSucess = false;
    });
    builder.addCase(getOneMovie.fulfilled, (state, action) => {
      state.errMess = false;
      state.isFetching = false;
      state.isSucess = true;
      state.oneMovie = action.payload;
    });
    builder.addCase(getOneMovie.rejected, (state, action) => {
      state.errMess = true;
      //   state.isFetching = false;
      //   state.isSucess = false;
    });
    builder.addCase(searchMovie.fulfilled, (state, action) => {
      state.movieSearch = action.payload;
    });
  },
});

export default movieSlice.reducer;
