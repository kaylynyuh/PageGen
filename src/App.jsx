import React from "react";
import Navbar from "./components/Navbar";

import PageBuilderEditor from "./components/PageBuilderEditor";
import PageBuilderRenderer from "./components/PageBuilderRenderer";
import { PageBuilderProvider } from "./contexts/PageBuilderContext";
import "./App.scss";

const App = () => {
  return (
    <PageBuilderProvider>
      <div className="app">
        <Navbar />
        <div className="editor">
          {/* <PageBuilderRenderer /> */}
          <PageBuilderEditor />
        </div>
      </div>
    </PageBuilderProvider>
  );
};

export default App;
