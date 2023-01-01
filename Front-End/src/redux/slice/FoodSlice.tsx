import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { FoodApi } from "../../service/FoodApi";

export const createFood = createAsyncThunk(
  "food/FoodCreate",
  async (item: any, { rejectWithValue }) => {
    try {
      const { data } = await FoodApi.create(item);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getFood = createAsyncThunk(
  "food/list",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await FoodApi.getAll();
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const removeFoodItem = createAsyncThunk(
  "food/remove",
  async (id: any, { rejectWithValue }) => {
    try {
      const { data } = await FoodApi.remove(id);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const EditFood = createAsyncThunk(
  "food/edit",
  async (items: any, { rejectWithValue }) => {
    try {
      const { data } = await FoodApi.edit(items);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const getOneFood = createAsyncThunk(
  "food/getOneFood",
  async (slug: any, { rejectWithValue }) => {
    try {
      const { data } = await FoodApi.getOne(slug);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const searchFood = createAsyncThunk(
  "food/searchFood",
  async (key: any, { rejectWithValue }) => {
    try {
      const { data } = await FoodApi.search(key);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState: any = {
  food: [],
  foodDetails: []
};
const FoodSlice = createSlice({
  name: "food",
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    // create
    builder.addCase(createFood.pending, (state, action) => {
      state.errMess = false;
    });
    builder.addCase(createFood.fulfilled, (state, action) => {
      state.food.push(action.payload);
    });
    builder.addCase(createFood.rejected, (state, action) => {
      state.errMess = action.payload;

    });
    // list
    builder.addCase(getFood.pending, (state, action) => {
      state.errMess = action.payload;

    });
    builder.addCase(getFood.fulfilled, (state, action) => {
      state.food = action.payload;
    });
    builder.addCase(getFood.rejected, (state, action) => {
      state.errMess = true;
    });
    // remove
    builder.addCase(removeFoodItem.fulfilled, (state, action) => {
      state.errMess = action.payload;

      state.food = state.food.filter(
        (x: any) => x._id !== action.payload._id
      );
    });
    builder.addCase(EditFood.rejected, (state, action) => {
      state.errMess = true;
    });
    // update
    builder.addCase(EditFood.fulfilled, (state, action) => {
      state.errMess = action.payload;
      state.food = state.food.map((item: any) => {
        if (item._id !== action.payload._id) {
          return item;
        }
        return action.payload;
      });
    });
    builder.addCase(getOneFood.pending, (state, action) => {
      state.errMess = false;
      state.isFetching = true;
      state.isSucess = false;
    });
    builder.addCase(getOneFood.fulfilled, (state, action) => {
      state.errMess = false;
      state.isFetching = false;
      state.isSucess = true;
      state.oneFood = action.payload;
    });
    builder.addCase(getOneFood.rejected, (state, action) => {
      state.errMess = true;
    });
    builder.addCase(searchFood.fulfilled, (state, action) => {
      state.FoodSearch = action.payload;
    });
  },
});

export default FoodSlice.reducer;
