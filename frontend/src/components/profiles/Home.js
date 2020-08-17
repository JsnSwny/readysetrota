import React from "react";
import { useSelector } from "react-redux";
import Profile from "./Profile";
import BusinessProfile from "./BusinessProfile";

const Home = () => {
  let user = useSelector((state) => state.auth.user);
  return user.business ? <BusinessProfile /> : <Profile />;
};

export default Home;
