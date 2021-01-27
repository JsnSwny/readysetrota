import React, {useEffect} from "react";
import { useDispatch } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import Loading from "../common/Loading";
import Landing from "../landing/Landing";
import { getSites } from "../../actions/employees"

const PrivateRoute = ({ component: Component, modalProps, confirmProps, admin, ...rest }) => {
  const dispatch = useDispatch();
  let auth = useSelector((state) => state.auth);
  let siteAdmin = useSelector((state) => state.employees.site_admin);
  let sites = useSelector((state) => state.employees.sites);
  let loading = useSelector((state) => state.loading)


  useEffect(() => {
    if(auth.user) {
      dispatch(getSites());
    }
  }, [auth])


  if(auth && auth.isAuthenticated && admin && loading.sites) {
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
