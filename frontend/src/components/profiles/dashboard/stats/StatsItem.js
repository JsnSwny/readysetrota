import React from "react";
import CountUp from "react-countup";
import DashboardBlock from "../DashboardBlock";

const StatsItem = ({
  setBeforeDate,
  title,
  value,
  money,
  difference,
  decimal,
  color,
}) => {
  return (
    <div className={`stats__item ${color}`}>
      <div className="stats__values">
        <h2>
          {money && "£"}
          <CountUp duration={1} decimals={decimal} end={value} />
        </h2>
        <h3>{title}</h3>
      </div>
    </div>
  );
};

export default StatsItem;
