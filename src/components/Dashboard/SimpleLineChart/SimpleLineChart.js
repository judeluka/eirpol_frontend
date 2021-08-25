import React from "react";
import { Line } from "react-chartjs-2";

const data = {

  labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  datasets: [
    {
      label: "Fine Gael",
      data: [33, 53, 85, 41, 44, 65],
      fill: false,
      borderColor: "#99CC33"
    },
    {
      label: "Second dataset",
      data: [30, 27, 15, 44, 68, 60],
      fill: false,
      borderColor: "#326760"
    },
    {
        label: "Third dataset",
        data: [13, 54, 39, 59, 50, 36],
        fill: false,
        borderColor: "#66BB66"
      },
      {
        label: "Fourth dataset",
        data: [33, 15, 32, 51, 44, 71],
        fill: false,
        borderColor: "#660000"
      },
      {
        label: "Fifth dataset",
        data: [25, 29, 35, 41, 54, 76],
        fill: false,
        borderColor: "#6699FF"
      }
  ],
  maintainAspectRatio: false
};



export default function SimpleLineChart() {
  return (
    <div className="featuredItem">
      <Line data={data}  />
    </div>
  );
}