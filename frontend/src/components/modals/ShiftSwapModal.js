import React, { Fragment, useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import AddShift from "../shifts/AddShift";
import AddStaff from "../employees/AddStaff";
import { getShiftsByID, swapShifts } from "../../actions/shifts";

const ShiftSwapModal = (props) => {
  const { shiftSwap } = props;
  const dispatch = useDispatch();
  let user = useSelector((state) => state.auth.user);
  let shifts = useSelector((state) => state.shifts.user_shifts);

  useEffect(() => {
    dispatch(getShiftsByID(user.employee[0].id));
  }, []);

  return (
    <Fragment>
      <label>
        Select Shift to Swap with {shiftSwap.start_time} - {shiftSwap.end_time}
      </label>
      <select
        onChange={(e) => {
          const shiftSwapObj = {
            shift_from: e.target.value,
            shift_to: shiftSwap.id,
          };
          dispatch(swapShifts(shiftSwapObj));
        }}
      >
        <option value="" disabled selected>
          Select a shift to swap
        </option>
        {shifts.map((shift) => (
          <option value={shift.id}>
            {shift.start_time} - {shift.end_time}
          </option>
        ))}
      </select>
    </Fragment>
  );
};

export default ShiftSwapModal;
