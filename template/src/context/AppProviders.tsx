import React, { PropsWithChildren } from "react";
import { BrowserRouter } from "react-router-dom";
import { VersionProvider, AuthProvider } from "@ricado/core-ui";
import { PointProvider } from "@ricado/points-service";
import { QueryCache, ReactQueryCacheProvider } from "react-query";
import { ReactQueryDevtools } from "react-query-devtools";

const queryCache = new QueryCache({
  defaultConfig: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: Infinity,
    },
  },
});

/**
 * Wrapper HOC which provides all neccesary context actions and state
 * to the App.
 */
const AppProviders: React.FC<PropsWithChildren<any>> = ({ children }) => {
  return (
    <ReactQueryCacheProvider queryCache={queryCache}>
      <BrowserRouter>
        <AuthProvider>
          <VersionProvider>
            <PointProvider>{children}</PointProvider>
          </VersionProvider>
        </AuthProvider>
        {process.env.NODE_ENV === "development" ? (
          <ReactQueryDevtools initialIsOpen />
        ) : null}
      </BrowserRouter>
    </ReactQueryCacheProvider>
  );
};

export default AppProviders;
