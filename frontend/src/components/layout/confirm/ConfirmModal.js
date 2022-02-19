import React from "react";
import SmallModal from "../SmallModal";
import ConfirmForm from "./ConfirmForm";

const ConfirmModal = ({ title, open, setOpen, action, actionTitle }) => {
  return (
    <SmallModal open={open} setOpen={setOpen} title="Confirm">
      <ConfirmForm
        title={title}
        setOpen={setOpen}
        action={action}
        actionTitle={actionTitle}
      />
    </SmallModal>
  );
};

export default ConfirmModal;
