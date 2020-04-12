import React, { useEffect, useState, Fragment } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import {
  getEmployees,
  getPositions,
  deleteEmployee,
} from "../../actions/employees";
import Confirm from "../layout/Confirm";
import ShiftList from "../shifts/ShiftList";
import EnterID from "./EnterID";

const Home = () => {
  const [addButtonToggle, setAddButtonToggle] = useState(false);

  let user = useSelector((state) => state.auth.user);

  return (
    <Fragment>
      {user.profile.role == "Business" || user.employee.length > 0 ? (
        <ShiftList />
      ) : (
        <EnterID />
      )}
    </Fragment>
  );
};

export default Home;
