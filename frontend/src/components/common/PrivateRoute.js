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
  }

  const { path, computedMatch } = rest;
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
          if (
            !auth.user.employee.length > 0 &&
            !groups.some((item) => item.name == "Business")
          ) {
            return <EnterID />;
          } else if (currentDepartment != 0) {
            return <Component {...props} />;
          } else {
            return <NoDepartment />;
          }
        }
      }}
    />
  );
};

export default PrivateRoute;
