import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import Loading from "../common/Loading";
import Landing from "../landing/Landing";

const PrivateRoute = ({ component: Component, modalProps, confirmProps, admin, ...rest }) => {
  let auth = useSelector((state) => state.auth);
  let siteAdmin = useSelector((state) => state.employees.site_admin);


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
            return <Landing />;
          } else {
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
          if(admin) {
            if(!siteAdmin)  {
              return (
                <Redirect
                  to={{
                    pathname: "/"
                  }}
                />
              );
            }
          }
            
          return <Component {...props} modalProps={modalProps} confirmProps={confirmProps} />;
        }
      }}
    />
  );
};

export default PrivateRoute;
