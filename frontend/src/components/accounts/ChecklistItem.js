import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const ChecklistItem = ({
  title,
  checklistItem,
  item_no,
  link,
  altStyle,
  setShowChecklist,
}) => {
  const checklist = useSelector((state) => state.checklist.items);

  const isComplete = () => {
    return checklist.find((item) => item.codename == checklistItem).active;
  };

  return (
    <Link
      to={link && link}
      onClick={() => setShowChecklist && setShowChecklist(false)}
    >
      <li
        className={`welcome-checklist__item ${
          altStyle ? "welcome-checklist__item--alt" : ""
        } ${isComplete() ? "complete" : ""}`}
      >
        <div className="welcome-checklist__left">
          <div className="welcome-checklist__circle">
            {isComplete() ? <i class="fas fa-check"></i> : item_no}
          </div>
          {title}
        </div>
        {!isComplete() && <i class="fas fa-angle-right"></i>}
      </li>
    </Link>
  );
};

export default ChecklistItem;
