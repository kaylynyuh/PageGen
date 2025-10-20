import React from "react";
import { usePageBuilder } from "../../contexts/PageBuilderContext";
import "./styles.scss";

const Navbar = ({ exit, save, onExit, onSave }) => {
  const { value } = usePageBuilder();
  console.log("Current editor value:", value);
  console.log("Exit state:", exit);
  console.log("Save state:", save);
  return (
    <nav className="navbar">
      <div className="navbar-buttons">
        <button onClick={() => onExit(true)}>Exit</button>
        <button onClick={() => onSave(true)}>Save</button>
      </div>
    </nav>
  );
};

export default Navbar;
