import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import ShiftList from "./ShiftList";
import UpdateDate from "./UpdateDate";

const Shifts = () => {
  return (
    <Fragment>
      <ShiftList />
    </Fragment>
  );
};

export default Shifts;
