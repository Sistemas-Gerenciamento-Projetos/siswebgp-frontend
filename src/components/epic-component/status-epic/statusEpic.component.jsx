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
import { toast } from 'react-toastify';
import { useProjectDetails } from '../../../context/projectContext';

export default function StatusEpic({ epic }) {
  const [actualStatus, setActualStatus] = useState(epic.status);
  const [userDetails] = useUserDetails();
  const [projectDetails] = useProjectDetails();

  useEffect(() => {
    if (epic.status !== actualStatus) {
      handleStatusChange();
    }
  }, [actualStatus]);

  function handleStatusChange() {
    epic.status = actualStatus;

    patchEpic(userDetails.accessToken, projectDetails.projectId, epic)
      .then((data) => {})
      .catch((error) => {
        console.log(error);
        toast.error('Erro ao atualizar o status do épico', {
          position: 'bottom-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: 'colored',
        });
        epic.statusc = actualStatus;
        setActualStatus(actualStatus);
      });
  }

  return (
    <Form.Select
      defaultValue={epic.status}
      onChange={(e) => setActualStatus(e.target.value)}
    >
      <option value={STATUS_TODO}>A fazer</option>
      <option value={STATUS_INPROGRESS}>Em andamento</option>
      <option value={STATUS_DONE}>Concluído</option>
      <option value={STATUS_PAUSED}>Pausado</option>
    </Form.Select>
  );
}
