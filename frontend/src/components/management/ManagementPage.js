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
    <Fragment>
      <Title name={currentSection} />
      <div className="wrapper--md">{children}</div>
    </Fragment>
  );
};

export default ManagementPage;
