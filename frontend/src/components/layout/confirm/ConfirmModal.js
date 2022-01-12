import React from "react";
import SmallModal from "../SmallModal";
import ConfirmForm from "./ConfirmForm";

const ConfirmModal = ({ title, open, setOpen, action }) => {
  return (
    <SmallModal open={open} setOpen={setOpen} title="Confirm">
      <ConfirmForm title={title} setOpen={setOpen} action={action} />
    </SmallModal>
  );
};

export default ConfirmModal;
