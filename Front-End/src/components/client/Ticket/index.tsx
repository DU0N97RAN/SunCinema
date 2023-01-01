import React, { useEffect, useState } from 'react'
import { formatCurrency, formatDateString, formatTime } from '../../../ultils'
import "./order.scss"
import { Button, Skeleton, message, notification } from "antd"
import { useAppDispatch } from '../../../redux/hook'
import { orderApi } from '../../../service/orders'
import { exportTicketThunk, getAllOrders, getOneOrder } from '../../../redux/slice/OrdersSlice'
import { useNavigate } from 'react-router-dom'
import configRoute from '../../../config';
import { Spin } from 'antd';
type Props = {
   detail?: any,
   order?: any,
   isAdmin?: any,
   isPayment?: any
}

const Ticket = ({ detail, order, isAdmin }: Props) => {
   const [total, setTotal] = useState<any>();
   const [discount, setDiscount] = useState<any>();
   const dispatch = useAppDispatch();
   useEffect(() => {
      if (order) {
         let a = (order?.foodDetailId?.totalPrice) + (order?.ticketId?.totalPrice);
         setTotal(a)
      }
   }, [order, detail]);

   useEffect(() => {
      if (total) {
         let b = (total) - (order?.totalPrice);
         setDiscount(b)
      }
   }, [order, total, detail]);

   const handle = () => {
      notification.info({ message: "Đang xuất vé, xin vui lòng chờ trong giây lát" })
      document.location.href = `${import.meta.env.VITE_API_URL}/ticket-export/${order?._id}`
      setTimeout(() => {
         dispatch(getOneOrder(order?._id))
         dispatch(getAllOrders({}))
      }, 2000);
   }
   return (
      <>
         {detail && order ? (
            <div className='cardContainer'>
               <div className="ticket">
                  <div className="ticket--start">
                     <img src="https://i.ibb.co/W3cK42J/image-1.png" />
                  </div>
                  <div className="ticket--center">
                     <div className="ticket--center--row">
                        <div className="ticket--center--col">
                           <span>Phim bạn đã đặt</span>
                           <strong>{detail[0]?.movie}</strong>
                        </div>
                        <div className="ticket--center--col">
                           <span className="ticket--info--title">Order info</span>
                           <span className="ticket--info--content">Order {order?._id}. Ordered By {order?.userId?.username}</span>
                        </div>
                     </div>
                     <div className="ticket--center--row">
                        <div className="ticket--center--col">
                           <span className="ticket--info--title">Thời gian</span>
                           <span className="ticket--info--subtitle">{formatDateString(detail[0]?.startAt)}</span>
                           <span className="ticket--info--content"> {formatTime(detail[0]?.startAt)}  to {formatTime(detail[0]?.endAt)}</span>
                        </div>
                        {order?.foodDetailId?.food?.length > 0 ? (
                           <div className="ticket--center--col">
                              <span className="ticket--info--title">Đồ ăn</span>
                              <div className="ticket--info--subtitle">SL: {order?.foodDetailId?.food?.map((item: any) => (
                                 <span key={item?.foodId?._id}>{item?.foodId?.name}{`(${item?.quantity}),`}</span>
                              ))}</div>
                              <span className="ticket--info--content">{` price: ${formatCurrency(order?.foodDetailId?.totalPrice)}`}</span>
                           </div>
                        ) : ""}

                     </div>
                     <div className="ticket--center--row">
                        <div className="ticket--center--col">
                           <span className="ticket--info--title">Thông tin vé </span>
                           <span className="ticket--info--content">Ghế: {detail[0]?.seats} {`(${order?.ticketId?.quantity} ticket)`}</span>
                           <span className="ticket--info--content">Phòng chiếu: {detail[0]?.room}</span>
                           <span className="ticket--info--content">Giá vé: {formatCurrency(order?.ticketId?.totalPrice)}</span>
                        </div>
                        <div className="ticket--center--col">
                           <span className="ticket--info--title">Thông tin thanh toán</span>
                           <span className="ticket--info--subtitle">{` Giá tạm tính: ${formatCurrency(total)}`}</span>
                           <span className="ticket--info--subtitle">{` Giảm: ${formatCurrency(discount)}`}</span>
                           <span className="ticket--info--subtitle">{` Tổng thanh toán: ${formatCurrency(order?.totalPrice)}`}</span>
                           <span className="ticket--info--content">{` Trạng thái thanh toán: ${order?.status === 1 ? "Đã thanh toán" : order?.status == 3 ? "Đã xuất vé" : "Chưa thanh toán / thanh toán lỗi"}`}</span>
                        </div>

                     </div>
                  </div>
               </div>
               {isAdmin && (
                  <>
                     {order?.status === 1 ? (
                        <>
                           <Button type='link' className='uppercase font-bold' onClick={handle}>
                              Xuất vé ngay
                           </Button>
                        </>
                     ) : (
                        <>
                           <Button type='link' className='uppercase font-bold'>
                              Đơn hàng chưa thanh toán hoặc đã xuất vé
                           </Button>
                        </>
                     )}
                  </>
               )}
            </div>
         ) : (
            <>
               <Skeleton />
            </>
         )}
      </>
   )
}

export default Ticket