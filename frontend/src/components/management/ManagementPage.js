import React, { useEffect, useState, Fragment } from "react";
import Title from "../common/Title";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

const ManagementPage = ({ children, currentSection }) => {
  const dispatch = useDispatch();
  const { sectionParam } = useParams();

  useEffect(() => {
    if (sectionParam) {
      setCurrentSection(sectionParam);
    }
  }, []);

  const sections = [
    { title: "Departments", icon: "fas fa-building" },
    { title: "Positions", icon: "fas fa-tags" },
    { title: "Employees", icon: "fas fa-user-tie" },
  ];

  return (
    <div className="wrapper--md">
      <div className="banner">
        <div className="list-title">
          {sections.map((item) => (
            <Link
              to={`/${item.title.toLowerCase()}`}
              className={currentSection == item.title ? "active" : ""}
            >
              <i class={item.icon}></i> {item.title}
            </Link>
          ))}
        </div>
        <Title name={currentSection} breakWord={false} />
      </div>
      {children}
    </div>
  );
};

export default ManagementPage;
