import React, { useEffect, useState, Fragment } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import {
  getEmployees,
  getPositions,
  deleteEmployee,
} from "../../actions/employees";
import Confirm from "../layout/Confirm";
import YourRota from "../shifts/YourRota";
import ShiftList from "../shifts/ShiftList";
import EnterID from "./EnterID";

const Home = () => {
  const [addButtonToggle, setAddButtonToggle] = useState(false);

  let user = useSelector((state) => state.auth.user);

  return (
    <Fragment>
      {user.profile.role == "Business" ? (
        <ShiftList />
      ) : user.employee.length > 0 ? (
        <YourRota />
      ) : (
        <EnterID />
      )}
    </Fragment>
  );
};

export default Home;
