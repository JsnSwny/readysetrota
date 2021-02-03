import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import Main from "./Main";

import { Provider } from "react-redux";
import store from "../store";
import { loadUser } from "../actions/auth";
import "../css/styles.css";
import "react-toastify/dist/ReactToastify.css";
import { setWidth } from "../actions/responsive";
import ErrorBoundary from "./ErrorBoundary"

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
    window.addEventListener("resize", () => {
      store.dispatch(setWidth(window.innerWidth));
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
