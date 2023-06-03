import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import {
  STATUS_TODO,
  STATUS_PAUSED,
  STATUS_INPROGRESS,
  STATUS_DONE,
} from "../../../constants/taskStatus";

import { patchTask } from "../../../services/tasks/patchTask";
import { getTasks } from "../../../services/tasks/getTasks";
import { useProjectDetails } from "../../../context/projectContext";
import { useUserDetails } from "../../../context/usercontext";

import "./task-status.scss";

const Taskstatus = ({ status }) => {
  const [color, setColor] = useState(status);
  console.log(status);

  return (
    <Form.Select
      defaultValue={status}
      className={status}
      onChange={(e) => setColor(e.target.value)}>
      <option value={STATUS_TODO}>A fazer</option>
      <option value={STATUS_INPROGRESS}>Em andamento</option>
      <option value={STATUS_DONE}>Concluído</option>
      <option value={STATUS_PAUSED}>Pausado</option>
    </Form.Select>
  );
};

export default Taskstatus;
