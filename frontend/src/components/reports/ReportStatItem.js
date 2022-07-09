import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import CountUp from "react-countup";
import { Line } from "react-chartjs-2";
import { format } from "date-fns";

const ReportStatItem = ({ data, data2, range, color }) => {
  const loading = useSelector((state) => state.loading);

  const [interval, setInterval] = useState([]);
  const [dataset, setDataset] = useState([]);

  useEffect(() => {
    if (!loading.stats) {
      setInterval(range);
      setDataset(data);
    }
  }, [loading.stats]);

  const chartData = {
    labels: interval.map((item) => format(item, "d MMM yyyy")),
    datasets: [
      {
        label: "Labour cost",
        data: data,
        backgroundColor: [color],
        borderColor: [color],
        borderWidth: 2,
        lineTension: 0.4,
        // fill: true,
      },
      {
        label: "Revenue",
        data: data2,
        backgroundColor: ["rgb(91, 208, 117)"],
        borderColor: ["rgb(91, 208, 117)"],
        borderWidth: 2,
        lineTension: 0.4,
        // fill: true,
      },
    ],
  };

  const totalDuration = 1000;
  const delayBetweenPoints = totalDuration / data.length;
  const previousY = (ctx) =>
    ctx.index === 0
      ? ctx.chart.scales.y.getPixelForValue(100)
      : ctx.chart
          .getDatasetMeta(ctx.datasetIndex)
          .data[ctx.index - 1].getProps(["y"], true).y;
  const animation = {
    x: {
      type: "number",
      easing: "linear",
      duration: delayBetweenPoints,
      from: NaN, // the point is initially skipped
      delay(ctx) {
        if (ctx.type !== "data" || ctx.xStarted) {
          return 0;
        }
        ctx.xStarted = true;
        return ctx.index * delayBetweenPoints;
      },
    },
    y: {
      type: "number",
      easing: "linear",
      duration: delayBetweenPoints,
      from: previousY,
      delay(ctx) {
        if (ctx.type !== "data" || ctx.yStarted) {
          return 0;
        }
        ctx.yStarted = true;
        return ctx.index * delayBetweenPoints;
      },
    },
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      intersect: false,
    },
    plugins: {
      // legend: false,
      legend: {
        // display: false,
        position: "right",
        align: "start",
      },
      title: {
        display: false,
      },
    },
    elements: {
      point: {
        radius: 0,
      },
    },
    animation: dataset.length > 14 ? animation : "linear",
    zoomEnabled: true,
    scales: {
      y: {
        suggestedMax: Math.max(...data),
        grid: {
          drawBorder: false,
          display: false,
        },
        beginAtZero: true,
        type: "linear",
      },
      x: {
        grid: {
          drawBorder: false,
          display: false,
        },
        ticks: {
          callback: (value, index, values) => {
            if (
              index === 0 ||
              index === Math.floor(chartData.labels.length / 2) ||
              index === chartData.labels.length - 1
            ) {
              return chartData.labels[index];
            }
          },
        },
      },
    },
  };

  return (
    <div className="stats-graph--report">
      <h3 className="mb-8 font-normal text-xl text-gray">
        Labour cost vs Revenue
      </h3>
      <div className="w-full h-60">
        {!loading.stats ? (
          <Line data={chartData} options={options} />
        ) : (
          <div className="dot-pulse"></div>
        )}
      </div>
    </div>
  );
};

export default ReportStatItem;
