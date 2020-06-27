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
import UpdateDepartment from "../shifts/UpdateDepartment";

const UpdateDate = (props) => {
  const dispatch = useDispatch();
  const { daterange } = props;
  let width = useSelector((state) => state.responsive.width);
  let date = useSelector((state) => state.shifts.date);
  let formatDate = (date, add) => {
    let newDate = format(addDays(parseISO(date), add), "YYY-MM-dd");
    return newDate;
  };

  let dateRange = width > 1000 ? 6 : width > 600 ? 2 : 0;

  return (
    <div className="dates__picker container">
      <UpdateDepartment />
      <div className="dates__pickerWrapper">
        <p
          onClick={() => {
            dispatch(
              getShifts(
                formatDate(date, -dateRange - 1),
                formatDate(date, -dateRange + dateRange - 1)
              )
            );
          }}
        >
          <i className="fas fa-caret-left"></i>
        </p>
        <h2 className="dates__pickerDate">
          {format(parseISO(date), "dd MMM")} -{" "}
          {format(addDays(parseISO(date), dateRange), "dd MMM")}
        </h2>
        <p
          onClick={() => {
            dispatch(
              getShifts(
                formatDate(date, dateRange + 1),
                formatDate(date, dateRange + dateRange + 1)
              )
            );
          }}
        >
          <i className="fas fa-caret-right"></i>
        </p>
      </div>
    </div>
  );
};

export default UpdateDate;
