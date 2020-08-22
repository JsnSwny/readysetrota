import React, { useState, Fragment } from "react";
import CreateShift from "../layout/CreateShift";
import { useSelector } from "react-redux";

const AddShiftButton = (props) => {
  const { employee, date, white } = props;
  let business = useSelector((state) => state.auth.business);
  const [open, setOpen] = useState("");
  return (
    business && (
      <Fragment>
        <CreateShift
          open={open}
          type="shift"
          onConfirm={() => {
            setOpen(false);
          }}
          onClose={() => {
            setOpen(false);
          }}
          employee={employee}
          date={date}
        />
        <div style={{ display: "flex" }}>
          <p
            onClick={() => {
              setOpen(true);
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
