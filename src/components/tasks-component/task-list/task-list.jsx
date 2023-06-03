import React from "react";
import DatePeriod from "../../dashboard/datePeriod/datePeriod";
import ManagerPhoto from "../../dashboard/managerPhoto/managerPhoto";
import Taskstatus from "../task-status/task-status";

const Tasks = ({ title, status, beginDate, deadlineDate, user }) => {
  return (
    <tr>
      <td>{title}</td>
      <td>
        <Taskstatus status={status} />
      </td>
      <td>
        <DatePeriod startDate={beginDate} endDate={deadlineDate} />
      </td>
      <td>
        <ManagerPhoto name={user} />
      </td>
    </tr>
  );
};

export default Tasks;
