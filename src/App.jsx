import React from "react";

import PageGen from "./components/PageGen";
import { PageGenProvider } from "./contexts/PageGenContext";
import "./App.scss";

const App = () => {
  return (
    <PageGenProvider>
      <PageGen />
    </PageGenProvider>
  );
};

export default App;
