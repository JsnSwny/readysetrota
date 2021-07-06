import React, { Fragment } from "react";

const Title = ({ name, subtitle, breakWord }) => {
  if (!subtitle) {
    return (
      <div className="title-container">
        <h1 className={`title--lg ${breakWord ? "break" : ""}`}>{name}</h1>
      </div>
    );
  } else {
    return (
      <div className="title-container">
        <h4 className="title--sub">{subtitle}</h4>
        <h1 className={`title--lg ${breakWord ? "break" : ""}`}>{name}</h1>
      </div>
    );
  }
};

export default Title;
