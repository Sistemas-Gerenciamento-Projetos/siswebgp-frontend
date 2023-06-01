import React, { useState }  from "react";
import ProgressBar from "./progressBar/progressBar";
import DatePeriod from "./datePeriod/datePeriod";
import ManagerPhoto from "./managerPhoto/managerPhoto";


const DashboardItem = ({ projectName, projectProgress, startDate, endDate, managerName, projectId, onPress }) => {
  

  const [activeIndex, setIsActiveIndex] = useState("");
  
  const handleColorChange = (projectId) => {
    setIsActiveIndex(projectId);
  };
  //console.log(projectId)
    
  return (
    <tr 
        style={{backgroundColor: projectId === activeIndex ? "#b0ecff" : ""}}
        onClick={() => {
          onPress(projectId); 
          handleColorChange(projectId); 
          console.log(projectId);
        }}
        
    >
      <td>{projectName}</td> 
      <td><ProgressBar completed={projectProgress} /></td>
      <td><DatePeriod startDate={startDate} endDate={endDate} /></td>
      <td><ManagerPhoto name={managerName}/></td>
    </tr>
  );
};

export default DashboardItem;
