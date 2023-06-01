import React from "react";
import ProgressBar from "./progressBar/progressBar";
import DatePeriod from "./datePeriod/datePeriod";
import ManagerPhoto from "./managerPhoto/managerPhoto";
import { parseDateWithoutTimezone } from "../../utils/dateParse";

const DashboardItem = ({ project, onPress }) => {
  const parsedStartDate = parseDateWithoutTimezone(project.creation_date)
  const parsedEndDate = parseDateWithoutTimezone(project.deadline_date)
  var progress = 0

  if (project.num_total_tasks != 0) {
    progress = (project.num_completed_tasks / project.num_total_tasks) * 100
  }

  return (
    <tr onClick={() => {onPress(project.id, project.project_name)}}>
      <td>{project.project_name}</td> 
      <td><ProgressBar completed={progress} /></td>
      <td><DatePeriod startDate={parsedStartDate} endDate={parsedEndDate} /></td>
      <td><ManagerPhoto name={project.manager_name}/></td>
    </tr>
  );
};

export default DashboardItem;
