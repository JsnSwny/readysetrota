import React, { useState, Fragment } from "react";
import { useSelector } from "react-redux";
import StaffProfile from "./StaffProfile";
import CreateShift from "../modals/CreateShift";
import AdminPanel from "../profiles/dashboard/AdminPanel";

const Home = (props) => {
  let user = useSelector((state) => state.auth.user);
  if(user.business) {
    return <AdminPanel />
  }
  return <StaffProfile />
};

export default Home;
