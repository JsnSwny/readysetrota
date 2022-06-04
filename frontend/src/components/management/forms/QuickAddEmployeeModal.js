import React from "react";
import SmallModal from "../../layout/SmallModal";
import QuickEmployeeForm from "./QuickEmployeeForm";

const ShiftModal = ({ open, setOpen }) => {
  return (
    open && (
      <SmallModal
        open={open}
        setOpen={setOpen}
        title={"Add a new employee"}
        size={"-md"}
      >
        <QuickEmployeeForm setOpen={setOpen} />
      </SmallModal>
    )
  );
};

export default ShiftModal;
