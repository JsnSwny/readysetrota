import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ShiftList from "../shifts/ShiftList";
import NoDepartment from "./NoDepartment";
import EnterID from "./EnterID";

const PrivateRoute = ({ component: Component, ...rest }) => {
  let auth = useSelector((state) => state.auth);
  let groups = [];
  if (auth.user) {
    groups = auth.user.groups;
    groups = groups.map((item) => item.name);
  }

  const { path, computedMatch, pass, user_only_pass } = rest;
  let url = computedMatch.url;

  let currentDepartment = useSelector(
    (state) => state.employees.current_department
  );

  return (
    <Route
      {...rest}
      render={(props) => {
        if (auth.isLoading) {
          return <h2>Loading...</h2>;
        } else if (!auth.isAuthenticated) {
          return (
            <Redirect
              to={{
                pathname: "/login",
                state: { url },
              }}
            />
          );
        } else {
          return <Component {...props} />;
        }
      }}
    />
  );
};

export default PrivateRoute;
