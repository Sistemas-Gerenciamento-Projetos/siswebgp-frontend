import React, { useState } from "react";
import Form from 'react-bootstrap/Form';
import "../task-status/task-status.scss"


function Taskstatus() {
  const [color, setColor] = useState("");

  return (
    <Form.Select 
      className={color}
      onChange={(e) => setColor(e.target.value)}
    >
      <option>Selecione o Status</option>
      <option value="progresso">Em andamento</option>
      <option value="sucesso">Concluído</option>
      <option value="pausado">Pausado</option>
    </Form.Select>
  );
}

export default Taskstatus;
