import React from "react";
import ReactDOM from "react-dom";
import "./index.less";
import App from "./App/App";
import AppProviders from "./context/AppProviders";
import Bugsnag from "@bugsnag/js";
import { ErrorBoundaryResult, defaultBugsnagConfig } from "@ricado/core-ui";

// Initialize Bugsnag
Bugsnag.start(defaultBugsnagConfig);
const ErrorBoundary = Bugsnag.getPlugin("react").createErrorBoundary(React);

// Render App
ReactDOM.render(
  <ErrorBoundary FallbackComponent={ErrorBoundaryResult}>
    <AppProviders>
      <App />
    </AppProviders>
  </ErrorBoundary>,
  document.getElementById("root")
);
