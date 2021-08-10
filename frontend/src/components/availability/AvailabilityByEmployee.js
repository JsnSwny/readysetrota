import React, { Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { format, parseISO } from "date-fns";
import AvailabilityRequestItem from "./AvailabilityRequestItem";
import { updateLeave } from "../../actions/availability";
import { updateAvailability } from "../../actions/employees";

const AvailabilityByEmployee = ({ selectedEmployee }) => {
  let leave = useSelector((state) => state.availability.leave);
  let availability = useSelector((state) => state.employees.availability);
  const dispatch = useDispatch();
  return (
    <Fragment>
      <AvailabilityRequestItem
        list={leave.filter((leave) => leave.employee.id == selectedEmployee.id)}
        type="leave"
        updateAction={updateLeave}
      />
      <AvailabilityRequestItem
        list={availability.filter(
          (item) =>
            item.employee.id == selectedEmployee.id &&
            item.name == "unavailable"
        )}
        type="availabilities"
        updateAction={updateAvailability}
      />
    </Fragment>
  );
};

export default AvailabilityByEmployee;
