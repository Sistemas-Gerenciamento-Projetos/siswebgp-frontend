import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import "./task-status.scss";

const Taskstatus = () => {
  const [color, setColor] = useState("");

  const liststatus = [
    { value: "none", status: "Selecione o status" },
    { value: "progresso", status: "Em andamento" },
    { value: "successo", status: "Concluído" },
    { value: "pausado", status: "Pausado" },
  ];

  return (
    <Form.Select
      className={color}
      onChange={(e) => (setColor(e.target.value), console.log(color))}>
      <option>Selecione </option>
      <option value="progresso">Em andamento</option>
      <option value="successo">Concluído</option>
      <option value="pausado">Pausado</option>
    </Form.Select>

    /*
    <Form.Select 
      className={color}
      onChange={(e) => setColor(e.target.value)}
    >
      {liststatus.map((item) => (
          <option value={item.value}>{item.status}{status}</option>
        ))}
    </Form.Select>
    */
  );
};

export default Taskstatus;
