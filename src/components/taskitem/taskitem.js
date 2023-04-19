import React from "react";
import { Table } from "reactstrap";
import { Button } from "reactstrap";
import Buttonstatus from "../buttonstatus/buttostatus.component";
import "./taskitem.css";
import Taskdescription from "../modal/modal";
import DatePeriod from "../dashboard/datePeriod/datePeriod";



export default function Taskitem () {
  return( 
 <div className="table">
    <Table hover>
  <thead>
    <tr>
      <th>Id</th>
      <th>Nome da Tarefa</th>
      <th>Detalhe</th>
      <th>Status</th>
      <th>Prazo</th>
      <th>Responsável</th>
      <th>      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">1</th>
      <td>Definição da Arquitetura</td> 
      <td><Taskdescription /></td>
      <td><Buttonstatus /></td>
      <td><DatePeriod startDate={new Date(2023, 2, 1)} endDate={new Date(2023, 6, 24)} /></td>
      <td>Bruno</td>
      <td><Button color="danger">X</Button></td>
    </tr>
    
    <tr>
      <th scope="row">2</th>
      <td>Criação do Banco de Dados</td>
      <td><Taskdescription /></td>
      <td><Buttonstatus /></td>
      <td><DatePeriod startDate={new Date(2023, 2, 1)} endDate={new Date(2023, 6, 24)} /></td>
      <td>Bruno</td>
      <td><Button color="danger"> X </Button></td>
    </tr>
    <tr>
      <th scope="row">3</th>
      <td>Prototipação das Telas</td>
      <td><Taskdescription /></td>
      <td><Buttonstatus /></td>
      <td><DatePeriod startDate={new Date(2023, 2, 1)} endDate={new Date(2023, 6, 24)} /></td>
      <td>Bruno</td>
      <td><Button color="danger">X</Button></td>
    </tr>
  </tbody>
</Table>
  </div>
    
    
    )

  }
