import { redirectToAccounts, useAuth } from "@ricado/core-ui";
import React from "react";

const LockedApp: React.FC = () => {
  const { isLocked } = useAuth();

  React.useEffect(() => {
    if (isLocked) {
      redirectToAccounts("SessionLock");
      return;
    }
  }, [isLocked]);

  return <div />;
};

export default LockedApp;
