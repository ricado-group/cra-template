import React from "react";
import {
  ErrorDialog,
  FullPageLoader,
  redirectToAccounts,
} from "@ricado/core-ui";
import { Routes, Route, Navigate } from "react-router-dom";
import { useCurrentUser } from "../UserAccount/UserAccountClient";
import AppLayout from "./AppLayout";
import FeaturePage from "../Feature/FeaturePage";

const AuthenticatedApp: React.FC = () => {
  const { data: user, status, error } = useCurrentUser();

  React.useEffect(() => {
    if (user && !user.hasPinCode) {
      redirectToAccounts("SetPin");
    }
  }, [user]);

  if (!user || status === "loading") return <FullPageLoader />;

  if (error) return <ErrorDialog error={error} />;

  return (
    <AppLayout>
      <Routes>
        <Route path="feature" element={<FeaturePage />} />
        <Route path="*" element={<Navigate to="feature" />} />
      </Routes>
    </AppLayout>
  );
};

export default AuthenticatedApp;
