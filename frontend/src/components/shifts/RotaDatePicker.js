import { setDate } from "date-fns";
import React from "react";
import { useSelector } from "react-redux";
import { format, parseISO, addDays } from "date-fns";

const RotaDatePicker = ({ updateShifts }) => {
  let width = useSelector((state) => state.responsive.width);
  let dateRange = width > 1200 ? 6 : width > 600 ? 2 : 0;
  let date = useSelector((state) => state.shifts.date);
  let end_date = useSelector((state) => state.shifts.end_date);
  const formatDate = (date, add, display = false) => {
    let newDate = display
      ? format(addDays(parseISO(date), add), "dd/MM/yyyy")
      : format(addDays(parseISO(date), add), "yyyy-MM-dd");

    return newDate;
  };
  return (
    <div className="rotaFunctions__datepicker">
      <i
        class="fas fa-caret-left"
        onClick={() => {
          updateShifts(
            formatDate(date, -dateRange - 1),
            formatDate(date, -dateRange + dateRange - 1)
          );
        }}
      ></i>
      <p>
        {format(parseISO(date), "do MMM")} -{" "}
        {format(parseISO(end_date), "do MMM")}
      </p>
      <i
        class="fas fa-caret-right"
        onClick={() => {
          updateShifts(
            formatDate(date, dateRange + 1),
            formatDate(date, dateRange + dateRange + 1)
          );
        }}
      ></i>
    </div>
  );
};

export default RotaDatePicker;
