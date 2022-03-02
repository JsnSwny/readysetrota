import React from "react";

const WorkCard = ({ icon, title, description }) => {
  return (
    <div className="work-card">
      <i className={`fas fa-${icon}`}></i>
      <h4>{title}</h4>
      <p>{description}</p>
    </div>
  );
};

export default WorkCard;
