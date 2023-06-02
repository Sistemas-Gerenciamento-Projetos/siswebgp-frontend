import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import "./task-status.scss";

const Taskstatus = ({ status }) => {
  const [color, setColor] = useState("");


  return (
    <Form.Select
      defaultValue={status}
      className={status}
      onChange={(e) => setColor(e.target.value)}>
      <option value="TODO">A fazer</option>
      <option value="INPROGRESS">Em andamento</option>
      <option value="DONE">Concluído</option>
      <option value="PAUSED">Pausado</option>
    </Form.Select>
  );
};

export default Taskstatus;
