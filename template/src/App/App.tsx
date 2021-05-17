import React from "react";
import { HelpPage } from "@ricado/core-ui";
import { Routes, Route, Navigate } from "react-router-dom";

import AppLayout from "./AppLayout";
import FeaturePage from "../Feature/FeaturePage";

const App: React.FC = () => {
  return (
    <AppLayout>
      <Routes>
        <Route path="feature" element={<FeaturePage />} />
        <Route path="help" element={<HelpPage />} />
        <Route path="*" element={<Navigate to="feature" />} />
      </Routes>
    </AppLayout>
  );
};

export default App;
