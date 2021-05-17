import React, { PropsWithChildren } from "react";
import { BrowserRouter } from "react-router-dom";
import { CoreProvider } from "@ricado/core-ui";
import { PointsProvider } from "@ricado/points-service";

/**
 * Wrapper HOC which provides all neccesary context actions and state
 * to the App.
 */
const AppProviders: React.FC<PropsWithChildren<any>> = ({ children }) => {
  return (
    <CoreProvider>
      <BrowserRouter>
        <PointsProvider>{children}</PointsProvider>
      </BrowserRouter>
    </CoreProvider>
  );
};

export default AppProviders;
