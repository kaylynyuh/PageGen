import React, { useState, useEffect } from "react";
import { usePageBuilder } from "../../contexts/PageBuilderContext";
import ToggleSwitch from "../ToggleSwitch";
import Modal from "../Modal";
import "./styles.scss";

const Navbar = () => {
  const {lastSaved, isDirty} = usePageBuilder();
  const [theme, setTheme] = useState("dark");
  const [showExitModal, setShowExitModal] = useState(false);

  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
  }, [theme]);

  const getSaveStatus = () => {
    if (isDirty) {
      return "Unsaved changes";
    }
    if (lastSaved) {
      return `Saved at ${lastSaved.toLocaleTimeString()}`;
    }
    return "";
  };

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
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
    <nav className="navbar">
      <div className="navbar-buttons">
        <button onClick={handleExit} className="exit-button">
          Exit
        </button>
        <div className="controls-right">
          <ToggleSwitch isToggled={theme === "dark"} onToggle={toggleTheme} />
          <span className="save-status">{getSaveStatus()}</span>
          <button className="save-button">Save</button>
        </div>
      </div>
      <Modal show={showExitModal} onConfirm={confirmExit} onCancel={cancelExit}>
        <p>Are you sure you want to exit? Any unsaved changes will be lost.</p>
      </Modal>
    </nav>
  );
};

export default Navbar;
