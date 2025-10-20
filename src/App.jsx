import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";

import PageBuilderEditor from "./components/PageBuilderEditor";
import PageBuilderRenderer from "./components/PageBuilderRenderer";
import { PageBuilderProvider } from "./contexts/PageBuilderContext";
import "./App.scss";

const App = () => {
  const [exit, onExit] = useState(false);
  const [save, onSave] = useState(false);
  const renderPage = exit || save;
  const showNavbar = !renderPage;

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onExit(false);
        onSave(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onExit, onSave]);

  return (
    <PageBuilderProvider>
      <div className="app">
        {showNavbar && (
          <Navbar exit={exit} save={save} onExit={onExit} onSave={onSave} />
        )}
        <div className="editor">
          {renderPage ? <PageBuilderRenderer /> : <PageBuilderEditor />}
        </div>
      </div>
    </PageBuilderProvider>
  );
};

export default App;
