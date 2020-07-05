import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ShiftList from "../shifts/ShiftList";
import NoDepartment from "./NoDepartment";

const PrivateRoute = ({ component: Component, ...rest }) => {
  let auth = useSelector((state) => state.auth);
  const { path } = rest;
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
                state: { path },
              }}
            />
          );
        } else {
          return currentDepartment != 0 ? (
            <Component {...props} />
          ) : (
            <NoDepartment />
          );
        }
      }}
    />
  );
};

export default PrivateRoute;
