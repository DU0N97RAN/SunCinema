import { Select } from "antd";
import moment from "moment";
import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import { useAppSelector } from "../../../redux/hook";
// import { dateFake } from "../../../ultils/data";

type Props = {};
let dateFake: any = [
  { profit: 0, date: "01" },
  { profit: 0, date: "02" },
  { profit: 0, date: "03" },
  { profit: 0, date: "04" },
  { profit: 0, date: "05" },
  { profit: 0, date: "06" },
  { profit: 0, date: "07" },
  { profit: 0, date: "08" },
  { profit: 0, date: "09" },
  { profit: 0, date: "10" },
  { profit: 0, date: "11" },
  { profit: 0, date: "12" },
];
const MonthRevenue = (props: Props) => {
  const { dashboard } = useAppSelector((state) => state.DashboardReducer);
  const [data, setData] = useState<any>([]);
  const [dataNew, setDataNew] = useState<any>([]);
  const [profitFake, setProfitFake] = useState(0);
  let arrYear = dashboard?.profitByMoth?.map((item: any) =>
    moment(item?.date).format("YYYY")
  );
  arrYear = arrYear?.filter(
    (item: any, index: any) => arrYear?.indexOf(item) === index
  );
  const handleChange = (value: any) => {
    setData(
      dashboard?.profitByMoth?.filter(
        (item: any) => moment(item?.date).format("YYYY") === value
      )
    );
  };

  const barDataTopMovie = {
    labels: data?.map(
      (item: any) => "Tháng " + moment(item?.date).format("MM")
    ),
    datasets: [
      {
        label: "Doanh thu của rạp theo tháng (vnđ)",
        borderWidth: 1,
        backgroundColor: "#ffc299",
        borderColor: "#cc5200",
        hoverBackgroundColor: "#ed873e",
        hoverBorderColor: "#e35f00",
        data: data?.map((item: any) => item?.profit),
      },
    ],
  };
  return (
    <>
      <div className="flex justify-center my-10">
        <p className="text-xl font-bold">Vui lòng chọn năm:</p>
        <Select
          onChange={handleChange}
          style={{ width: 200, marginLeft: "10px" }}
          placeholder="Chọn năm"
        >
          {arrYear?.map((item: any) => (
            <Select.Option value={item} key={item}>
              {item}
            </Select.Option>
          ))}
        </Select>
      </div>

      {data?.length === 0 ? (
        ""
      ) : (
        <div className="">
          <Line data={barDataTopMovie} height={275} />
        </div>
      )}
    </>
  );
};

export default MonthRevenue;
