import { DatePicker } from "antd";
import moment from "moment";
import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hook";
import { getAllOrders } from "../../../redux/slice/OrdersSlice";
import { convertDateToNumber, formatCurrency } from "../../../ultils";

type Props = {};

const StatisticsOverTime = (props: Props) => {
  const dispatch = useAppDispatch();
  let { orders } = useAppSelector((state: any) => state.OrderReducer);
  const [dateStart, setDateStart] = useState();
  const [dateEnd, setDateEnd] = useState();
  const [total, setTotal] = useState(0);
  const [totalTicket, setTotalTicket] = useState(0);
  const [totalFood, setTotalFood] = useState(0);
  let t = 0;
  let tk = 0;
  let fd = 0;
  orders = orders.filter((item: any) => item.status == 1 || item.status == 3);

  React.useEffect(() => {
    dispatch(getAllOrders({}));
  }, [dispatch]);
  const { RangePicker } = DatePicker;
  const onChangeDate = (_: any, dateStrings: any) => {
    setDateStart(dateStrings[0]);
    setDateEnd(dateStrings[1]);
    let order = orders.filter(
      (item: any) =>
        convertDateToNumber(item?.createdAt) >=
          convertDateToNumber(dateStrings[0]) &&
        convertDateToNumber(item?.createdAt) <=
          convertDateToNumber(dateStrings[1])
      // moment(item?.createdAt).unix() >= moment(dateStrings[0]).unix() &&
      // moment(item?.createdAt).unix() <= moment(dateStrings[1]).unix()
    );
    tk = order.reduce((a: any, b: any) => {
      return a + b.ticketId.totalPrice;
    }, 0);
    fd = order.reduce((a: any, b: any) => {
      return a + b.foodDetailId.totalPrice;
    }, 0);
    t = order.reduce((a: any, b: any) => {
      return a + b.totalPrice;
    }, 0);
    console.log(order);

    setTotal(t);
    setTotalTicket(tk);
    setTotalFood(fd);
  };

  return (
    <>
      <div className="min-h-[200px] my-20">
        <div className=" text-center">
          <p className="text-xl font-bold">
            Chọn khoảng thời gian cần thống kê:
          </p>
          <RangePicker onChange={onChangeDate} />
        </div>
        {dateStart && (
          <div className="text-center py-10 text-xl">
            Doanh thu từ ngày "{moment(dateStart).format("DD-MM-YYYY")}" đến
            ngày "{moment(dateEnd).format("DD-MM-YYYY")}":{" "}
            {/* <span className="text-2xl text-red-600">
              {formatCurrency(total)}
            </span> */}
            <table className="border border-gray-600 w-full my-5">
              <thead>
                <tr>
                  <th>Doanh thu đồ ăn</th>
                  <th>Doanh thu vé</th>
                  <th>Tổng</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{formatCurrency(totalFood)}</td>
                  <td>{formatCurrency(totalTicket)}</td>
                  <td>{formatCurrency(total)}</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
};

export default StatisticsOverTime;
