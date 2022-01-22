import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import CountUp from "react-countup";
import { Line } from "react-chartjs-2";
import { format } from "date-fns";

const ReportStatItem = ({ data, range, color }) => {
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
        data: dataset,
        backgroundColor: [color],
        borderColor: [color],
        borderWidth: 1,
        lineTension: 0.2,
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
    legend: {
      display: false,
    },
    interaction: {
      intersect: false,
    },
    plugins: {
      legend: false,
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
        grid: {
          drawBorder: false,
          display: false,
        },
        beginAtZero: true,
        ticks: {
          display: false,
        },
      },
      x: {
        grid: {
          drawBorder: false,
          display: false,
        },
        ticks: {
          autoSkip: true,
          display: false,
        },
      },
    },
  };

  return (
    <div className="stats-graph--report">
      {!loading.stats ? (
        <Line data={chartData} options={options} />
      ) : (
        <div className="dot-pulse"></div>
      )}
    </div>
  );
};

export default ReportStatItem;
