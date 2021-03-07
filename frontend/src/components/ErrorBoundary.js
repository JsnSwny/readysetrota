import React, { Component } from "react";
import PropTypes from "prop-types";

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: "", errorInfo: "", hasError: false };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  componentDidCatch(error, errorInfo) {
    this.setState({ errorInfo });
  }
  render() {
    const { hasError, errorInfo, error } = this.state;
    if (hasError) {
      return (
        <div className="error-container container-2">
          <h1>There was an error in loading this page. </h1>
          <p>
            <span
              style={{ cursor: "pointer", color: "#0077FF" }}
              onClick={() => {
                window.location.reload();
              }}
            >
              Reload this page
            </span>{" "}
          </p>
          <details className="error-details">
            <summary>Click for error details</summary>
            <h5>{error.message}</h5>
            <small>{errorInfo && errorInfo.componentStack.toString()}</small>
          </details>
        </div>
      );
    }
    return this.props.children;
  }
}
ErrorBoundary.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
};
