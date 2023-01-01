import { useEffect, useState } from "react";
import { MovieApi } from "../../../service/MovieApi";
import { orderApi } from "../../../service/orders";
import { UserApi } from "../../../service/userApi";
import { RiMovie2Fill, RiUserLine } from "react-icons/ri";
import {FaCheckCircle, FaCartArrowDown, FaShippingFast, FaMoneyCheck,FaTimes} from "react-icons/fa"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  LineElement,
} from "chart.js";
import { Bar, Line, Radar } from "react-chartjs-2";
import { useAppSelector } from "../../../redux/hook";
import Item from "antd/lib/list/Item";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

type Props = {};

const optionsMovie = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Phim doanh thu cao",
    },
  },
};

const optionsUser = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "User đăng ký theo năm",
    },
  },
};

const optionsOrder = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Doanh thu hàng năm",
    },
  },
};

const Dashboard = (props: Props) => {
  const [statOrder, setStatOrder] = useState<any[]>();
  const [totalOrder, setTotalOrder] = useState(0);
  const [totalMovie, setTotalMovie] = useState(0);
  const [totalUser, setTotalUser] = useState(0);
  const [totalPost, setTotalPost] = useState(0);

  const { users } = useAppSelector((state: any) => state.userReducer);
  const { tickets } = useAppSelector((state: any) => state.ticketReducer);

  const dataMovie = {
    labels: tickets.map((item: any) => `Số lượng vé ${item.quantity}`),
    datasets: [
      {
        label: "Ticket",
        data: tickets.map((item: any) => item.quantity),
        backgroundColor: [
          "rgba(75,192,192,1)",
          "#008000",
          "#800000",
          "#f3ba2f",
          "#2a71d0",
        ],
        borderColor: "black",
        borderWidth: 2,
      },
    ],
  };

  const years = users.map((item: any) => {
    return new Date(item.createdAt);
  });
  const dataUser = {
    labels: Array.apply(null, new Array(users.length)).map(
      (_, index) => `Số lượng user ${++index}`
    ),
    datasets: [
      {
        label: "User",
        data: years.map((year: any) => {
          return year.getFullYear();
        }),
        backgroundColor: [
          "rgba(75,192,192,1)",
          "#008000",
          "#800000",
          "#f3ba2f",
          "#2a71d0",
        ],
        borderColor: "black",
        borderWidth: 2,
      },
    ],
  };

  const [dataOrders, setDataOrder] = useState([]);
  const yearsOrder = dataOrders.map((item: any) => {
    return new Date(item.createdAt);
  });

  console.log(dataOrders.map((item: any) => item.ticketId));
  const dataOrder = {
    labels: yearsOrder.map((item: any) => {
      return `Năm ${item.getFullYear()}`;
    }),
    datasets: [
      {
        label: "Order",
        data: dataOrders.map((item: any) => item.totalPrice),
        backgroundColor: [
          "rgba(75,192,192,1)",
          "#008000",
          "#800000",
          "#f3ba2f",
          "#2a71d0",
        ],
        borderColor: "black",
        borderWidth: 2,
      },
    ],
  };

  useEffect(() => {
    (async () => {
      try {
        // phim
        const { data: movies, status: mStatus } = await MovieApi.getAll();
        if (mStatus == 200) setTotalMovie(movies?.length);

        // thống kê user
        const { status, data } = await UserApi.getAll();
        if (status == 200) setTotalUser(data?.length);

        // order
        const { data: orderData, status: orderStatus } =
          await orderApi.getAllOrder();
        setDataOrder(orderData);
        if (orderStatus == 200) setTotalPost(orderData?.length);
      } catch (error) {
        return error;
      }
    })();
  }, []);

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 mb-4 gap-4">
        {statOrder?.map((item, index) => (
          <div
            key={index}
            className={`bg-white p-3 rounded-md ${
              item.status === 0
                ? "order__card-item--new"
                : item.status === 1
                ? "order__card-item--verified"
                : item.status === 2
                ? "order__card-item--progress"
                : item.status === 3
                ? "order__card-item--success"
                : "order__card-item--cancel"
            }`}
          >
            <div className="">
              <div className="flex items-center justify-between">
                <div className="">
                  {item.status === 0 ? (
                    <FaCartArrowDown />
                  ) : item.status === 1 ? (
                    <FaCheckCircle />
                  ) : item.status === 2 ? (
                    <FaShippingFast />
                  ) : item.status === 3 ? (
                    <FaMoneyCheck/>
                  ) : (
                    <FaTimes />
                  )}
                </div>
                <div className="text-center">
                  <strong>{item.total}</strong>
                  <p className="font-semibold text-sm">{item.statusText}</p>
                </div>
              </div>

              <div className="order__card-percent">
                <div
                  className="order__card-percent-inner"
                  style={{ width: (item.total / totalOrder) * 100 + "%" }}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
        <div className="flex items-center p-3 justify-center bg-white rounded-md text-[#b5b5c3]">
          <RiMovie2Fill className="w-10 h-10 px-1" />
          <div className="text-center">
            <span className="block text-black font-semibold">{totalMovie}</span>
            <span className="text-sm font-semibold">
              Top phim có nhiều người xem nhiều nhất
            </span>
          </div>
        </div>
        <div className="flex items-center p-3 justify-center bg-white rounded-md text-[#b5b5c3]">
          <RiUserLine className="w-10 h-10 px-1" />
          <div className="text-center">
            <span className="block text-black font-semibold">{totalUser}</span>
            <span className="text-sm font-semibold">Số tài khoản hiện có</span>
          </div>
        </div>
        <div className="flex items-center p-3 justify-center bg-white rounded-md text-[#b5b5c3]">
          <div>
            {/* <FontAwesomeIcon icon={faShoppingCart} className="w-10 h-10 px-1" /> */}
          </div>

          <div className="text-center">
            <span className="block text-black font-semibold">{totalPost}</span>
            <span className="text-sm font-semibold">Tổng đơn đặt hàng</span>
          </div>
        </div>
      </div>

      {/* doanh thu phim theo tháng */}
      <div className="bg-white mt-4 rounded-md p-3">
        <Bar options={optionsMovie} data={dataMovie} />
      </div>

      {/* user đăng ký theo tháng */}
      <div className="bg-white mt-4 rounded-md p-3">
        <Line options={optionsUser} data={dataUser} />
      </div>

      {/* tổng đơn đặt hàng */}
      <div className="bg-white mt-4 rounded-md p-3">
        <Line options={optionsOrder} data={dataOrder} />
      </div>
    </div>
  );
};

export default Dashboard;
