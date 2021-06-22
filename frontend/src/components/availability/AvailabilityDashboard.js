import React, { useEffect } from "react";
import { getNewAvailability } from "../../actions/availability";
import { useDispatch, useSelector } from "react-redux";

const AvailabilityDashboard = () => {
  const dispatch = useDispatch();

  const availabilities = useSelector(
    (state) => state.availability.availability
  );

  useEffect(() => {
    dispatch(getNewAvailability());
  }, []);

  return (
    <div className="container flex-container--wrap">
      {availabilities.map((item) => (
        <div className="card">
          <h2 className="card__title">{item.employee.full_name}</h2>
          <p className="card__subtitle">4 days (15 remaining)</p>
          <div className="flex-container--between">
            <div>
              <p>From</p>
              <p>{item.start_date}</p>
            </div>
            <div>
              <p>To</p>
              <p>{item.end_date}</p>
            </div>
            <div>
              <p>Type</p>
              <p>{item.availability_type}</p>
            </div>
          </div>
          <div className="flex-container--between">
            <button value="reject" className="btn-modal--cancel">
              Reject
            </button>
            <button value="approve" className="btn-modal--confirm">
              Approve
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AvailabilityDashboard;
