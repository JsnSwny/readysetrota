import React, { Component, Fragment, useState } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Nav from "./layout/Nav";

import { Provider, useDispatch } from "react-redux";
import store from "../store";
import ShiftList from "./shifts/ShiftList";
import "../css/styles.css";
import Staff from "./employees/Staff";
import ShiftDetail from "./shifts/ShiftDetail";

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Nav />
          <Switch>
            <Route path="/" exact component={ShiftList} />
            <Route path="/staff" component={Staff} />
            <Route path="/shift/:date" component={ShiftDetail} />
          </Switch>
        </div>
      </Router>
    </Provider>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));
