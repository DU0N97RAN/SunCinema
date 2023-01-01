import { Button, message } from "antd";
import React, { useEffect, useState } from "react";
import { Link,useParams } from "react-router-dom";
import Ticket from "../../../components/client/Ticket";
import { useAppDispatch, useAppSelector } from "../../../redux/hook";
import { getOneOrder } from "../../../redux/slice/OrdersSlice";

type Props = {};

const AdminOrdersDetail = (props: Props) => {
   const { id } = useParams();
   document.title = `Admin Order ${id}`;
   const dispatch = useAppDispatch();
   const [orderDetail, setOrderDetail] = useState<any>();
   const [detail, setDetail] = useState<any>();
   const [totalPriceFinal, setTotalPriceFinal] = useState<any>(0);
   useEffect(() => {
      dispatch(getOneOrder(id));
   }, [id]);
   const { order } = useAppSelector((state: any) => state.OrderReducer);
   if (!order) {
      message.error("Lấy thông tin đơn hàng thất bại");
   }
   console.log(order)
   useEffect(() => {
      if (order) {
         setOrderDetail(order?.order);
         setDetail(order?.detail);
         let price = (order?.order?.foodDetailId?.totalPrice) + (order?.order?.totalPrice);
         setTotalPriceFinal(price);
      }
   }, [order]);
   return (
      <div>
         <Button type="primary" style={{ marginBottom: "20px" }}>
            <Link to="/admin/orders">DS Orders</Link>
         </Button>
         {order && <Ticket detail={detail} order={orderDetail} isAdmin={true}/>}
      </div>
   );
};

export default AdminOrdersDetail;
