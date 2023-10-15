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
import { Spin } from 'antd';

const StatusTask = ({ status, taskItem }) => {
  const [userDetails] = useUserDetails();
  const [projectDetails] = useProjectDetails();
  const [loading, setLoading] = useState(false);

  const [atualStatus, setAtualStatus] = useState(status);
  const newstatusfromtask = { ...taskItem };

  const handleChange = async () => {
    if (taskItem.status !== atualStatus) {
      setLoading(true);
      newstatusfromtask.status = atualStatus;

      patchTask(
        userDetails.accessToken,
        projectDetails.projectId,
        projectDetails.projectName,
        projectDetails.managerEmail,
        newstatusfromtask,
      )
        .then((data) => {
          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
        });
    }
  };

  useEffect(() => {
    if (atualStatus !== status) {
      handleChange();
    }
  }, [atualStatus]);

  return (
    <>
      {loading ? (
        <Spin />
      ) : (
        <Form.Select
          defaultValue={atualStatus}
          onChange={(e) => setAtualStatus(e.target.value)}
          style={{ width: 'fit-content' }}
        >
          <option value={STATUS_TODO}>A fazer</option>
          <option value={STATUS_INPROGRESS}>Em andamento</option>
          <option value={STATUS_DONE}>Concluído</option>
          <option value={STATUS_PAUSED}>Pausado</option>
        </Form.Select>
      )}
    </>
  );
};

export default StatusTask;
