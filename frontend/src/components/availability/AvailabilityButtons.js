import React from "react";
import { useSelector } from "react-redux";
import { getMonth, parseISO, getDaysInMonth } from "date-fns";

const AvailabilityButtons = ({
  setCurrentSelector,
  currentSelector,
  monthlyAvailability,
  availabilityMonth,
}) => {
  let availability = useSelector((state) => state.employees.availability);
  return (
    <div className="dashboardAvailability__bottom">
      <p>
        <strong>
          {(
            (availability.filter(
              (item) =>
                getMonth(parseISO(item.date)) == getMonth(availabilityMonth)
            ).length /
              getDaysInMonth(availabilityMonth)) *
            100
          ).toFixed(2)}
          %
        </strong>{" "}
        Completed
      </p>

      <div>
        <button
          onClick={() => setCurrentSelector("available")}
          className={`dashboardAvailability__picker--green ${
            currentSelector == "available" ? "active" : ""
          }`}
        >
          Available
        </button>
        <button
          onClick={() => setCurrentSelector("unavailable")}
          className={`dashboardAvailability__picker--red ${
            currentSelector == "unavailable" ? "active" : ""
          }`}
        >
          Unavailable
        </button>
      </div>
    </div>
  );
};

export default AvailabilityButtons;
