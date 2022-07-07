import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import ChecklistItem from "./ChecklistItem";
import { updateBusiness } from "../../actions/employees";

const ChecklistPopup = () => {
  const dispatch = useDispatch();
  const [showChecklist, setShowChecklist] = useState(false);
  const checklist = useSelector((state) => state.checklist.items);
  const user = useSelector((state) => state.auth.user);
  console.log(checklist);
  const getChecklistPercentage = () => {
    let values = checklist.map((item) => item.active);
    return (
      (values.filter((item) => item == true).length / values.length) *
      100
    ).toFixed(0);
  };
  if (getChecklistPercentage() == 100) {
    dispatch(updateBusiness(user.business.id, { show_welcome: false }));
  }
  return (
    <div className={`checklist-popup ${showChecklist ? "active" : ""}`}>
      <div className={`checklist-popup__container`}>
        <div className="checklist-popup__top">
          <h2>Let's get started!</h2>
          <div className="percentage-progress reverse">
            <div
              className="percentage-progress__complete reverse"
              style={{ width: `${getChecklistPercentage()}%` }}
            ></div>
          </div>
          <p className="percentage-progress__amount reverse">
            {getChecklistPercentage()}% complete
          </p>
        </div>
        <div className="checklist-popup__list">
          {checklist.map((item, idx) => (
            <ChecklistItem
              title={item.name}
              checklistItem={item.codename}
              item_no={idx + 1}
              link={item.link}
              altStyle={true}
              setShowChecklist={setShowChecklist}
            />
          ))}
        </div>
      </div>

      <span
        onClick={() => setShowChecklist(!showChecklist)}
        className="checklist-popup-icon"
      >
        <i className="fas fa-tasks"></i>
      </span>
    </div>
  );
};

export default ChecklistPopup;
