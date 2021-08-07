import React, { Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { format, parseISO } from "date-fns";
import AvailabilityRequestItem from "./AvailabilityRequestItem";
import { updateLeave } from "../../actions/availability";
import { updateAvailability } from "../../actions/employees";

const AvailabilityByDate = ({ selectedDate }) => {
  let leave = useSelector((state) => state.availability.leave);
  let availability = useSelector((state) => state.employees.availability);
  const dispatch = useDispatch();
  return (
    <Fragment>
      <AvailabilityRequestItem
        list={leave.filter(
          (leave) =>
            leave.start_date <= selectedDate && leave.end_date >= selectedDate
        )}
        type="leave"
        updateAction={updateLeave}
      />
      <AvailabilityRequestItem
        list={availability.filter(
          (item) => item.date == selectedDate && item.name == "unavailable"
        )}
        type="availabilities"
        updateAction={updateAvailability}
      />
    </Fragment>
  );
};

export default AvailabilityByDate;
