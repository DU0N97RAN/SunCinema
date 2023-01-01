import React, { PropsWithChildren, Fragment } from "react";
import configRoute from "../config";
import { AuthTheme } from "../themes";

import SignIn from "../pages/auth/SignIn";

import SignUp from "../pages/auth/SignUp";
import NotFoundPage from "../pages/NotFound";

import BookChair from "../pages/client/bookChair/BookChair";
import Home from "../pages/client/home/Home";
import MovieDetail from "../pages/client/movieDetail/MovieDetail";
import TickitPrice from "../pages/client/TickitPrice/TickitPrice";
import Complete from "../pages/auth/complete";
// admin
import Dashboard from "../pages/admin/Dashboard/DashBoard";

import AdminUserList from "../pages/admin/User/List";
import UserCreate from "../pages/admin/User/Create";
import UserEdit from "../pages/admin/User/Update";

import CreateMovieType from "../pages/admin/MovieType/CreateMovieType";
import ListMovieType from "../pages/admin/MovieType/ListMovieType";

import ListSeatType from "../pages/admin/SeatType/ListSeatType";
import CeateSeatType from "../pages/admin/SeatType/CeateSeatType";
import UploadSeatType from "../pages/admin/SeatType/UploadSeatType";

import ListCategories from "../pages/admin/categories/List";
import EditMovieType from "../pages/admin/MovieType/EditMovieType";
import CreateCategory from "../pages/admin/categories/Create";

import AdminRoomList from "../pages/admin/Rooms/List";
import AdminRoomCreate from "../pages/admin/Rooms/Create";
import AdminRoomEdit from "../pages/admin/Rooms/Edit";
import AdminShowTimeList from "../pages/admin/showTime/List";
import AdminShowTimesCreate from "../pages/admin/showTime/Create";
import FilmFormatList from "../pages/admin/FilmFormat/List";
import CreateMovie from "../pages/admin/Movie/CreateMovie";
import ListMovie from "../pages/admin/Movie/ListMovie";
import UpdateMovies from "../pages/admin/Movie/UpdateMovie";
import News from "../pages/client/News/News";

import AdminVoucherList from "../pages/admin/voucher/List";
import AdminVoucherCreate from "../pages/admin/voucher/Create";
import AdminVoucherEdit from "../pages/admin/voucher/Edit";

import AdminPosts from "../pages/admin/Post/index";
import AdminPostsCreate from "../pages/admin/Post/Create";
import AdminPostsEdit from "../pages/admin/Post/Edit";
import NewsDetail from "../pages/client/NewsDetail";
import Search from "../pages/client/search/Search";
import FoodList from "../pages/admin/Food/FoodList";
import CreateFood from "../pages/admin/Food/CreateFood";
import UpdateFood from "../pages/admin/Food/UpdateFood";
import CreateSlider from "../pages/admin/Slider/CreateSlider";
import AdminSlider from "../pages/admin/Slider/AdminSlider";
import UpdateSlider from "../pages/admin/Slider/UpdateSlider";
import Profile from "../pages/client/profile";
import WebConfig from "../pages/admin/Config";
import WebConfigCreate from "../pages/admin/Config/Create";
import WebConfigEdit from "../pages/admin/Config/Edit";
import VoucherContent from "../components/client/VoucherContent";
import SeatByRoom from "../pages/admin/Seats/seatByRoom";
import Payment from "../pages/client/payment/Payment";
import ForgotPass from "../pages/auth/ForgotPassword";
import Contact from "../components/client/Contact";
import EditCategory from "../pages/admin/categories/Edit";
import ListCommentMovie from "../pages/admin/comment";

import PaymentStep from "../components/client/PaymentStep";
import ChooseCombo from "../components/client/ChooseCombo";
import LoadingPushAccountInLocalStorage from "../components/client/loadingPushAccountInLocalStorage";
import AdminOrdersDetail from "../pages/admin/Order/Detail";
import FindOrder from "../pages/client/findOrder";
import PaymentStatus from "../components/client/PaymentStatus";
import OrderTab from "../pages/admin/Order/OrderTab";
import NestedTable from "../pages/admin/showTime/NestedTable";
import CancelOrder from "../components/client/CancelOrder";
import CheckOrder from "../pages/client/CheckOrder";
type RoutesType = {
  path: string;
  component: any;
  layout?: any;
  title?: string;
};

export const publicRoutes: RoutesType[] = [
  { path: configRoute.routes.signin, component: SignIn, layout: AuthTheme },
  { path: configRoute.routes.signup, component: SignUp, layout: AuthTheme },
  { path: configRoute.routes.home, component: Home },
  { path: configRoute.routes.detail, component: MovieDetail },
  { path: configRoute.routes.bookChair, component: BookChair },
  { path: configRoute.routes.tickitPrice, component: TickitPrice },
  { path: configRoute.routes.news, component: News },
  { path: configRoute.routes.newsCate2, component: News },
  { path: configRoute.routes.newsDetail, component: NewsDetail },
  { path: configRoute.routes.search, component: Search },
  { path: configRoute.routes.profile, component: Profile },
  { path: configRoute.routes.verify, component: Complete },
  { path: configRoute.routes.voucherDetail, component: VoucherContent },
  { path: configRoute.routes.payment, component: Payment },
  { path: configRoute.routes.forgotPass, component: ForgotPass },
  { path: configRoute.routes.resetPassword, component: ForgotPass },
  { path: configRoute.routes.contact, component: Contact },
  { path: configRoute.routes.loadingPushAccountInLocalStorage, component: LoadingPushAccountInLocalStorage },
  { path: configRoute.routes.chooseCombo, component: ChooseCombo },
  { path: configRoute.routes.paymentStatus, component: PaymentStatus },
  { path: configRoute.routes.findOrder, component: FindOrder },
  { path: configRoute.routes.cancelOrder, component: CancelOrder },
  { path: configRoute.routes.checkOrder, component: CheckOrder },

  { path: "*", component: NotFoundPage, layout: null },
];

export const privateRoutes: RoutesType[] = [
  { path: configRoute.routes.dashboard, component: Dashboard },

  { path: configRoute.routes.adminUserList, component: AdminUserList },
  { path: configRoute.routes.adminUserAdd, component: UserCreate },
  { path: configRoute.routes.adminUserUpdate, component: UserEdit },

  { path: configRoute.routes.adminMovieTypeEdit, component: EditMovieType },
  { path: configRoute.routes.adminMovieTypeAdd, component: CreateMovieType },
  { path: configRoute.routes.adminMovieType, component: ListMovieType },

  { path: configRoute.routes.adminFood, component: FoodList },
  { path: configRoute.routes.adminFoodCreate, component: CreateFood },
  { path: configRoute.routes.adminFoodUpdate, component: UpdateFood },

  { path: configRoute.routes.adminSlider, component: AdminSlider },
  { path: configRoute.routes.adminSliderCreate, component: CreateSlider },
  { path: configRoute.routes.adminSliderUpdate, component: UpdateSlider },

  { path: configRoute.routes.adminSeatType, component: ListSeatType },
  { path: configRoute.routes.adminSeatTypeAdd, component: CeateSeatType },
  { path: configRoute.routes.adminSeatTypeUpdate, component: UploadSeatType },

  { path: configRoute.routes.adminCategories, component: ListCategories },
  { path: configRoute.routes.adminCategoriesCreate, component: CreateCategory },
  { path: configRoute.routes.adminCategoryEdit, component: EditCategory },

  { path: configRoute.routes.adminMoviecCreat, component: CreateMovie },
  { path: configRoute.routes.adminMovie, component: ListMovie },
  { path: configRoute.routes.adminMoviecUpdate, component: UpdateMovies },

  { path: configRoute.routes.adminRooms, component: AdminRoomList },
  { path: configRoute.routes.adminRoomsCreate, component: AdminRoomCreate },
  { path: configRoute.routes.adminRoomEdit, component: AdminRoomEdit },

  { path: configRoute.routes.AdminShowTimes, component: NestedTable },
  {
    path: configRoute.routes.AdminShowTimesCreate,
    component: AdminShowTimesCreate,
  },


  { path: configRoute.routes.AdminFilmFormat, component: FilmFormatList },

  { path: configRoute.routes.AdminVouchers, component: AdminVoucherList },
  {
    path: configRoute.routes.AdminVouchersCreate,
    component: AdminVoucherCreate,
  },
  { path: configRoute.routes.AdminVouchersEdit, component: AdminVoucherEdit },

  { path: configRoute.routes.AdminPosts, component: AdminPosts },
  { path: configRoute.routes.AdminPostsCreate, component: AdminPostsCreate },
  { path: configRoute.routes.AdminPostsEdit, component: AdminPostsEdit },
  // { path: configRoute.routes.renderSeatAdmin, component: AdminSeatRenderDetail },
  // { path: configRoute.routes.chooseCombo, component: ChooseCombo },

  { path: configRoute.routes.webConfig, component: WebConfig },
  { path: configRoute.routes.webConfigAdd, component: WebConfigCreate },
  { path: configRoute.routes.webConfigEdit, component: WebConfigEdit },
  { path: configRoute.routes.AdminSeatByRoom, component: SeatByRoom },
  { path: configRoute.routes.adminOrders, component: OrderTab },
  { path: configRoute.routes.adminOrdersDetail, component: AdminOrdersDetail },
  {
    path: configRoute.routes.adminListCommentMovie,
    component: ListCommentMovie,
  },
];
