import React from "react";

const Feature = ({ title, content }) => {
  return (
    <div className="features__item">
      <span className="features__hang-left"></span>
      <span className="features__hang-right"></span>
      <h3>{title}</h3>
      <p>{content}</p>
    </div>
  );
};

export default Feature;
