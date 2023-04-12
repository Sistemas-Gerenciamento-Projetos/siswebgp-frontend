import React from "react";

const ProgressBar = (props) => {
  const { completed } = props;
  return (
    <div style={{display: 'flex', flexDirection: 'row', width: '250px', height: '45px',borderRadius: '10px', border: '1px solid #d9d9d9', alignItems: 'center'}}>
      <div id="progress-bar-root" style={{height: '10px', width: '85%', backgroundColor: '#e0e0de', borderRadius: '50px', marginTop: '10px', marginBottom: '10px', marginLeft: '10px', marginRight: '5px'}}>
        <div style={{height: '100%', width: `${completed}%`, backgroundColor: '#1677ff', borderRadius: 'inherit', textAlign: 'right'}}/> 
      </div>
      <span style={{padding: '5px', color: '#595959', fontWeight: 'bold'}}>{`${completed}%`}</span>
    </div>
  );
};

export default ProgressBar;