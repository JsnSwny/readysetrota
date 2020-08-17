import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import Loading from "../common/Loading";

const PrivateRoute = ({ component: Component, ...rest }) => {
  let auth = useSelector((state) => state.auth);

  const { computedMatch } = rest;
  let url = computedMatch.url;

  return (
    <Route
      {...rest}
      render={(props) => {
        if (auth.isLoading) {
          return <Loading />;
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
