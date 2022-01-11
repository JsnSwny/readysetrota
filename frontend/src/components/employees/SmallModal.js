import React from "react";

const SmallModal = ({ title, open, setOpen, form }) => {
  return (
    <div className={`modal-container ${open ? "open" : ""}`}>
      <div className="modal-sm">
        <div className="modal-sm__heading">
          <h3>{title}</h3>
          <i class="fas fa-times" onClick={() => setOpen(false)}></i>
        </div>
        <hr />
        {form}
      </div>
    </div>
  );
};

export default SmallModal;
