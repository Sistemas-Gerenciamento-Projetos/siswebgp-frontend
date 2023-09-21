import React from 'react';

const ProgressBar = ({ completed }) => {
  return <p>{`${completed.toFixed(2)}%`}</p>;
};

export default ProgressBar;
