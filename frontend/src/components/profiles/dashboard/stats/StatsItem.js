import React from "react";
import CountUp from "react-countup";

const StatsItem = ({
  setBeforeDate,
  title,
  value,
  money,
  difference,
  decimal,
}) => {
  return (
    <div className="dashboard__block--third">
      <div className="flex-container--column">
        <div className="dashboard__block-title-container">
          <div className="dashboard__block-title">{title}</div>
        </div>
        <div className="stats__values">
          <h2>
            {money && "£"}
            <CountUp duration={1} decimals={decimal} end={value} />
          </h2>
          <h3 onClick={setBeforeDate}>
            {difference > 0 && "+"} <CountUp duration={1} end={difference} />%
          </h3>
        </div>
      </div>
    </div>
  );
};

export default StatsItem;
