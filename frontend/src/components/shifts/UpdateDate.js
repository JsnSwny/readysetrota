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
  differenceInDays,
} from "date-fns";

const UpdateDate = (props) => {
  const dispatch = useDispatch();
  const { daterange } = props;
  let date = useSelector((state) => state.shifts.date);
  let formatDate = (date, add) => {
    let newDate = format(addDays(parseISO(date), add), "YYY-MM-dd");
    return newDate;
  };

  return (
    <div className="dates__picker">
      <div className="dates__pickerWrapper">
        <h2
          onClick={() => {
            dispatch(getShifts(formatDate(date, -7), formatDate(date, -7 + 6)));
          }}
        >
          <i className="fas fa-angle-double-left"></i>
        </h2>
        <h2
          onClick={() => {
            dispatch(getShifts(formatDate(date, -1), formatDate(date, -1 + 6)));
          }}
        >
          <i className="fas fa-angle-left"></i>
        </h2>
        <h2 className="dates__pickerDate">
          {format(parseISO(date), "ccc do MMM")}
        </h2>
        <h2
          onClick={() => {
            dispatch(getShifts(formatDate(date, 1), formatDate(date, 1 + 6)));
          }}
        >
          <i className="fas fa-angle-right"></i>
        </h2>
        <h2
          onClick={() => {
            dispatch(getShifts(formatDate(date, 7), formatDate(date, 7 + 6)));
          }}
        >
          <i className="fas fa-angle-double-right"></i>
        </h2>
      </div>
    </div>
  );
};

export default UpdateDate;
