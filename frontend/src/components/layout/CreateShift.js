import React from "react";
import AddShift from "../shifts/AddShift";

const CreateShift = (props) => {
  const { open, onConfirm, onClose, employeeName, employeeID, date } = props;

  return (
    open && (
      <div onClick={(e) => console.log(e)} className="modal">
        <div className="shiftModal__container">
          <AddShift
            employeeName={employeeName}
            employeeID={employeeID}
            date={date}
            onClose={onClose}
          />

          <div class="shiftModal__buttonsContainer">
            <div className="shiftModal__buttons">
              {/* <button
                className="shiftModal__buttonCancel modal__button"
                onClick={onClose}
              >
                Cancel
              </button>
              <button
                className="shiftModal__buttonConfirm modal__button"
                onClick={onConfirm}
              >
                Create
              </button> */}
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default CreateShift;
