import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { useAppSelector } from "../../../redux/hook";
import { Table } from "antd";
import { formatCurrency } from "../../../ultils";
type Props = {};
ChartJS.register(ArcElement, Tooltip, Legend);
const YearRevenue = (props: Props) => {
  const { dashboard } = useAppSelector((state) => state.DashboardReducer);
  let sum = dashboard?.profitByYear?.reduce((acc: any, item: any) => {
    return acc + item.profit;
  }, 0);
  const CripData = dashboard?.profitByYear?.map((item: any) => {
    return {
      ...item,
      profit: ((item.profit / sum) * 100).toFixed(2),
    };
  });

  const data = {
    labels: CripData?.map((item: any) => "Doanh thu " + item.date + " (%)"),
    datasets: [
      {
        label: "My First Dataset",
        data: CripData?.map((item: any) => +item.profit),
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
      title: "Năm",
      key: "name",
      render: (item: any) => item?.date,
    },
    {
      title: "Doanh thu",
      key: "age",
      render: (item: any) => formatCurrency(item?.profit),
    },
  ];
  const dataTable: any = dashboard?.profitByYear?.map((item: any) => {
    return {
      profit: item.profit,
      date: item.date,
    };
  });

  return (
    <>
      <div className="grid grid-cols-2 mx-10 my-20 border border-gray-600 rounded-md p-10">
        <div className="w-[400px] ">
          <Pie data={data} />
        </div>
        <div>
          <Table columns={columns} dataSource={dataTable} />
        </div>
      </div>
    </>
  );
};

export default YearRevenue;
