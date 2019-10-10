import React from 'react';
import spinner from './spinner.gif';

const Spinner = () => {
  return (
    <img
      style={{
        width: '5rem',
        margin: 'auto',
        display: 'block',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)'
      }}
      src={spinner}
      alt='Loading...'
    />
  );
};

export default Spinner;
