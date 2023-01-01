import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useAppSelector } from "../../../redux/hook";
import { Table } from "antd";
import { formatCurrency } from "../../../ultils";
type Props = {};
ChartJS.register(ArcElement, Tooltip, Legend);
const CripTicketFood = (props: Props) => {
  const { dashboard } = useAppSelector((state) => state.DashboardReducer);

  const data = {
    labels: ["Doanh thu vé (%)", "Doanh thu đồ ăn (%)"],
    datasets: [
      {
        label: "My First Dataset",
        data: [
          dashboard.length !== 0
            ? (
                (dashboard?.companyProfit[0]?.ticketTotal /
                  (dashboard?.companyProfit[0]?.ticketTotal +
                    dashboard?.companyProfit[0]?.foodTotal)) *
                100
              ).toFixed(2)
            : "",
          dashboard.length !== 0
            ? (
                (dashboard?.companyProfit[0]?.foodTotal /
                  (dashboard?.companyProfit[0]?.ticketTotal +
                    dashboard?.companyProfit[0]?.foodTotal)) *
                100
              ).toFixed(2)
            : "",
        ],
        backgroundColor: [
          "rgb(255, 99, 132)",
          "rgb(54, 162, 235)",
          "rgb(255, 205, 86)",
        ],
        hoverOffset: 4,
      },
    ],
  };

  const columns: any = [
    {
      title: "Doanh thu vé (vnđ)",
      key: "name",
      render: (item: any) => formatCurrency(item?.ticketTotal),
    },
    {
      title: "Doanh thu đồ ăn (vnđ)",
      key: "age",
      render: (item: any) => formatCurrency(item?.foodTotal),
    },
  ];
  const dataTable: any = dashboard?.companyProfit?.map((item: any) => {
    return {
      foodTotal: item.foodTotal,
      ticketTotal: item.ticketTotal,
    };
  });

  return (
    <>
      <div className="grid grid-cols-2 mx-10 my-20 border border-gray-600 rounded-md p-10">
        <div className="w-[400px]">
          <Pie data={data} />
        </div>
        <div>
          <Table columns={columns} dataSource={dataTable} />
        </div>
      </div>
    </>
  );
};

export default CripTicketFood;
