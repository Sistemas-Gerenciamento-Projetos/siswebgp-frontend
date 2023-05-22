import React, { useState } from "react";
import Form from 'react-bootstrap/Form';
import "../task-status/task-status.scss"


const Taskstatus = () => {
 
  const [color, setColor] = useState("");
  
  const liststatus = [
    {value: "none", namestatus: 'Selecione o status'},
    {value: "progresso", namestatus: 'Em andamento'},
    {value: "successo", namestatus: 'Concluído'},
    {value: "pausado", namestatus: 'Pausado'},
  ];


  return (
    <Form.Select 
      className={color}
      onChange={(e) => setColor(e.target.value)}
    >
      <option>Selecione </option>
      <option value="progresso" >Em andamento</option>
      <option value="successo" >Concluído</option>
      <option value="pausado" >Pausado</option>
    </Form.Select>

    /*
    <Form.Select 
      className={color}
      onChange={(e) => setColor(e.target.value)}
    >
      {liststatus.map((item) => (
          <option value={item.value}>{item.namestatus}</option>
        ))}
    </Form.Select>
    */
  );
}

export default Taskstatus;
