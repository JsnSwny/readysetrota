import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import Main from "./Main";

import { Provider } from "react-redux";
import store from "../store";
import { loadUser } from "../actions/auth";
import "../css/styles.css";
import "react-toastify/dist/ReactToastify.css";
import { setWidth } from "../actions/responsive";
import ErrorBoundary from "./ErrorBoundary";
import { install } from "resize-observer";

const App = () => {
  useEffect(() => {
    install();
    store.dispatch(loadUser());
    window.addEventListener("resize", () => {
      store.dispatch(setWidth(document.body.clientWidth));
    });
  }, []);

  return (
    <Provider store={store}>
      <ErrorBoundary>
        <Main />
      </ErrorBoundary>
    </Provider>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));
