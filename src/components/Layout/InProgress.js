import React from 'react';
import Modal from './Modal';

const InProgress = ({ showModal, setShowModal }) => {
  const closeAction = (
    <>
      <button onClick={() => setShowModal(false)} className='btn btn-primary'>
        Close
      </button>
    </>
  );

  return (
    <Modal
      className={`modal ${showModal ? 'show' : ''}`}
      title='Warning'
      content='This feature has not been published. Please be patient :)'
      onDismiss={() => {
        setShowModal(false);
      }}
      actions={closeAction}
      showModal={showModal}
    />
  );
};

export default InProgress;
