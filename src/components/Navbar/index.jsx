import React from "react";
import { usePageBuilder } from "../../contexts/PageBuilderContext";
import "./styles.scss";

const Navbar = () => {
  const { value } = usePageBuilder();
  console.log('pageJSON in Navbar:', value);
  return (
    <nav className="navbar">
      <div className="navbar-buttons">
        <button>Exit</button>
        <button>Save</button>
      </div>
    </nav>
  );
};

export default Navbar;