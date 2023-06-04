import React, { useEffect, useState } from "react";
import DatePeriod from "../../dashboard/datePeriod/datePeriod";
import ManagerPhoto from "../../dashboard/managerPhoto/managerPhoto";
import {
  STATUS_TODO,
  STATUS_INPROGRESS,
  STATUS_DONE,
  STATUS_PAUSED,
} from "../../../constants/taskStatus";
import { useUserDetails } from "../../../context/usercontext";
import { useProjectDetails } from "../../../context/projectContext";
import { patchTask } from "../../../services/tasks/patchTask";
import { Form } from "react-bootstrap";

const Tasks = (props) => {
  const { title, status, beginDate, deadlineDate, user, taskItem } = props;

  const [userDetails] = useUserDetails();
  const [projectDetails] = useProjectDetails();
  const [updateTasks, setUpdateTasks] = useState(false);

  const [atualStatus, setAtualStatus] = useState(status);
  const newstatusfromtask = { ...taskItem };

  const handleChange = () => {
    if (taskItem.status !== atualStatus) {
      newstatusfromtask.status = atualStatus;
      patchTask(userDetails, projectDetails, newstatusfromtask, setUpdateTasks);
      if (updateTasks) {
        console.log("updated");
        setUpdateTasks(false);
      }
    } else console.error("patch");
  };

  useEffect(() => {
    if (atualStatus !== status) handleChange();
  }, [atualStatus]);

  return (
    <tr>
      <td>{title}</td>
      <td>
        <Form.Select
          defaultValue={status}
          onChange={(e) => setAtualStatus(e.target.value)}>
          <option value={STATUS_TODO}>A fazer</option>
          <option value={STATUS_INPROGRESS}>Em andamento</option>
          <option value={STATUS_DONE}>Concluído</option>
          <option value={STATUS_PAUSED}>Pausado</option>
        </Form.Select>
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
