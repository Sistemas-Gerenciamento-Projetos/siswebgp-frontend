import React from "react";
import { Table } from "reactstrap";
import Taskstatus from "../task-status/task-status.component";
import "./taskitem.css";
import DatePeriod from "../dashboard/datePeriod/datePeriod";



export default function Taskitem() {
  return (
    <div>
      <Table hover>
        <thead>
          <tr>
            <th>Nome da Tarefa</th>
            <th>Status</th>
            <th>Prazo</th>
            <th>Responsável</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Definição da Arquitetura</td>
            <td><Taskstatus /></td>
            <td><DatePeriod startDate={new Date(2023, 2, 1)} endDate={new Date(2023, 6, 24)} /></td>
            <td>Bruno</td>
          </tr>
          <tr>
            <td>Criação do Banco de Dados</td>
            <td><Taskstatus /></td>
            <td><DatePeriod startDate={new Date(2023, 2, 1)} endDate={new Date(2023, 6, 24)} /></td>
            <td>Bruno</td>
          </tr>
        </tbody>
      </Table>
    </div>


  )

}
