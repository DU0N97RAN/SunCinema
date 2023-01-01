import { UserOutlined, PieChartOutlined, SettingOutlined, SnippetsOutlined, LogoutOutlined } from "@ant-design/icons";
import { BiSlider, BiCameraMovie } from "react-icons/bi";
import { GiTheater } from "react-icons/gi";
import { FaTicketAlt, FaMoneyCheckAlt } from "react-icons/fa";
import { IoFastFoodOutline } from "react-icons/io5"
import { Menu, Button, message } from "antd";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import config from "../../../config";
import { LogOut } from "../../../redux/slice/AuthSlice";
import { useAppDispatch } from "../../../redux/hook";
import configRoute from "../../../config";
type MenuItem = Required<any>["items"][number];

function getItem(
  label: React.ReactNode,
  key?: React.Key | null,
  icon?: React.ReactNode,
  children?: MenuItem[],
  component?: any
): MenuItem {
  return { key, icon, children, label } as MenuItem;
}

type Props = {};

const MenuAdminLayout = (props: Props) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const handleSignout = () => {
    message.success({ content: "Đã đăng xuất" });
    dispatch(LogOut());
    navigate(configRoute.routes.signin);
  };
  const items: any[] = [
    getItem(<Link to={config.routes.dashboard}>Thống kê</Link>, "link", <PieChartOutlined />),
    getItem("Quản lí người dùng", "adminUser", <UserOutlined />, [
      getItem(<Link to={config.routes.adminUserList}> Danh sách người dùng</Link>, "adminUser1"),
      getItem(<Link to={config.routes.adminUserAdd}> Thêm người dùng</Link>, "adminUser2"),
    ]),
    getItem("Quản lí đơn hàng", "adminOrders", <FaMoneyCheckAlt />, [
      getItem(<Link to={config.routes.adminOrders}> Danh sách  orders</Link>, "adminOrders1"),
    ]),
    getItem("Quản lí Phòng chiếu", "adminRooms", <GiTheater />, [
      getItem(<Link to={config.routes.adminRooms}> Danh sách phòng chiếu</Link>, "adminRooms1"),
      getItem(<Link to={config.routes.adminRoomsCreate}> Thêm phòng chiếu</Link>, "adminRooms2"),
    ]),
    getItem("Quản lí phim ", "sub7", <BiCameraMovie />, [
      getItem(<Link to={config.routes.adminMovie}> Danh sách phim</Link>, "adminMovie1"),
      getItem(<Link to={config.routes.adminMoviecCreat}> Thêm phim</Link>, "adminMovie2"),
    ]),
    getItem("Quản lí Đồ ăn", "adminFood", <IoFastFoodOutline />, [
      getItem(<Link to={config.routes.adminFood}> Danh sách Food</Link>, "adminFood1"),
      getItem(<Link to={config.routes.adminFoodCreate}> Thêm Food</Link>, "adminFood2"),
    ]),
    ,
    getItem("Quản lí Slider", "adminSlider", <BiSlider />, [
      getItem(<Link to={config.routes.adminSlider}> Danh sách Slider</Link>, "adminSlider1"),
      getItem(<Link to={config.routes.adminSliderCreate}> Thêm Slider</Link>, "adminSlider2"),
    ]),

    getItem("Quản lí Voucher", "AdminVouchers", <FaTicketAlt />, [
      getItem(<Link to={config.routes.AdminVouchers}> Xem tất cả</Link>, "AdminVouchers1"),
      getItem(<Link to={config.routes.AdminVouchersCreate}> Thêm voucher</Link>, "AdminVouchers2"),
    ]),

    getItem("Quản lí bài viết", "AdminPosts", <SnippetsOutlined />, [
      getItem(<Link to={config.routes.AdminPosts}> Xem tất cả</Link>, "AdminPosts1"),
      getItem(<Link to={config.routes.AdminPosts}> Thêm bài viết</Link>, "AdminPosts2"),
    ]),

    getItem(<Link to={config.routes.webConfig}>Cài đặt</Link>, "webConfig", <SettingOutlined />),
    getItem(<Button type="link" onClick={handleSignout}>Đăng xuất</Button>, "Logout", <LogoutOutlined />),

  ];

  return (
    <Menu
      theme="dark"
      items={items}
      mode="inline"
    />
  );
};

export default MenuAdminLayout;
