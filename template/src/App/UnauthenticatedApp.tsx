import React from "react";
import { redirectToAccounts, useAuth } from "@ricado/core-ui";

const UnauthenticatedApp: React.FC = () => {
  const { token } = useAuth();

  React.useEffect(() => {
    if (!token) {
      redirectToAccounts("SignIn");
    }
  }, [token]);

  return <div />;
};

export default UnauthenticatedApp;
