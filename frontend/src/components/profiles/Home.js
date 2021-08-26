import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import StaffProfile from "./StaffProfile";
import AdminPanel from "../profiles/dashboard/AdminPanel";
import StaffManagement from "./StaffManagement";

const Home = ({ modalProps }) => {
  let user = useSelector((state) => state.auth.user);
  let current = useSelector((state) => state.employees.current);
  const [dashboardView, setDashboardView] = useState(
    user.business ? "business" : "employee"
  );
  useEffect(() => {
    setDashboardView(user.business ? "business" : "employee");
  }, [current.site]);
  if (dashboardView == "business") {
    return <AdminPanel setDashboardView={setDashboardView} />;
  } else {
    return (
      <StaffProfile
        modalProps={modalProps}
        setDashboardView={setDashboardView}
      />
    );
  }
};

export default Home;
