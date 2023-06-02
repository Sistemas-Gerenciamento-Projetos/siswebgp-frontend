import React, { useState }  from "react";
import ProgressBar from "./progressBar/progressBar";
import DatePeriod from "./datePeriod/datePeriod";
import ManagerPhoto from "./managerPhoto/managerPhoto";
import { useProjectDetails } from "../../context/projectContext";


const DashboardItem = ({ projectName, projectProgress, startDate, endDate, managerName, projectId, onPress }) => {
  const [projectDetails] = useProjectDetails()
    
  return (
    <tr 
        style={{backgroundColor: projectId === projectDetails.projectId ? "#b0ecff" : ""}}
        onClick={() => {onPress(projectId)}}
    >
      <td>{projectName}</td> 
      <td><ProgressBar completed={projectProgress} /></td>
      <td><DatePeriod startDate={startDate} endDate={endDate} /></td>
      <td><ManagerPhoto name={managerName}/></td>
    </tr>
  );
};

export default DashboardItem;
