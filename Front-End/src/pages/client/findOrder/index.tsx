import { Card, notification } from "antd";
import { useEffect, useState } from "react";
import Ticket from "../../../components/client/Ticket";
import { useAppDispatch, useAppSelector } from "../../../redux/hook";
import { getByShortId, getOneOrder } from "../../../redux/slice/OrdersSlice";
type Props = {}


const FindOrder = (props: Props) => {
  const [orderId, setOrderId] = useState("");
  const [showlog, setShowlog] = useState(false);
  const [detail, setDetail] = useState<any>();
  const [totalPriceFinal, setTotalPriceFinal] = useState<any>(0);
  const [orderDetail, setOrderDetail] = useState<any>();
  const [id, setId] = useState<any>("")
  const { orders } = useAppSelector((state: any) => state.OrderReducer);

  useEffect(() => {
    document.title = "Tra cứu đơn hàng"
  }, []);
  const dispatch = useAppDispatch();
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!orderId.trim() || orderId?.length < 1) {
      notification.info({ message: "Vui lòng nhập mã đơn hàng!" });
      setShowlog(false)
      return;
    }
    let find = orders?.find((item: any) => item?.shortId === orderId);
    if (!find) {
      notification.info({ message: "Không tìm thấy đơn hàng nào !" })
    } else {
      setShowlog(true);
      setId(orderId)
    }
  };

  useEffect(() => {
    dispatch(getByShortId(id))
  }, [id, orderId]);
  const { order } = useAppSelector((state: any) => state.OrderReducer);

  useEffect(() => {
    if (order) {
      // console.log(order);
      setOrderDetail(order?.order);
      setDetail(order?.detail);
      let price = (order?.order?.foodDetailId?.totalPrice || 0) + (order?.order?.totalPrice);
      setTotalPriceFinal(price);
    }
  }, [order]);

  const handleChangeOrderId = (e: any) => {
    setOrderId(e.target.value);
  };

  return (
    <section className="container max-w-6xl px-3  mt-8 justify-center h-auto">
      <div className="mt-5 pt-5 flex justify-start h-full items-center bg-[#182b47] rounded-md flex-col" >
        <p className="mt-8 text-white capitalize " >Nhập mã đơn hàng để tra cứu</p>
        <form className="mb-14 w-full  p-3" onSubmit={handleSubmit}>
          <div className="mt-3">
            <label htmlFor="form__forgot-email" className="font-semibold block mb-1 text-danger">
              Mã đơn hàng *
            </label>
            <input
              value={orderId}
              onChange={handleChangeOrderId}
              type="text"
              className="shadow-[inset_0_1px_2px_rgba(0,0,0,0.1)] hover:shadow-none focus:shadow-[0_0_5px_#ccc] w-full border px-2 h-10 text-sm outline-none"
              placeholder="Mã đơn hàng"
            />
          </div>

          <button className="select-none mt-8 px-3 py-2 bg-orange-400 font-semibold uppercase text-white text-sm transition ease-linear duration-300 hover:shadow-[inset_0_0_100px_rgba(0,0,0,0.2)]">
            Tra cứu
          </button>
        </form>

        {showlog ? (
          <div className="bg-white mb-3">
            <p className="p-3 text-danger">Đã tìm thấy đơn hàng của bạn </p>
            <Ticket detail={detail} order={orderDetail} />
          </div>
        ) : null}
      </div>
    </section>
  )
}

export default FindOrder