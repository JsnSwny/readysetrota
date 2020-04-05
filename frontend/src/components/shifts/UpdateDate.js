import React, { Component, Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import PropTypes from "prop-types";
import { getShifts } from "../../actions/shifts";
import { format, parseISO, formatRelative, subDays, addDays } from "date-fns";

const UpdateDate = () => {
  const dispatch = useDispatch();
  const dateChange = e => {
    const formattedDate = parseISO(e.target.value);
    var weekFromDate = addDays(formattedDate, 6);

    weekFromDate = format(weekFromDate, "YYY-MM-dd");
    dispatch(getShifts(e.target.value, weekFromDate));
  };

  const currentDate = useSelector(state => state.shifts.date);

  return (
    <Fragment>
      <input
        className="searchDateInput"
        type="date"
        onChange={dateChange}
        value={currentDate}
      ></input>
    </Fragment>
  );
};

export default UpdateDate;
