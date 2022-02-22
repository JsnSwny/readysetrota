import React from "react";
import { Link } from "react-router-dom";

const TaskCard = ({ title, icon, text, button, colour }) => {
  return (
    <div className={`taskCard ${colour}`}>
      <div className="taskCard__content">
        <i className={`fas ${icon}`}></i>
        <div>
          <h3>{title}</h3>
          {text}
        </div>
      </div>

      <div className="flex-container--end-center taskCard__link">
        <Link to="/rota">{button}</Link> <i className="fas fa-angle-right"></i>
      </div>
    </div>
  );
};

export default TaskCard;
