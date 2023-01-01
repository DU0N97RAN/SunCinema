import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { PostApi } from "../../service/postApi";

export const getAlPost = createAsyncThunk<any, void, { rejectValue: string }>(
   "post/getAlPost",
   async (_, { rejectWithValue }) => {
      try {
         const { data } = await PostApi.getAll();
         return data;
      } catch (error: any) {
         return rejectWithValue(error.response.data);
      }
   }
);
export const removeData = createAsyncThunk<any, any, { rejectValue: string }
>("post/removeData", async (id, { rejectWithValue }) => {
   try {
      const { data } = await PostApi.removeApi(id);
      return data.room;
   } catch (error: any) {
      return rejectWithValue(error.response.data);
   }
});
export const updateData = createAsyncThunk<any, any, { rejectValue: string }>(
   "post/updateData",
   async (input, { rejectWithValue }) => {
      try {
         const { data } = await PostApi.updateApi(input);
         return data;
      } catch (error: any) {
         return rejectWithValue(error.response.data);
      }
   }
);

export const createData = createAsyncThunk<any, any, { rejectValue: string }>(
   "post/create",
   async (input, { rejectWithValue }) => {
      try {
         const  data  = await PostApi.create(input);
         return data.data;
      } catch (error: any) {
         return rejectWithValue(error.response.data.message);
      }
   }
);
export const getListPostByCate = createAsyncThunk<any, any, { rejectValue: string }>(
   "post/getListPostByCate",
   async (slug, { rejectWithValue }) => {
      try {
         const { data } = await PostApi.getListPostByCate(slug);
         return data;
      } catch (error: any) {
         return rejectWithValue(error.response.data);
      }
   }
);
export const getOneBySlug= createAsyncThunk<any, any, { rejectValue: string }>(
   "post/getOneBySlug",
   async (slug, { rejectWithValue }) => {
      try {
         const { data } = await PostApi.getDetailBySlug(slug);
         return data;
      } catch (error: any) {
         return rejectWithValue(error.response.data);
      }
   }
);
export const getTop10 = createAsyncThunk<any, void, { rejectValue: string }>(
   "post/getTop10",
   async (_, { rejectWithValue }) => {
      try {
         const { data } = await PostApi.getTop10();
         return data;
      } catch (error: any) {
         return rejectWithValue(error.response.data);
      }
   }
);
type PostState = {
   posts: any[];
   post:any| object
   top10: any[];
   loading: boolean;
   errorMessage: string | undefined;
};
const initialState: PostState = {
   posts: [],
   post: {},
   top10: [],
   loading: false,
   errorMessage: "",
};

const PostSlice = createSlice({
   name: "post",
   initialState,
   reducers: {
   },
   extraReducers: (builder) => {
      //getAll

      builder.addCase(getAlPost.fulfilled, (state, { payload }) => {
         state.posts = payload;
         state.loading= false
      });
      builder.addCase(getAlPost.rejected, (state, { payload }) => {
         state.errorMessage = payload;
         state.loading= false
      });
      builder.addCase(getAlPost.pending, (state, { payload }) => {
         state.loading = true;
      });
       //gettop10

       builder.addCase(getTop10.fulfilled, (state, { payload }) => {
         state.top10 = payload;
         state.loading= false
      });
      builder.addCase(getTop10.rejected, (state, { payload }) => {
         state.errorMessage = payload;
         state.loading= false
      });
      builder.addCase(getTop10.pending, (state, { payload }) => {
         state.loading = true;
      });
      //getBySlug
      builder.addCase(getListPostByCate.fulfilled, (state, { payload }) => {
         state.post = payload;
         state.loading= false
      });
      builder.addCase(getListPostByCate.rejected, (state, { payload }) => {
         state.errorMessage = payload;
         state.loading= false
      });
      builder.addCase(getListPostByCate.pending, (state, { payload }) => {
         state.loading = true;
      });
      //detail býlug
      builder.addCase(getOneBySlug.fulfilled, (state, { payload }) => {
         state.post = payload;
         state.loading= false
      });
      builder.addCase(getOneBySlug.rejected, (state, { payload }) => {
         state.errorMessage = payload;
         state.loading= false
      });
      builder.addCase(getOneBySlug.pending, (state, { payload }) => {
         state.loading = true;
      });
      // delete

      builder.addCase(removeData.fulfilled, (state, action) => {

         state.posts = state.posts.filter((item) => item._id !== action.meta.arg);
      });
      builder.addCase(removeData.rejected, (state, { payload }) => {
         state.errorMessage = payload;
      });

      //create

      builder.addCase(createData.fulfilled, (state, { payload }) => {
         state.posts.push(payload);
      });
      builder.addCase(createData.rejected, (state, { payload }) => {
         state.errorMessage = payload;
      });

      //update

      builder.addCase(updateData.fulfilled, (state, action) => {

         state.posts = state.posts.map((item) =>
            item._id !== action.payload._id ? item : action.payload
         );
      });
      builder.addCase(updateData.rejected, (state, action) => {
         state.errorMessage = action.payload;
      });

      
   },
});

export default PostSlice.reducer;
