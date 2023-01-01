import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { UserApi } from "../../service/userApi";

export const getUsers = createAsyncThunk<any, void, { rejectValue: string }>(
  "users/getUsers",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await UserApi.getAll();
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const removeUser = createAsyncThunk<any, string | undefined, { rejectValue: string }
>("users/removeUser", async (id, { rejectWithValue }) => {
  try {
    const { data } = await UserApi.removeUser(id);
    return data;
  } catch (error: any) {
    return rejectWithValue(error.response.data);
  }
});
export const updateUser = createAsyncThunk<any, any, { rejectValue: string }>(
  "users/updateUser",
  async (user, { rejectWithValue }) => {
    try {
      const { data } = await UserApi.updateUser(user);
      return data; updateUser
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const createUser = createAsyncThunk<any, any, { rejectValue: string }>(
  "users/createUser",
  async (user, { rejectWithValue }) => {
    try {
      const { data } = await UserApi.create(user);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const updatePass = createAsyncThunk<any, any, { rejectValue: string }>(
  "users/updatePass",
  async (input, { rejectWithValue }) => {
    try {
      const { data } = await UserApi.updatePassword(input);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);
type UserState = {
  users: any[];
  isFetching: boolean;
  isSucess: boolean;
  isErr: boolean;
  errorMessage: string | undefined;
};
const initialState: UserState = {
  users: [],
  isFetching: false,
  isSucess: false,
  isErr: false,
  errorMessage: "",
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //getAll
    builder.addCase(getUsers.pending, (state) => {
      state.isFetching = true;
    });
    builder.addCase(getUsers.fulfilled, (state, { payload }) => {
      state.users = payload;
      state.isFetching = false;
    });
    builder.addCase(getUsers.rejected, (state, { payload }) => {
      state.isFetching = false;
      state.errorMessage = payload;
    });

    // delete
    builder.addCase(removeUser.pending, (state) => {
      state.isFetching = true;
      state.isErr = false;
      state.isSucess = false;
    });
    builder.addCase(removeUser.fulfilled, (state, { payload }) => {
      state.isFetching = false;
      state.isErr = false;
      state.isSucess = true;
      state.users = state.users.filter((item) => item._id !== payload._id);
    });
    builder.addCase(removeUser.rejected, (state, { payload }) => {
      state.isErr = true;
      state.isFetching = false;
      state.isSucess = false;
      state.errorMessage = payload;
    });

    //create
    builder.addCase(createUser.pending, (state) => {
      state.isFetching = true;
      state.isSucess = false;
      state.isErr = false;
    });
    builder.addCase(createUser.fulfilled, (state, { payload }) => {
      state.isFetching = false;
      state.isSucess = true;
      state.isErr = false;
      state.users.push(payload);
    });
    builder.addCase(createUser.rejected, (state, { payload }) => {
      state.isFetching = false;
      state.isSucess = false;
      state.isErr = true;
      state.errorMessage = payload;
    });

    //update
    builder.addCase(updateUser.pending, (state) => {
      state.isFetching = true;
    });
    builder.addCase(updateUser.fulfilled, (state, action) => {
      state.isFetching = false;
      state.isSucess = true;
      state.users = state.users.map((item) =>
      item._id !== action.payload._id ? item : action.payload
    );
    });
    builder.addCase(updateUser.rejected, (state, action) => {
      state.isFetching = false;
      state.errorMessage = action.payload;
    });

    //update pass
    builder.addCase(updatePass.pending, (state) => {
      state.isFetching = true;
    });
    builder.addCase(updatePass.fulfilled, (state, action) => {
      state.isFetching = false;
      state.isSucess = true;
      state.users = state.users.map((item) =>
        item._id !== action.payload._id ? item : action.payload
      );
    });
    builder.addCase(updatePass.rejected, (state, action) => {
      state.isFetching = false;
      state.errorMessage = action.payload;
    });
  },
});
export default userSlice.reducer;
