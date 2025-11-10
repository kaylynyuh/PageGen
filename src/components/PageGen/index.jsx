import React, { useState } from "react";

import Navbar from "../Navbar";
import Editor from "../Editor";
import Renderer from "../Renderer";
import { usePageGen } from "../../contexts/PageGenContext";
import Modal from "../Modal";
import "./styles.scss";

const PageGen = () => {
  const { isDirty, lastSaved, setLastSaved } = usePageGen();
  const [showExitModal, setShowExitModal] = useState(false);

  const getSaveStatus = () => {
    if (isDirty) {
      return "Unsaved changes";
    }
    if (lastSaved) {
      return `Saved at ${lastSaved.toLocaleTimeString()}`;
    }
    return "";
  };

  const handleSave = () => {
    if (isDirty) {
      const now = new Date();
      setLastSaved(now);
    }
  };

  const handleExit = () => {
    setShowExitModal(true);
  };

  const confirmExit = () => {
    // Here you can add your exit logic, e.g., redirect to another page.
    console.log("Exiting...");
    setShowExitModal(false);
  };

  const cancelExit = () => {
    setShowExitModal(false);
  };

  return (
    <div className="page-gen">
      <Navbar
        onSave={handleSave}
        onExit={handleExit}
        saveStatus={getSaveStatus()}
      />
      <div className="editor">
        {/* <Renderer /> */}
        <Editor />
      </div>
      <Modal show={showExitModal} onConfirm={confirmExit} onCancel={cancelExit}>
        <p>Are you sure you want to exit? Any unsaved changes will be lost.</p>
      </Modal>
    </div>
  );
};

export default PageGen;
