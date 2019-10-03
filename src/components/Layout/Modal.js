import React from 'react';
import ReactDOM from 'react-dom';

const Modal = ({ title, content, actions, onDismiss, className }) => {
  return ReactDOM.createPortal(
    <div onClick={onDismiss} className={className}>
      <div onClick={e => e.stopPropagation()} className='modal-content'>
        <h2 className='modal-title'>{title}</h2>
        <p className='modal-detail'>{content}</p>
        <div className='action'>{actions}</div>
      </div>
    </div>,
    document.querySelector('#modal')
  );
};

export default Modal;
