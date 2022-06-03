import React from "react";
import SmallModal from "../layout/SmallModal";
import ShiftForm from "./ShiftForm";

const ShiftModal = ({ open, setOpen, editShift, shiftFormInfo }) => {
  return (
    open && (
      <SmallModal
        open={open}
        setOpen={setOpen}
        title={
          editShift
            ? `Edit ${shiftFormInfo.employee.full_name}'s Shift`
            : "Add a new shift"
        }
        size={"-md"}
      >
        <ShiftForm
          setOpen={setOpen}
          editShift={editShift}
          shiftFormInfo={shiftFormInfo}
        />
      </SmallModal>
    )
  );
};

export default ShiftModal;
