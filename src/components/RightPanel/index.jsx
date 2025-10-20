import React from "react";
import RichText from "../RichText";
import "./styles.scss";

// TODO: Move RichText here and add more styling options
const RightPanel = () => {
  return (
    <aside className="right-panel">
      <h1>Styles</h1>
      <RichText />
    </aside>
  );
};

export default RightPanel;