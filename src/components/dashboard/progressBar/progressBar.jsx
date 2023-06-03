import React from "react";
import styles from './progressBarStyles'

const ProgressBar = (props) => {
  const { completed } = props

  return (
    <div style={styles.root}>
      <div style={styles.totalProgressDiv}>
        <div style={{ height: '100%', width: `${completed}%`, backgroundColor: '#1677ff', borderRadius: 'inherit',textAlign: 'right'}}/> 
      </div>
      <span style={styles.percentageText}>{`${completed.toFixed(2)}%`}</span>
    </div>
  );
};

export default ProgressBar;