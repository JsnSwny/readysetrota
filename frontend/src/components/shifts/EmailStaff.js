import React from "react";
import { useDispatch } from "react-redux";
import { publish } from "../../actions/shifts";

const EmailStaff = () => {
  const dispatch = useDispatch();

  return (
    <button
      onClick={() => {
        dispatch(publish());
      }}
      className="btn-3"
    >
      <i className="fas fa-check"></i>Publish
    </button>
  );
};

export default EmailStaff;
