import { Fragment, useEffect } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { publicRoutes, privateRoutes } from "./routes";
import { ClientTheme, AdminTheme } from "./themes";
import "antd/dist/antd.css";
import ScrollToTop from "./ultils/ScrollToTop";
import { useAppDispatch, useAppSelector } from "./redux/hook";
import { getMovieType } from "./redux/slice/movieTypeSlice";
import { getTicket } from "./redux/slice/ticketSlice";
import { getSeatType } from "./redux/slice/SeatTypeSlice";
import { getCategories } from "./redux/slice/CategorySlice";
import { getMovie } from "./redux/slice/Movie";
import { getFood } from "./redux/slice/FoodSlice";
import { getUsers } from "./redux/slice/userSlice";
import { getAllData } from "./redux/slice/FilmFormatSlice";
import { getRooms } from "./redux/slice/roomSlice";
import { getAllSBST } from "./redux/slice/SeatBySTSlice";
import { getSlider } from "./redux/slice/Slider";
import { getConfigs } from "./redux/slice/webConfig";
import { getAlVc } from "./redux/slice/voucherSlice";
import Maintain from "./components/client/Maintain";
import { getAlPost } from "./redux/slice/PostSlice";
import { getAllSeats } from "./redux/slice/SeatSlice";
import PrivateRoute from "./components/client/PrivateRouter";
import { getAllOrders } from "./redux/slice/OrdersSlice";
import { getComente } from "./redux/slice/ComenteSlice";
function App() {
  const dispatch = useAppDispatch();
  const { webConfigs } = useAppSelector((state: any) => state.WebConfigReducer
  );
  const isMaintain = webConfigs[0]?.isMaintaince;
  useEffect(() => {
    dispatch(getMovieType());
    dispatch(getTicket());
    dispatch(getSeatType());
    dispatch(getCategories());
    dispatch(getMovie());
    dispatch(getFood());
    dispatch(getSlider());
    dispatch(getUsers());
    dispatch(getAllData());
    dispatch(getRooms());
    dispatch(getAllSBST());
    dispatch(getConfigs());
    dispatch(getAlVc());
    dispatch(getAlPost());
    dispatch(getAllSeats({}));
    dispatch(getAllOrders({}));
    dispatch(getComente());
  }, [dispatch]);

  return (
    <>
      <Routes>
        {publicRoutes.map((route, index) => {
          const Page = route.component;
          let Layout: any = ClientTheme;

          if (route.layout) {
            Layout = route.layout;
          } else if (route.layout === null) {
            Layout = Fragment;
          }
          return (
            <Route
              key={index}
              path={route.path}
              element={
                <Maintain isMaintain={isMaintain}>
                  <Layout>
                    <Page />
                  </Layout>
                </Maintain>
              }
            />
          );
        })}
        {privateRoutes.map((route, index) => {
          const Page = route.component;
          let Layout: any = AdminTheme;

          if (route.layout) {
            Layout = route.layout;
          } else if (route.layout === null) {
            Layout = Fragment;
          }

          return (
            <Route
              key={index}
              path={route.path}
              element={
                <PrivateRoute acceptRole={1}>
                  <Layout>
                    <Page />
                  </Layout>
                 </PrivateRoute>
              }
            />
          );
        })}
      </Routes>
      <ScrollToTop />
    </>
  );
}

export default App;
