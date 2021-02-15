import React from "react";

const Confirm = (props) => {
  const { open, onConfirm, onClose, message, sidebarOpen } = props;

  return (
    open && (
      <div className={`modal App ${sidebarOpen ? "open" : ""}`}>
        <div className="modal__container">
          <div className="modal__message">
            <p>{message}</p>
          </div>

          <div className="modal__buttonsContainer">
            <div className="flex-container--between">
              <button className="btn-modal--cancel" onClick={onClose}>
                Cancel
              </button>
              <button className="btn-modal--confirm" onClick={onConfirm}>
                Confirm
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default Confirm;
