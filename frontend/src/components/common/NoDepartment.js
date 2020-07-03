import React, { useEffect, useState, Fragment } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import {
  getEmployees,
  getPositions,
  deleteEmployee,
} from "../../actions/employees";
import { checkUUID } from "../../actions/employees";
import UpdateDepartment from "../shifts/UpdateDepartment";

const NoDepartment = () => {
  return (
    <div className="nodepartment">
      <h1>Select Department</h1>
      <UpdateDepartment />
    </div>
  );
};

export default NoDepartment;
