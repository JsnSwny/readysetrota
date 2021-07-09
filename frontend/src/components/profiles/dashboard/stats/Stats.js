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
    type == "business"
      ? current[currentFilter].id
      : employee
      ? employee
      : user.id;

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

  console.log(stats.hours);

  return (
    <div className="stats">
      <div className="flex-container--between">
        <StatsItem
          setBeforeDate={setBeforeDate}
          setAfterDate={setAfterDate}
          title="Shifts Worked"
          value={stats.hours.map((item) => item.c).reduce((a, b) => a + b, 0)}
          // difference={getDif(stats.shifts.current, stats.shifts.before)}
          dateDifference={dateDifference}
          color="teal"
        />
        {/* <StatsItem
          setBeforeDate={setBeforeDate}
          setAfterDate={setAfterDate}
          title="Hours Worked"
          value={stats.hours.map((item) => item.c).reduce((a, b) => a + b, 0)}
          // difference={getDif(stats.hours.current, stats.hours.before)}
          decimal={2}
          dateDifference={dateDifference}
          color="orange"
        /> */}
        {/*
        <StatsItem
          setBeforeDate={setBeforeDate}
          setAfterDate={setAfterDate}
          title={type == "business" ? "Estimated Outcome" : "Estimated Pay"}
          value={stats.wage.current}
          money={true}
          difference={getDif(stats.wage.current, stats.wage.before)}
          decimal={2}
          dateDifference={dateDifference}
          color="pink"
        />
        <StatsItem
          setBeforeDate={setBeforeDate}
          setAfterDate={setAfterDate}
          title={"Absences"}
          value={0}
          decimal={2}
          color="purple"
        /> */}
      </div>
    </div>
  );
};

export default Stats;
