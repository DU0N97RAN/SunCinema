import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CategoriesApi } from "../../service/categoriesApi";
import { RootState } from "../store";

export const getCategories = createAsyncThunk(
  "categories/list",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await CategoriesApi.getAll();
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const createCategories = createAsyncThunk(
  "categories/create",
  async (item: any, { rejectWithValue }) => {
    try {
      const { data } = await CategoriesApi.create(item);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const removeCategory = createAsyncThunk(
  "categories/remove",
  async (id: any, { rejectWithValue }) => {
    try {
      const { data } = await CategoriesApi.remove(id);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const editCate = createAsyncThunk(
  "categories/editCate",
  async (id: any, { rejectWithValue }) => {
    try {
      const { data } = await CategoriesApi.edit(id);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);
// export const getPostListByCate = createAsyncThunk<any, any, { rejectValue: string }>(
//    "categories/getPostListByCate",
//    async (input, { rejectWithValue }) => {
//       try {
//          const { data } = await CategoriesApi.getPostByCate(input);
//          return data;
//       } catch (error: any) {
//          return rejectWithValue(error.response.data.message);
//       }
//    }
// );
type categoriesState = {
  categories: any[];
  category:any | {};
  isFetching: boolean;
  isSucess: boolean;
  isErr: boolean;
  errorMessage: string| undefined
};
const initialState: categoriesState = {
  categories: [],
  category: {},
  isFetching: false,
  isSucess: false,
  isErr: false,
  errorMessage: ""
};

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCategories.pending, (state, action) => {
      state.isFetching = true;
      state.isSucess = false;
      state.isErr = false;
    });
    builder.addCase(getCategories.fulfilled, (state, action) => {
      state.isFetching = false;
      state.isSucess = true;
      state.isErr = false;
      state.categories = action.payload;
    });
    builder.addCase(getCategories.rejected, (state, action) => {
      state.isFetching = false;
      state.isSucess = false;
      state.isErr = true;
    });
    // create
    builder.addCase(createCategories.rejected, (state, action) => {
      state.isFetching = true;
      state.isSucess = false;
      state.isErr = false;
    });
    builder.addCase(createCategories.fulfilled, (state, action) => {
      state.isFetching = false;
      state.isSucess = true;
      state.isErr = false;
      state.categories.push(action.payload);
    });
    // remove

    builder.addCase(removeCategory.pending, (state, action) => {
      state.isFetching = true;
      state.isSucess = false;
      state.isErr = false;
    });
    builder.addCase(removeCategory.fulfilled, (state, action) => {
      state.isFetching = false;
      state.isSucess = true;
      state.isErr = false;
      state.categories = state.categories.filter(
        (item) => item._id != action.payload.category._id
      );
    });
    builder.addCase(removeCategory.rejected, (state, action) => {
      state.isErr = true;
      state.isFetching = false;
      state.isSucess = false;
    });
    builder.addCase(editCate.rejected, (state, action) => {
      state.isFetching = true;
      state.isSucess = false;
      state.isErr = false;
    });
    builder.addCase(editCate.fulfilled, (state, action) => {
      state.isFetching = false;
      state.isSucess = true;
      state.isErr = false;
      state.categories = state.categories.map((item) =>
      item._id !== action.payload._id ? item : action.payload
    );
    });
   
  },
});
export const selectCatePostList = (state: any) => state.categories.categories;
export const selectCatePost = (state: any) => state.categories.category;
export const selectSttCatePost = (state: any) => state.categories.loading;
export default categoriesSlice.reducer;
