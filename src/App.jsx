import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Modal from "./components/Modal";

import PageBuilderEditor from "./components/PageBuilderEditor";
import PageBuilderRenderer from "./components/PageBuilderRenderer";
import { PageBuilderProvider } from "./contexts/PageBuilderContext";
import "./App.scss";

const App = () => {
  const [exit, onExit] = useState(false);
  const [save, onSave] = useState(false);
  const [showExitModal, setShowExitModal] = useState(false);

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

  const handleExit = () => {
    setShowExitModal(true);
  };

  const confirmExit = () => {
    onExit(true);
    setShowExitModal(false);
  };

  const cancelExit = () => {
    setShowExitModal(false);
  };

  return (
    <PageBuilderProvider>
      <div className="app">
        {showNavbar && (
          <Navbar exit={exit} save={save} onExit={handleExit} onSave={onSave} />
        )}
        <div className="editor">
          {renderPage ? <PageBuilderRenderer /> : <PageBuilderEditor />}
        </div>
        <Modal
          show={showExitModal}
          onConfirm={confirmExit}
          onCancel={cancelExit}
        >
          <p>Are you sure you want to exit? Any unsaved changes will be lost.</p>
        </Modal>
      </div>
    </PageBuilderProvider>
  );
};

export default App;