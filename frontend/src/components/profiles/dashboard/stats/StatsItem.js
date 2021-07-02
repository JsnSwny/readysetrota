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
}) => {
  return (
    <DashboardBlock size={"--third"}>
      <div className="flex-container--column">
        <div className="dashboard__block-title-container">
          <div className="dashboard__block-title">{title}</div>
        </div>
        {value == "Coming Soon" ? (
          <div class="stats__values">
            <h1>Coming Soon</h1>
          </div>
        ) : (
          <div className="stats__values">
            <h2>
              {money && "£"}
              <CountUp duration={1} decimals={decimal} end={value} />
            </h2>
            {difference == Infinity ? (
              <h3>
                <small>No previous data</small>
              </h3>
            ) : (
              <h3 onClick={setBeforeDate}>
                {difference > 0 && "+"}{" "}
                <CountUp duration={1} end={difference} />%
              </h3>
            )}
          </div>
        )}
      </div>
    </DashboardBlock>
  );
};

export default StatsItem;
