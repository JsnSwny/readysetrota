import React from "react";

const Loading = ({ active }) => {
  if (active)
    return (
      <div className="loader">
        <div className="loader__circle"></div>
      </div>
    );
  else return false;
};

export default Loading;
