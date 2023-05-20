import React from "react";
import DatePeriod from "../dashboard/datePeriod/datePeriod";
import ManagerPhoto from "../dashboard/managerPhoto/managerPhoto";
import Taskstatus from "../task-status/task-status.component";


const Tasks = (props) => {
  const { taskName, taskstatus, startDate, endDate, managerName } =
    props;

  return (
    <tr>
      <td>{taskName}</td> 
      <td><Taskstatus /></td>
      <td><DatePeriod startDate={startDate} endDate={endDate} /></td>
      <td><ManagerPhoto name={managerName}/></td>
    </tr>
  );
};

export default Tasks;


