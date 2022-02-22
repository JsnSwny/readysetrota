import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import Loading from "../common/Loading";
import Landing from "../landing/Landing";
import { getSites } from "../../actions/employees";
import EnterID from "./EnterID";

const PrivateRoute = ({
  component: Component,
  modalProps,
  confirmProps,
  perms,
  title,
  ...rest
}) => {
  const dispatch = useDispatch();
  let auth = useSelector((state) => state.auth);
  let user = useSelector((state) => state.auth.user);
  let sites = useSelector((state) => state.employees.sites);
  let loading = useSelector((state) => state.loading);
  let business = useSelector((state) => state.employees.business);
  let employees = useSelector((state) => state.employees.employees);
  const permissions = useSelector(
    (state) => state.permissions.active_permissions
  );

  useEffect(() => {
    document.title = title ? `${title} | readysetrota` : "readysetrota";
  }, [title]);

  console.log(auth);

  if (
    auth &&
    auth.isAuthenticated &&
    (auth.user.employee.length > 0 || auth.user.business) &&
    loading.sites
  ) {
    return false;
  }

  const { computedMatch } = rest;
  let url = computedMatch.url;

  return (
    <Route
      {...rest}
      render={(props) => {
        if (auth.isLoading) {
          return false;
        } else if (!auth.isAuthenticated) {
          if (url == "/") {
            return <Landing />;
          } else {
            if (url.includes("/join")) {
              return (
                <Redirect
                  to={{
                    pathname: "/register",
                    state: { path: { url: url } },
                  }}
                />
              );
            }
            return (
              <Redirect
                to={{
                  pathname: "/login",
                  state: { url },
                }}
              />
            );
          }
        } else {
          if (perms) {
            if (!permissions.some((item) => perms.includes(item))) {
              return (
                <Redirect
                  to={{
                    pathname: "/",
                  }}
                />
              );
            }
          }
          if (!loading.sites && !auth.user.business && sites.length == 0) {
            return <EnterID />;
          }
          return (
            <Component
              {...props}
              modalProps={modalProps}
              confirmProps={confirmProps}
            />
          );
        }
      }}
    />
  );
};

export default PrivateRoute;
