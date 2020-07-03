import React, { useEffect, useSelector } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Nav from "./layout/Nav";

import { Provider } from "react-redux";
import store from "../store";
import Shifts from "./shifts/Shifts";
import "../css/styles.css";
import Staff from "./employees/Staff";
import ShiftDetail from "./shifts/ShiftDetail";

import Register from "./accounts/Register";
import Login from "./accounts/Login";

import PrivateRoute from "./common/PrivateRoute";

import { loadUser } from "../actions/auth";
import Home from "./common/Home";
import { setWidth } from "../actions/responsive";

import ChangePassword from "./accounts/ChangePassword";

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
    window.addEventListener("resize", () => {
      store.dispatch(setWidth(window.innerWidth));
    });
  }, []);
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Nav />
          <Switch>
            <PrivateRoute path="/" exact component={Home} />
            <PrivateRoute path="/rota" exact component={Shifts} />
            <Route path="/register" component={Register} />
            <Route path="/login" component={Login} />
            <PrivateRoute path="/staff" component={Staff} />
            <PrivateRoute path="/shift/:date" component={ShiftDetail} />
            <PrivateRoute path="/changepassword" component={ChangePassword} />
          </Switch>
        </div>
      </Router>
    </Provider>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));
