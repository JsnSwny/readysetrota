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
    <div className="dates__picker container">
      <div className="dates__pickerWrapper">
        <p
          onClick={() => {
            dispatch(getShifts(formatDate(date, -7), formatDate(date, -7 + 6)));
          }}
        >
          <i className="fas fa-caret-left"></i>
        </p>
        <h2 className="dates__pickerDate">
          {format(parseISO(date), "dd MMM")} -{" "}
          {format(addDays(parseISO(date), 7), "dd MMM")}
        </h2>
        <p
          onClick={() => {
            dispatch(getShifts(formatDate(date, 7), formatDate(date, 7 + 6)));
          }}
        >
          <i className="fas fa-caret-right"></i>
        </p>
      </div>
    </div>
  );
};

export default UpdateDate;
