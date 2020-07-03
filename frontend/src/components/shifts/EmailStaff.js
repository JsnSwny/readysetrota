import React, { Fragment, useEffect, useState } from "react";
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
import { getDepartments, setDepartment } from "../../actions/employees";

const UpdateDepartment = (props) => {
  const dispatch = useDispatch();
  let departments = useSelector((state) => state.employees.departments);
  let user = useSelector((state) => state.auth.user);
  if (user && user.profile.role == "User") {
    departments = user.employee[0].position.map((item) => {
      return item.department;
    });
  }
  let currentDepartment = useSelector(
    (state) => state.employees.current_department
  );

  useEffect(() => {
    dispatch(getDepartments());
  }, []);

  const setDep = (id) => {
    dispatch(setDepartment(id));
  };

  return (
    <button className="btn-3 email">
      <i class="fas fa-envelope"></i>Email Staff
    </button>
  );
};

export default UpdateDepartment;
