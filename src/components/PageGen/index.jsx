import React, { useState } from "react";

import Navbar from "../Navbar";
import Editor from "../Editor";
import Renderer from "../Renderer";
import { usePageGen } from "../../contexts/PageGenContext";
import Modal from "../Modal";
import "./styles.scss";

const PageGen = () => {
  const { lastSaved, setLastSaved, value } = usePageGen();
  const [showExitModal, setShowExitModal] = useState(false);
  const [confirmExit, setConfirmExit] = useState(false);

  const showNavbar = !confirmExit 

  const getSaveStatus = () => {
    if (lastSaved) {
      return `Saved at ${lastSaved.toLocaleTimeString()}`;
    }
    return "Unsaved changes";
  };

  const handleSave = () => {
    const now = new Date();
    setLastSaved(now);
  };

  const handleExit = () => {
    setShowExitModal(true);
  };

  const handleConfirmExit = () => {
    // Here you can add your exit logic, e.g., redirect to another page.
    setShowExitModal(false);
    setConfirmExit(true);
  };

  const cancelExit = () => {
    setShowExitModal(false);
    setConfirmExit(false);
  };

  console.log('value in PageGen:', value);
  return (
    <div>
      {showNavbar && (
        <Navbar
          onSave={handleSave}
          onExit={handleExit}
          saveStatus={getSaveStatus()}
        />
      )}
      <div className="page-gen">{confirmExit ? <Renderer  /> : <Editor />}</div>
      <Modal
        show={showExitModal}
        onConfirm={handleConfirmExit}
        onCancel={cancelExit}
      >
        <p>Are you sure you want to exit? Any unsaved changes will be lost.</p>
      </Modal>
    </div>
  );
};

export default PageGen;
