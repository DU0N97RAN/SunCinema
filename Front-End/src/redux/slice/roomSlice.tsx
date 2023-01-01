import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { roomApi } from "../../service/roomApi";

export const getRooms = createAsyncThunk<any, void, { rejectValue: string }>(
  "rooms/getRooms",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await roomApi.getAll();
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const removeRoom = createAsyncThunk<any, any, { rejectValue: string }
>("rooms/removeRoom", async (id, { rejectWithValue }) => {
  try {
    const { data } = await roomApi.removeApi(id);
    return data.room;
  } catch (error: any) {
    return rejectWithValue(error.response.data);
  }
});
export const updateRoom = createAsyncThunk<any, any, { rejectValue: string }>(
  "rooms/updateRoom",
  async (input, { rejectWithValue }) => {
    try {
      const { data } = await roomApi.updateApi(input);
      return data.room;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const createRooms = createAsyncThunk<any, any, { rejectValue: string }>(
  "rooms/createRooms",
  async (user, { rejectWithValue }) => {
    try {
      const { data } = await roomApi.create(user);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response.data.message);
    }
  }
);
type RoomState = {
  rooms: any[];
  isFetching: boolean;
  isSucess: boolean;
  isErr: boolean;
  errorMessage: string | undefined;
};
const initialState: RoomState = {
  rooms: [],
  isFetching: false,
  isSucess: false,
  isErr: false,
  errorMessage: "",
};

const roomSlice = createSlice({
  name: "rooms",
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    //getAll
    builder.addCase(getRooms.pending, (state) => {
      state.isFetching = true;
    });
    builder.addCase(getRooms.fulfilled, (state, { payload }) => {
      state.rooms = payload;
      state.isFetching = false;
    });
    builder.addCase(getRooms.rejected, (state, { payload }) => {
      state.isFetching = false;
      state.errorMessage = payload;
    });

    // delete
    builder.addCase(removeRoom.pending, (state) => {
      state.isFetching = true;
      state.isErr = false;
      state.isSucess = false;
    });
    builder.addCase(removeRoom.fulfilled, (state, { payload }) => {
      state.isFetching = false;
      state.isErr = false;
      state.isSucess = true;
      state.rooms = state.rooms.filter((item) => item._id !== payload._id);
    });
    builder.addCase(removeRoom.rejected, (state, { payload }) => {
      state.isErr = true;
      state.isFetching = false;
      state.isSucess = false;
      state.errorMessage = payload;
    });

    //create
    builder.addCase(createRooms.pending, (state) => {
      state.isFetching = true;
      state.isSucess = false;
      state.isErr = false;
    });
    builder.addCase(createRooms.fulfilled, (state, { payload }) => {
      state.isFetching = false;
      state.isSucess = true;
      state.isErr = false;
      state.rooms.push(payload);
    });
    builder.addCase(createRooms.rejected, (state, { payload }) => {
      state.isFetching = false;
      state.isSucess = false;
      state.isErr = true;
      state.errorMessage = payload;
    });

    //update
    builder.addCase(updateRoom.pending, (state) => {
      state.isFetching = true;
    });
    builder.addCase(updateRoom.fulfilled, (state, action) => {
      state.isFetching = false;
      state.isSucess = true;
      state.rooms = state.rooms.map((item) =>
        item._id !== action.payload._id ? item : action.payload
      );
    });
    builder.addCase(updateRoom.rejected, (state, action) => {
      state.isFetching = false;
      state.errorMessage = action.payload;
    });
  },
});

export default roomSlice.reducer;
