import React from "react";
import Chart from "react-apexcharts";

const Charts = () => {
  const series = [
    {
      name: "Vehicles",
      data: [44, 55, 41, 67, 22, 43, 21],
    },
    {
      name: "Drivers",
      data: [13, 23, 20, 8, 13, 27, 33],
    },
    {
      name: "Maintenance",
      data: [11, 17, 15, 15, 21, 14, 15],
    },
  ];
  const options = {
    chart: {
      height: 350,
      type: "area",
      zoom: {
        enabled: false,
      },
      toolbar: {
        show: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
    },
    xaxis: {
      type: "datetime",
      categories: [
        "01/01/2022 00:00",
        "02/01/2022 01:30",
        "03/01/2022 02:30",
        "04/01/2022 03:30",
        "05/01/2022 04:30",
        "06/01/2022 05:30",
        "07/01/2022 06:30",
      ],
    },
    tooltip: {
      x: {
        format: "dd/MM/yy HH:mm",
      },
    },
  };

  return <Chart options={options} series={series} type="area" height={350} />;
};

export default Charts;
