import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import "./task-status.scss";

const Taskstatus = ({ status }) => {
  const [color, setColor] = useState("");

  const liststatus = [
    { value: "none", status: "Selecione o status" },
    { value: "progresso", status: "Em andamento" },
    { value: "successo", status: "Concluído" },
    { value: "pausado", status: "Pausado" },
  ];

  console.log(status);

  return (
    <Form.Select
      defaultValue={status}
      className={color}
      onChange={(e) => (setColor(e.target.value), console.log(color))}>
      <option> A fazer </option>
      <option value="INPROGRESS">Em andamento</option>
      <option value="DONE">Concluído</option>
      <option value="PAUSED">Pausado</option>
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
