import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { publish } from "../../actions/shifts";

const UpdateDepartment = (props) => {
  const dispatch = useDispatch();
  let currentDepartment = useSelector(
    (state) => state.employees.current_department
  );

  return (
    <button
      onClick={() => {
        dispatch(publish());
      }}
      className="btn-3 email"
    >
      <i class="fas fa-check"></i>Publish
    </button>
  );
};

export default UpdateDepartment;
