import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import StaffProfile from "./StaffProfile";
import AdminPanel from "../profiles/dashboard/AdminPanel";
import StaffManagement from "./StaffManagement";

const Home = ({ modalProps }) => {
  let user = useSelector((state) => state.auth.user);
  if (user.business && user.business.plan == "F") {
    return <StaffManagement modalProps={modalProps} />;
  }
  if (user.business) {
    return <AdminPanel />;
  }
  return <StaffProfile modalProps={modalProps} />;
};

export default Home;
