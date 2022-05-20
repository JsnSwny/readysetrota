import React, { Fragment } from "react";

const Title = ({ name, subtitle, wrapper = "--md" }) => (
  <div className={`title-banner wrapper${wrapper}`}>
    <h1>{name}</h1>
    {subtitle && <p>{subtitle}</p>}
  </div>
);

export default Title;
