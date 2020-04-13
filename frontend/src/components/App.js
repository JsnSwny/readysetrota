import React, { Component, Fragment, useState, useEffect } from "react";
import ReactDOM from "react-dom";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

import Nav from "./layout/Nav";

import { Provider, useDispatch } from "react-redux";
import store from "../store";
import ShiftList from "./shifts/ShiftList";
import "../css/styles.css";
import Staff from "./employees/Staff";
import ShiftDetail from "./shifts/ShiftDetail";

import Register from "./accounts/Register";
import Login from "./accounts/Login";

import PrivateRoute from "./common/PrivateRoute";

import { loadUser } from "../actions/auth";
import { useSelector } from "react-redux";
import Home from "./common/Home";
import YourRota from "./shifts/YourRota";
import { setWidth } from "../actions/responsive";

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
            <PrivateRoute path="/rota" exact component={ShiftList} />
            <Route path="/register" component={Register} />
            <Route path="/login" component={Login} />
            <PrivateRoute path="/staff" component={Staff} />
            <PrivateRoute path="/shift/:date" component={ShiftDetail} />
          </Switch>
        </div>
      </Router>
    </Provider>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));
