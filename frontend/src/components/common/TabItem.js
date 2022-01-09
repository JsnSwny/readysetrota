import React from "react";

const TabItem = ({ id, title, current, setCurrent }) => {
  return (
    <div
      className={`tab__item ${
        (id ? current == id : current == title) ? "active" : ""
      }`}
      onClick={() => (id ? setCurrent(id) : setCurrent(title))}
    >
      {title}
    </div>
  );
};

export default TabItem;
