import React from "react";

const Modal = ({ isOpen, title, children, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal modal-open">
      <div className="modal-box">
        <h3 className="font-bold text-lg mb-4">{title}</h3>
        <div>{children}</div>
        <div className="modal-action">
          {/* <button className="btn" onClick={onClose}>
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default Modal;
