import React, { useEffect, useState } from "react";
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
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const StatusTask = ({ status, taskItem }) => {
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
        setUpdateTasks(false);
      }
    } else {
      console.error("patch");
    }
  };

  useEffect(() => {
    if (atualStatus !== status) handleChange();
  }, [atualStatus]);

  return (
    <Form.Select
      defaultValue={status}
      onChange={(e) => setAtualStatus(e.target.value)}>
      <option value={STATUS_TODO}>A fazer</option>
      <option value={STATUS_INPROGRESS}>Em andamento</option>
      <option value={STATUS_DONE}>Concluído</option>
      <option value={STATUS_PAUSED}>Pausado</option>
    </Form.Select>
  );
};

export default StatusTask;
