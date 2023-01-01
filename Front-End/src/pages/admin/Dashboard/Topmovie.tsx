import React from "react";
import { Bar, Line, Radar } from "react-chartjs-2";
import { useAppSelector } from "../../../redux/hook";
type Props = {};

const Topmovie = (props: Props) => {
  const { dashboard } = useAppSelector((state) => state.DashboardReducer);

  const barDataTopMovie = {
    labels: dashboard?.topMovieProfit
      ?.slice(0, 10)
      .map((item: any) => item.name),
    datasets: [
      {
        label: "Doanh thu của phim (vnđ)",
        borderWidth: 1,
        backgroundColor: "#ffc299",
        borderColor: "#cc5200",
        hoverBackgroundColor: "#ed873e",
        hoverBorderColor: "#e35f00",
        data: dashboard?.topMovieProfit
          ?.slice(0, 10)
          .map((item: any) => item.profit),
        barPercentage: 0.5,
      },
    ],
    options: {
      aspectRatio: 1,
      scales: {
        x: {
          max: 200,
        },
        y: {
          max: 200,
        },
      },
    },
  };
  return (
    <>
      <h3 className="text-center my-10 text-[40px]">
        TOP 10 phim có doanh thu cao nhất
      </h3>
      <Bar data={barDataTopMovie} height={275} />;
    </>
  );
};

export default Topmovie;
