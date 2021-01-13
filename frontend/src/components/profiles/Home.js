import React, { useState, Fragment } from "react";
import { useSelector } from "react-redux";
import StaffProfile from "./StaffProfile";
import BusinessProfile from "./BusinessProfile";
import CreateShift from "../modals/CreateShift";

const Home = (props) => {
  let user = useSelector((state) => state.auth.user);
  if(user.business) {
    return <BusinessProfile />
  }
  return <StaffProfile />
};

export default Home;
