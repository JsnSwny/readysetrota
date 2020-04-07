import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { TableBody } from "semantic-ui-react";

const Confirm = (props) => {
  const { open, onConfirm, onClose, message } = props;

  return (
    open && (
      <div onClick={(e) => console.log(e)} className="modal">
        <div className="modal__container">
          <div class="modal__message">
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
