import React from "react";
import SmallModal from "../../layout/SmallModal";
import TimeclockForm from "./TimeclockForm";

const TimeclockModal = ({ open, setOpen, extraInfo }) => {
  return (
    open && (
      <SmallModal
        open={open}
        setOpen={setOpen}
        title={"Add a new timeclock"}
        size={"-md"}
      >
        <TimeclockForm setOpen={setOpen} extraInfo={extraInfo} />
      </SmallModal>
    )
  );
};

export default TimeclockModal;
