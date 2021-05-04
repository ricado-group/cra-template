import React from "react";
import { useAuth } from "@ricado/core-ui";
import UnauthenticatedApp from "./UnauthenticatedApp";
import LockedApp from "./LockedApp";
import AuthenticatedApp from "./AuthenticatedApp";

const App: React.FC = () => {
  const { token, isLocked } = useAuth();

  if (!token) return <UnauthenticatedApp />;

  if (isLocked) return <LockedApp />;

  return <AuthenticatedApp />;
};

export default App;
