import React from "react";
import SmallModal from "../layout/SmallModal";
import HolidayForm from "./HolidayForm";

const HolidayModal = ({ open, setOpen }) => {
  return (
    open && (
      <SmallModal
        open={open}
        setOpen={setOpen}
        title="Request a Holiday"
        size={"-sm"}
      >
        <HolidayForm setOpen={setOpen} />
      </SmallModal>
    )
  );
};

export default HolidayModal;
