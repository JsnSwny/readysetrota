import React, { useEffect, useState, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getEmployees, getPositions } from "../../actions/employees";
import TabItem from "../common/TabItem";
import PersonalDetails from "./forms/employees-form/PersonalDetails";
import { parseISO, format } from "date-fns";
import Title from "../common/Title";
import Employees from "./tables/Employees";
import Departments from "./tables/Departments";
import Positions from "./tables/Positions";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

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
