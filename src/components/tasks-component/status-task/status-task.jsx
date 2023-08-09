import React, { useEffect, useState } from 'react';
import {
  STATUS_TODO,
  STATUS_INPROGRESS,
  STATUS_DONE,
  STATUS_PAUSED,
} from '../../../constants/taskStatus';
import { useUserDetails } from '../../../context/usercontext';
import { useProjectDetails } from '../../../context/projectContext';
import { patchTask } from '../../../services/tasks/patchTask';
import { Form } from 'react-bootstrap';

const StatusTask = ({ status, taskItem, onRefreshTasks }) => {
  const [userDetails] = useUserDetails();
  const [projectDetails] = useProjectDetails();
  const [updateTasks, setUpdateTasks] = useState(false);

  const [atualStatus, setAtualStatus] = useState(status);
  const newstatusfromtask = { ...taskItem };

  const handleChange = async () => {
    if (taskItem.status !== atualStatus) {
      newstatusfromtask.status = atualStatus;
      await patchTask(
        userDetails,
        projectDetails,
        newstatusfromtask,
        setUpdateTasks,
        onRefreshTasks,
      );
      if (updateTasks) {
        console.log('update');
        setUpdateTasks(false);
      }
    } else {
      console.error('patch');
    }
  };

  useEffect(() => {
    if (atualStatus !== status) handleChange();
  }, [atualStatus]);

  return (
    <Form.Select
      defaultValue={status}
      onChange={(e) => setAtualStatus(e.target.value)}
    >
      <option value={STATUS_TODO}>A fazer</option>
      <option value={STATUS_INPROGRESS}>Em andamento</option>
      <option value={STATUS_DONE}>Concluído</option>
      <option value={STATUS_PAUSED}>Pausado</option>
    </Form.Select>
  );
};

export default StatusTask;
