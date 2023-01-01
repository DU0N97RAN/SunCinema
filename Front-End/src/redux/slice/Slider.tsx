import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { SliderApi } from "../../service/SliderApi";

export const createSlider = createAsyncThunk(
  "slider/sliderCreate",
  async (item: any, { rejectWithValue }) => {
    try {
      const { data } = await SliderApi.create(item);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getSlider = createAsyncThunk(
  "slider/list",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await SliderApi.getAll();
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const removeSliderItem = createAsyncThunk(
  "slider/remove",
  async (id: any, { rejectWithValue }) => {
    try {
      const { data } = await SliderApi.remove(id);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const UpdateSliderThunk = createAsyncThunk(
  "slider/edit",
  async (items: any, { rejectWithValue }) => {
    try {
      const { data } = await SliderApi.edit(items);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const getOneSlider = createAsyncThunk(
  "slider/getOneSlider",
  async (slug: any, { rejectWithValue }) => {
    try {
      const { data } = await SliderApi.getOne(slug);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const searchSlider = createAsyncThunk(
  "slider/searchslider",
  async (key: any, { rejectWithValue }) => {
    try {
      const { data } = await SliderApi.search(key);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState: any = {
  slider: [],
  oneslider: [],
  errMess: false,
  sliderSearch: [],
};
const sliderSlice = createSlice({
  name: "slider",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // create
    builder.addCase(createSlider.pending, (state, action) => {
      state.errMess = false;
      //   state.isFetching = true;
      //   state.isSucess = false;
    });
    builder.addCase(createSlider.fulfilled, (state, action) => {
      //   state.errMess = false;
      //   state.isFetching = false;
      //   state.isSucess = true;
      state.slider.push(action.payload);
    });
    builder.addCase(createSlider.rejected, (state, action) => {
      state.errMess = action.payload;
      //   state.isFetching = false;
      //   state.isSucess = false;
    });
    // list
    builder.addCase(getSlider.pending, (state, action) => {
      state.errMess = action.payload;
      state.isFetching = true;
      state.isSucess = false;
    });
    builder.addCase(getSlider.fulfilled, (state, action) => {
      state.slider = action.payload;
      state.isFetching = false;
      state.isSucess = true;
    });
    builder.addCase(getSlider.rejected, (state, action) => {
      state.errMess = true;
      state.isFetching = false;
      state.isSucess = false;
    });
    // remove
    builder.addCase(removeSliderItem.fulfilled, (state, action) => {
      state.errMess = action.payload;
      //   state.isFetching = false;
      //   state.isSucess = true;
      state.slider = state.slider.filter(
        (x: any) => x._id !== action.payload._id
      );
    });
    builder.addCase(UpdateSliderThunk.rejected, (state, action) => {
      state.errMess = true;
      //   state.isFetching = false;
      //   state.isSucess = false;
    });
    // update
    builder.addCase(UpdateSliderThunk.fulfilled, (state, action) => {
      state.errMess = action.payload;
      //   state.isFetching = false;
      //   state.isSucess = true;
      state.slider = state.slider.map((item: any) => {
        if (item._id !== action.payload._id) {
          return item;
        }
        return action.payload;
      });
    });
    builder.addCase(getOneSlider.pending, (state, action) => {
      state.errMess = false;
      state.isFetching = true;
      state.isSucess = false;
    });
    builder.addCase(getOneSlider.fulfilled, (state, action) => {
      state.errMess = false;
      state.isFetching = false;
      state.isSucess = true;
      state.oneSlider = action.payload;
    });
    builder.addCase(getOneSlider.rejected, (state, action) => {
      state.errMess = true;
      //   state.isFetching = false;
      //   state.isSucess = false;
    });
    builder.addCase(searchSlider.fulfilled, (state, action) => {
      state.sliderSearch = action.payload;
    });
  },
});

export default sliderSlice.reducer;
