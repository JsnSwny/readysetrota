import React, { useState, useEffect, useRef, createRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import YourShiftsDesktop from "./YourShiftsDesktop";
import YourShiftsMobile from "./YourShiftsMobile";
import { getShifts } from "../../actions/shifts";
import { format } from "date-fns";

const YourShifts = () => {
  let current = useSelector((state) => state.employees.current);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      getShifts(format(new Date(), "yyyy-MM-dd"), "", true, true, user.id)
    );
  }, [current]);
  const width = useSelector((state) => state.responsive.width);

  return width > 980 ? <YourShiftsDesktop /> : <YourShiftsMobile />;
};

export default YourShifts;
