import React from "react";
import { useSelector } from "react-redux";
import CountUp from "react-countup";
import { Line } from "react-chartjs-2";
import { format } from "date-fns";

const StatsItem = ({ title, decimals, data, interval, prefix }) => {
  const chartData = {
    labels: interval.map((item) => format(item, "d MMM yyyy")),
    datasets: [
      {
        label: title,
        data: data,
        backgroundColor: ["rgb(253, 128, 158)"],
        borderColor: ["rgb(253, 128, 158)"],
        borderWidth: 2,
      },
    ],
  };

  let loading = useSelector((state) => state.loading.stats);

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
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          maxTicksLimit: 8,
        },
      },
      x: {
        grid: {
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
    <div className="stats-graph">
      <h2>{title}</h2>
      <h3>
        <CountUp
          start={0}
          end={chartData.datasets[0].data.reduce((a, b) => a + b, 0)}
          duration={1}
          decimals={decimals}
          prefix={prefix}
        />
      </h3>
      <div className="stats-graph__item flex-container--center-vh">
        {loading ? (
          <div className="dot-pulse"></div>
        ) : (
          <Line data={chartData} options={options} />
        )}
      </div>
      <div className="flex-container--between stats-graph__dates">
        <p>{format(interval[0], "dd MMM yyyy")}</p>
        <p>{format(interval[interval.length - 1], "dd MMM yyyy")}</p>
      </div>
    </div>
  );
};

export default StatsItem;
