import React, { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import {
  STATUS_DONE,
  STATUS_INPROGRESS,
  STATUS_PAUSED,
  STATUS_TODO,
} from '../../../constants/taskStatus';
import { patchEpic } from '../../../services/epics/patchEpic';
import { useUserDetails } from '../../../context/usercontext';
import { useProjectDetails } from '../../../context/projectContext';
import { showErrorToast } from '../../../utils/Toasts';
import { Spin } from 'antd';

export default function StatusEpic({ epic }) {
  const [actualStatus, setActualStatus] = useState(epic.status);
  const [userDetails] = useUserDetails();
  const [projectDetails] = useProjectDetails();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (epic.status !== actualStatus) {
      handleStatusChange();
    }
  }, [actualStatus]);

  async function handleStatusChange() {
    setLoading(true);
    epic.status = actualStatus;

    patchEpic(userDetails.accessToken, projectDetails.projectId, epic)
      .then((data) => {
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        showErrorToast('Erro ao atualizar o status do épico');
        epic.statusc = actualStatus;
        setActualStatus(actualStatus);
        setLoading(false);
      });
  }

  return (
    <>
      {loading ? (
        <Spin />
      ) : (
        <Form.Select
          defaultValue={epic.status}
          onChange={(e) => setActualStatus(e.target.value)}
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
}
