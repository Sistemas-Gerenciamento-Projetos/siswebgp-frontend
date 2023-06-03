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

const Taskstatus = (status) => {
  return (
    <Form.Select
      defaultValue={status}
      className={status}
      onChange={(status_component) => setTest(status_component)}>
      <option value="TODO">A fazer</option>
      <option value="INPROGRESS">Em andamento</option>
      <option value="DONE">Concluído</option>
      <option value="PAUSED">Pausado</option>
    </Form.Select>
  );
};

export default Taskstatus;
