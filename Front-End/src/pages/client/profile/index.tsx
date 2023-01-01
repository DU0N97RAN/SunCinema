import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../redux/hook";
import styles from "./profile.module.scss";
import { Table, Card, Button, Modal } from "antd";
import InfoUser from "../../../components/client/profile/InfoUser";
import Avatar from "../../../components/client/profile/Avatar";
import configRoute from "../../../config";
import { formatCurrency, formatDateString } from "../../../ultils";
import DataTable from "../../../components/admin/Form&Table/Table";
import Ticket from "../../../components/client/Ticket";
import { getOneOrder } from "../../../redux/slice/OrdersSlice";
import ChangePassword from "./ChangePassword";
type Props = {};

const Profile = (props: Props) => {
  const { currentUser, isLogged } = useAppSelector(
    (state) => state.authReducer
  );
  const { users } = useAppSelector((state: any) => state.userReducer);
  const { orders } = useAppSelector((state: any) => state.OrderReducer);
  const [open, setOpen] = useState(false);
  const [yourOrder, setYourOrder] = useState<any>([]);
  const [orderID, setOrderID] = useState<any>();
  const [orderDetail, setOrderDetail] = useState<any>();
  const [detail, setDetail] = useState<any>();
  const [totalPriceFinal, setTotalPriceFinal] = useState<any>(0);
  const id = currentUser._id;
  const user = users?.find((item: any) => item._id === id);
  const [isActive, setActive] = useState(1);
  const isToggle = (number: number) => {
    setActive(number);
  };
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handle = (id: any) => {
    setOrderID(id);
  };
  useEffect(() => {
    if (orders) {
      let a = orders?.filter((item: any) => item?.userId?._id === user?._id);
      setYourOrder(a);
    }
  }, [orders]);
  // console.log(yourOrder);

  useEffect(() => {
    dispatch(getOneOrder(orderID));
  }, [orderID]);
  const { order } = useAppSelector((state: any) => state.OrderReducer);

  useEffect(() => {
    if (order) {
      setOrderDetail(order?.order);
      setDetail(order?.detail);
      let price = (order?.order?.foodDetailId?.totalPrice || 0) + (order?.order?.totalPrice);
      setTotalPriceFinal(price);
    }
  }, [order]);

  const columns = [
    {
      title: "Ngày đặt",
      dataIndex: "createdAt",
      render: (_: any, { createdAt }: any) => formatDateString(createdAt),
    },
    {
      title: "Mã đơn hàng",
      dataIndex: "shortId",
      render: (_: any, { shortId, _id }: any) => (
        <>
          <Button type="link" onClick={() => { handle(_id); setOpen(true) }}>{shortId}</Button>
          <Modal
            title={`Đơn hàng ${shortId}`}
            centered
            open={open}
            onOk={() => setOpen(false)}
            onCancel={() => setOpen(false)}
            width={1000}
          >
            {order && <Ticket detail={detail} order={orderDetail} />}
          </Modal>
        </>
      ),
    },
    {
      title: "Số tiền thanh toán",
      dataIndex: "totalPrice",
      render: (_: any, { totalPrice }: any) => formatCurrency(totalPrice),
    },
    {
      title: "Trạng Thái",
      dataIndex: "status",
      render: (_: any, record: any) => <p>{record?.status === 0 ? 'Chưa thanh toán  ' : record?.status === 3 ? "Đã xuất vé" : "Đã thanh toán"}</p>,
    },
  ];
  const data: any[] = yourOrder?.map((item: any, index: any) => {
    return {
      key: index + 1,
      shortId: item?.shortId,
      totalPrice: item?.totalPrice,
      status: item?.status,
      createdAt: item?.createdAt,
      _id: item?._id,
    };
  });
  return (
    <>
      <div className={styles.container}>
        <div className={styles.head}>
          <div className={styles.bg}>
            <img
              src="https://res.cloudinary.com/hungtv/image/upload/v1665649901/banner_profile_ppie5s.jpg"
              alt=""
            />
          </div>
          <div className={styles.avatar}>
            <Avatar />
          </div>
        </div>
        <div className={styles.main}>
          <div className={styles.btn}>
            <button
              onClick={() => isToggle(1)}
              className={isActive == 1 ? styles.btn_active : ""}
            >
              Thông tin cá nhân
            </button>
            <button
              onClick={() => isToggle(2)}
              className={isActive == 2 ? styles.btn_active : ""}
            >
              Đổi mật khẩu
            </button>
            <button
              onClick={() => isToggle(3)}
              className={isActive == 3 ? styles.btn_active : ""}
            >
              Lịch sử đặt vé
            </button>
          </div>
          {/* infomation */}
          <div className={isActive == 1 ? styles.info : "hidden"}>
            <InfoUser />
          </div>
          {/* change password */}
          <div className={isActive == 2 ? styles.changePass : "hidden"}>
            <ChangePassword />
          </div>
          {/* history */}
          <div className={isActive == 3 ? styles.history : "hidden"}>
            <Card>Bạn có {yourOrder?.length} đơn hàng</Card>
            <DataTable column={columns} data={data} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
