// src/components/common/Modal.jsx
import React from 'react';

const Modal = ({ children, onClose, size = 'medium' }) => {
  return (
    <div className="modal">
      <div className="modal__backdrop" onClick={onClose}></div>
      <div className={`modal__content modal__content--${size}`}>
        <button className="modal__close" onClick={onClose}>
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;