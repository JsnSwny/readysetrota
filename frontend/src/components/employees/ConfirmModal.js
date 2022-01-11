import React from "react";
import SmallModal from "./SmallModal";
import ConfirmForm from "./ConfirmForm";

const ConfirmModal = ({ title, open, setOpen, action }) => {
  return (
    <SmallModal
      open={open}
      setOpen={setOpen}
      form={
        <ConfirmForm
          title={title}
          open={open}
          setOpen={setOpen}
          action={action}
        />
      }
      title="Confirm"
    />
  );
};

export default ConfirmModal;
