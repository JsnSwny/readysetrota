import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import StatsHeader from "./StatsHeader";
import StatsItem from "./StatsItem";
import {
  addDays,
  format,
  subDays,
  differenceInDays,
  startOfWeek,
} from "date-fns";
import { getStats } from "../../../../actions/stats";

const Stats = ({ type, employee, title }) => {
  let stats = useSelector((state) => state.stats.stats);
  const [startDate, setStartDate] = useState(
    startOfWeek(new Date(), { weekStartsOn: 1 })
  );
  const [endDate, setEndDate] = useState(addDays(startDate, 6));
  let current = useSelector((state) => state.employees.current);
  let user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const [currentFilter, setCurrentFilter] = useState("site");

  let id =
    type == "business" ? current[currentFilter] : employee ? employee : user.id;

  const dateProps = { startDate, setStartDate, endDate, setEndDate };

  useEffect(() => {
    dispatch(
      getStats(
        type,
        id,
        format(startDate, "dd/MM/yyyy"),
        format(endDate, "dd/MM/yyyy"),
        currentFilter
      )
    );
  }, [startDate, endDate, id]);

  let dateDifference = differenceInDays(endDate, startDate);
  let startDateBefore = subDays(startDate, dateDifference + 1);
  let endDateBefore = subDays(startDate, 1);

  let endDateAfter = addDays(endDate, dateDifference + 1);
  let startDateAfter = addDays(endDate, 1);

  const getDif = (a, b) => {
    if (!a) {
      return 0;
    }
    return (a / b) * 100 - 100;
  };

  const setBeforeDate = () => {
    setStartDate(startDateBefore);
    setEndDate(endDateBefore);
  };

  const setAfterDate = () => {
    setStartDate(startDateAfter);
    setEndDate(endDateAfter);
  };

  return (
    <div className="stats">
      <StatsHeader
        title={title}
        setCurrentFilter={setCurrentFilter}
        currentFilter={currentFilter}
        setBeforeDate={setBeforeDate}
        setAfterDate={setAfterDate}
        type={type}
        {...dateProps}
      />
      <div className="flex-container--between">
        <StatsItem
          setBeforeDate={setBeforeDate}
          setAfterDate={setAfterDate}
          title="Shifts"
          value={stats.shifts.current}
          difference={getDif(stats.shifts.current, stats.shifts.before)}
          dateDifference={dateDifference}
        />
        <StatsItem
          setBeforeDate={setBeforeDate}
          setAfterDate={setAfterDate}
          title="Hours Worked"
          value={stats.hours.current}
          difference={getDif(stats.hours.current, stats.hours.before)}
          decimal={2}
          dateDifference={dateDifference}
        />
        <StatsItem
          setBeforeDate={setBeforeDate}
          setAfterDate={setAfterDate}
          title={type == "business" ? "Estimated Outcome" : "Estimated Pay"}
          value={stats.wage.current}
          money={true}
          difference={getDif(stats.wage.current, stats.wage.before)}
          decimal={2}
          dateDifference={dateDifference}
        />
      </div>
    </div>
  );
};

export default Stats;
