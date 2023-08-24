import React, { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import {
  STATUS_DONE,
  STATUS_INPROGRESS,
  STATUS_PAUSED,
  STATUS_TODO,
} from '../../../constants/taskStatus';

export default function StatusEpic({ epic }) {
  const [actualStatus, setActualStatus] = useState(epic.status);

  useEffect(() => {
    if (epic.status !== actualStatus) {
      handleStatusChange();
    }
  }, [actualStatus]);

  function handleStatusChange() {
    epic.status = actualStatus;
    // Call patch epic endpoint
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
