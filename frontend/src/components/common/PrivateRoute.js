import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import Loading from "../common/Loading";
import Landing from "../landing/Landing";
import { getSites } from "../../actions/employees";
import EnterID from "./EnterID";
import Beta from "../landing/Beta";

const PrivateRoute = ({
  component: Component,
  modalProps,
  confirmProps,
  admin,
  perms,
  ...rest
}) => {
  const dispatch = useDispatch();
  let auth = useSelector((state) => state.auth);
  let user = useSelector((state) => state.auth.user);
  let sites = useSelector((state) => state.employees.sites);
  let loading = useSelector((state) => state.loading);
  let business = useSelector((state) => state.employees.business);
  let permissions = useSelector(
    (state) => state.employees.current.site.permissions
  );
  let hasPerm = true;
  if (perms) {
    hasPerm = user && permissions.some((item) => perms.includes(item));
  }

  useEffect(() => {
    if (auth.user) {
      dispatch(getSites());
      modalProps.setOpen(false);
    }
  }, [auth]);

  if (auth && auth.isAuthenticated && loading.sites) {
    return false;
  }

  const { computedMatch } = rest;
  let url = computedMatch.url;
  return (
    <Route
      {...rest}
      render={(props) => {
        if (auth.isLoading) {
          return <Loading />;
        } else if (!auth.isAuthenticated) {
          if (url == "/") {
            return <Beta {...modalProps} />;
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
            if (!hasPerm) {
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
