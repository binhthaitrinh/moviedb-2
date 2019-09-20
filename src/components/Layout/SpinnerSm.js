import React from 'react';
import spinner from './spinner.gif';

const Spinner = () => {
  return (
    <img
      style={{
        width: '1.5rem',
        margin: 'auto',
        display: 'block'
      }}
      src={spinner}
      alt="Loading..."
    />
  );
};

export default Spinner;
