import React from "react";
import "./Modal.css";

const Modal = ({ show, children }) => {
  // add class conditionallyy.
  const modalClass = show ? "modal show" : "modal hide";
  return (
    <div className={modalClass}>
      <div className="modal-content">{children}</div>
    </div>
  );
};

export default Modal;
