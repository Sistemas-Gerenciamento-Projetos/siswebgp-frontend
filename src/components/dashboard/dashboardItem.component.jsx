import React from "react";
import ProgressBar from "./progressBar/progressBar";
import DatePeriod from "./datePeriod/datePeriod";
import ManagerPhoto from "./managerPhoto/managerPhoto";

const DashboardItem = ({ projectName, projectProgress, startDate, endDate, managerName, projectId, onPress }) => {
  return (
    <tr onClick={() => onPress(projectId)}>
      <td>{projectName}</td> 
      <td><ProgressBar completed={projectProgress} /></td>
      <td><DatePeriod startDate={startDate} endDate={endDate} /></td>
      <td><ManagerPhoto name={managerName}/></td>
    </tr>
  );
};

export default DashboardItem;
