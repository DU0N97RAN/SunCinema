import { Button, message } from "antd";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../../redux/hook";
import { getByShortId } from "../../../redux/slice/OrdersSlice";
import Ticket from "../../../components/client/Ticket";


type Props = {}

const CheckOrder = (props: Props) => {
  const { id } = useParams();
  document.title = `Admin Order ${id}`;
  const dispatch = useAppDispatch();
  const [orderDetail, setOrderDetail] = useState<any>();
  const [detail, setDetail] = useState<any>();
  const { isLogged, currentUser } = useAppSelector((state) => state.authReducer);
  const [totalPriceFinal, setTotalPriceFinal] = useState<any>(0);
  useEffect(() => {
    dispatch(getByShortId(id));
  }, [id]);
  const { order } = useAppSelector((state: any) => state.OrderReducer);
  if (!order) {
    message.error("Lấy thông tin đơn hàng thất bại");
  }
  useEffect(() => {
    if (order) {
      setOrderDetail(order?.order);
      setDetail(order?.detail);
      let price = (order?.order?.foodDetailId?.totalPrice) + (order?.order?.totalPrice);
      setTotalPriceFinal(price);
    }
  }, [order]);
  return (
    <section className="container max-w-6xl p-3 bg-white mt-8 justify-center h-auto">
      <div>
        <span>Thông tin đơn hàng {id}</span>
        {order && <Ticket detail={detail} order={orderDetail} isAdmin={currentUser.role == 1} />}
      </div>
    </section>
  );
}

export default CheckOrder