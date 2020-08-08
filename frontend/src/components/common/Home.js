import React, { useEffect, useState, Fragment } from "react";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import {
  getEmployees,
  getPositions,
  deleteEmployee,
} from "../../actions/employees";
import Confirm from "../layout/Confirm";
import Profile from "../shifts/Profile";
import ShiftList from "../shifts/ShiftList";
import EnterID from "./EnterID";

const Home = () => {
  let user = useSelector((state) => state.auth.user);
  return (
    <Fragment>
      {user.groups.some((item) => item.name == "Business") ? (
        <ShiftList />
      ) : (
        <Profile />
      )}
    </Fragment>
  );
};

export default Home;
