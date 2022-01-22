import React from "react";

const TabItem = ({ id, title, current, setCurrent, scroll }) => {
  return (
    <div
      className={`tab__item ${current ? "active" : ""}`}
      onClick={() => {
        id ? setCurrent(id) : setCurrent(title);
        scroll();
      }}
    >
      {title}
    </div>
  );
};

export default TabItem;
