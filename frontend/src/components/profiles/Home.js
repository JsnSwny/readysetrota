import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import StaffProfile from "./StaffProfile";
import AdminPanel from "../profiles/dashboard/AdminPanel";
import StaffManagement from "./StaffManagement";

const Home = (props) => {
  let user = useSelector((state) => state.auth.user);
  const { modalProps } = props;
  const { setOpen } = modalProps;
  useEffect(() => {
    setOpen(false);
  }, []);
  if (user.business && user.business.plan == "F") {
    return <StaffManagement modalProps={modalProps} />;
  }
  if (user.business) {
    return <AdminPanel />;
  }
  return <StaffProfile />;
};

export default Home;
