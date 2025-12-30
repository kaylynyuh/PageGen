import React, { useState, useEffect } from "react";
import ToggleSwitch from "../ToggleSwitch";
import "./styles.scss";

const Navbar = ({ onExit, onSave, saveStatus }) => {
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <nav className="navbar">
      <div className="navbar-buttons">
        <button onClick={onExit} className="exit-button">
          Exit
        </button>
        <div className="controls-right">
          <ToggleSwitch isToggled={theme === "dark"} onToggle={toggleTheme} />
          <span className="save-status">{saveStatus}</span>
          <button onClick={onSave} className="save-button">
            Save
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
