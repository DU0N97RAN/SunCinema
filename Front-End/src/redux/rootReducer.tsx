import { persistReducer } from "redux-persist";
import { combineReducers } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import authReducer from "./slice/AuthSlice";
import userReducer from "./slice/userSlice";
import movieTypeReducer from "./slice/movieTypeSlice";
import ticketReducer from "./slice/ticketSlice";
import seatTypeReducer from "./slice/SeatTypeSlice";
import categoriesReducer from "./slice/CategorySlice";
import movie from "./slice/Movie";
import food from "./slice/FoodSlice";
import slider from "./slice/Slider";
import roomReducer from "./slice/roomSlice";
import FormatReducer from "./slice/FilmFormatSlice";
import ShowTimeReducer from "./slice/ShowTimeSlice";
import PostReducer from "./slice/PostSlice";
import voucherReducer from "./slice/voucherSlice";
import WebConfigReducer from "./slice/webConfig";
import SeatsReducer from "./slice/SeatSlice";
import TicketDetailReducer from "./slice/TicketDetailSlice";
import OrderReducer from "./slice/OrdersSlice";
import FoodDetailReducer from "./slice/FoodDetail";
import ComenterReducer from "./slice/ComenteSlice";
import DashboardReducer from "./slice/DashBoard";
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["authReducer"],
};
const reducers = combineReducers({
  authReducer,
  userReducer,
  movieTypeReducer,
  ticketReducer,
  seatTypeReducer,
  categoriesReducer,
  movie,
  food,
  slider,
  roomReducer,
  FormatReducer,
  ShowTimeReducer,
  voucherReducer,
  PostReducer,
  WebConfigReducer,
  SeatsReducer,
  TicketDetailReducer,
  OrderReducer,
  FoodDetailReducer,
  ComenterReducer,
  DashboardReducer
});
const rootReducer = persistReducer(persistConfig, reducers);

export default rootReducer;
