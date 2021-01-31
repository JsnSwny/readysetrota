import React, { useState, Fragment } from "react";
import { useSelector } from "react-redux";
import StaffProfile from "./StaffProfile";
import CreateShift from "../modals/CreateShift";
import AdminPanel from "../profiles/dashboard/AdminPanel";
import StaffManagement from "./StaffManagement";

const Home = (props) => {
  let user = useSelector((state) => state.auth.user);
  const { modalProps } = props;
  if(user.business && user.business.plan == "F") {
    return <StaffManagement modalProps={modalProps} />
  }
  if(user.business) {
    return <AdminPanel />
  }
  return <StaffProfile />
};

export default Home;
