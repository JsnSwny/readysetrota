import React from "react";

const Confirm = (props) => {
  const { open, onConfirm, onClose, message } = props;

  return (
    open && (
      <div onClick={(e) => console.log(e)} className="modal">
        <div className="modal__container">
          <div className="modal__message">
            <p>{message}</p>
          </div>

          <div class="modal__buttonsContainer">
            <div className="modal__buttons">
              <button
                className="modal__buttonCancel modal__button"
                onClick={onClose}
              >
                Cancel
              </button>
              <button
                className="modal__buttonConfirm modal__button"
                onClick={onConfirm}
              >
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
