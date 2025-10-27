import React from "react";
import "./styles.scss";

const Modal = ({
  show = false,
  title = '',
  children,
  onConfirm,
  onCancel,
}) => {
  if (!show) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          {title && <h2>{title}</h2>}
          <button onClick={onCancel}>&times;</button>
        </div>
        <div className="modal-content">{children}</div>
        <div className="modal-footer">
          <button onClick={onCancel}>Cancel</button>
          <button onClick={onConfirm}>Confirm</button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
