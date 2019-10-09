import React from 'react';
import ReactDOM from 'react-dom';
import { CSSTransition } from 'react-transition-group';

const Modal = ({
  title,
  content,
  actions,
  onDismiss,
  className,
  showModal
}) => {
  return ReactDOM.createPortal(
    <div onClick={onDismiss} className={className}>
      <CSSTransition in={showModal} timeout={300} classNames='alert'>
        <div onClick={e => e.stopPropagation()} className='modal-content'>
          <h2 className='modal-title'>{title}</h2>
          <p className='modal-detail'>{content}</p>
          <div className='action'>{actions}</div>
        </div>
      </CSSTransition>
    </div>,
    document.querySelector('#modal')
  );
};

export default Modal;
