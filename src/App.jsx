import React from "react";

import Canvas from "./components/Canvas";
import LeftPanel from "./components/LeftPanel";
import Navbar from "./components/Navbar";
import RightPanel from "./components/RightPanel";
import "./App.scss";

const App = () => {
  return (
    <div className='app'>
      <Navbar />
      <div className='editor'>
        <LeftPanel />
        <Canvas />
        <RightPanel />
      </div>
    </div>
  );
};
export default App;
