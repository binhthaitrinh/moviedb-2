import React from 'react';
import spinner from './spinner.gif';

const Spinner = () => {
  return (
    <div className="spinner-bg">
      <img src={spinner} alt="Loading..." className="spinner" />
    </div>
  );
};

export default Spinner;
