import React from 'react';
import './styles.scss';

const ToggleSwitch = ({ isToggled, onToggle }) => {
  return (
    <label className="toggle-switch">
      <input type="checkbox" checked={isToggled} onChange={onToggle} />
      <span className="slider round"></span>
    </label>
  );
};

export default ToggleSwitch;
