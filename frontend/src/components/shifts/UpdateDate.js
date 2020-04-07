import React, { Component, Fragment, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { getShifts } from "../../actions/shifts";
import {
  format,
  parseISO,
  addDays,
  subDays,
  addMonths,
  subMonths,
} from "date-fns";

const UpdateDate = () => {
  const dispatch = useDispatch();
  let date = useSelector((state) => state.shifts.date);
  return (
    <div className="dates__picker">
      <div className="dates__pickerWrapper">
        <h2
          onClick={() =>
            dispatch(
              getShifts(
                format(subDays(parseISO(date), 7), "YYY-MM-dd"),
                format(subDays(parseISO(date), 1), "YYY-MM-dd")
              )
            )
          }
        >
          <i class="fas fa-angle-double-left"></i>
        </h2>
        <h2
          onClick={() =>
            dispatch(
              getShifts(
                format(subDays(parseISO(date), 1), "YYY-MM-dd"),
                format(addDays(parseISO(date), 5), "YYY-MM-dd")
              )
            )
          }
        >
          <i class="fas fa-angle-left"></i>
        </h2>
        <h2 className="dates__pickerDate">
          {format(parseISO(date), "dd MMM")} -{" "}
          {format(addDays(parseISO(date), 6), "dd MMM")}
        </h2>
        <h2
          onClick={() =>
            dispatch(
              getShifts(
                format(addDays(parseISO(date), 1), "YYY-MM-dd"),
                format(addDays(parseISO(date), 7), "YYY-MM-dd")
              )
            )
          }
        >
          <i class="fas fa-angle-right"></i>
        </h2>
        <h2
          onClick={() =>
            dispatch(
              getShifts(
                format(addDays(parseISO(date), 7), "YYY-MM-dd"),
                format(addDays(parseISO(date), 13), "YYY-MM-dd")
              )
            )
          }
        >
          <i class="fas fa-angle-double-right"></i>
        </h2>
      </div>
    </div>
  );
};

export default UpdateDate;
