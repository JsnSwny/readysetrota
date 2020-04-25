import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ShiftList from "../shifts/ShiftList";

const PrivateRoute = ({ component: Component, ...rest }) => {
  let auth = useSelector((state) => state.auth);
  const { path } = rest;
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
          return <Component {...props} />;
        }
      }}
    />
  );
};

export default PrivateRoute;
