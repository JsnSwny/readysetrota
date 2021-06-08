import React from "react";

const Tab = ({title, setCurrentTab, currentTab}) => {
    return (
        <button
            onClick={() => setCurrentTab(title)}
            className={`btn-8 ${currentTab == title ? "active" : ""}`}
          >
            {title}
          </button>
    )
}

export default Tab;