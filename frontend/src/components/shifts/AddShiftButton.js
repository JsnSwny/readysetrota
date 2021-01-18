import React, { useState, Fragment } from "react";
import CreateShift from "../modals/CreateShift";
import { useSelector } from "react-redux";

const AddShiftButton = (props) => {
  const { employee, date, white, limit, template, setShiftInfo, setOpen, setType, setUpdate } = props;
  return (
    (!limit || employee.id <= limit) && (
      <Fragment>
        <div class={`flex-container`}>
          <p
            onClick={() => {
              setOpen(true);
              setType("shift");
              setShiftInfo({employee, date})
              setUpdate("");
            }}
            className={`shift__add${white ? "--white" : ""}`}
          >
            +
          </p>
        </div>
      </Fragment>
    )
  );
};

export default AddShiftButton;
